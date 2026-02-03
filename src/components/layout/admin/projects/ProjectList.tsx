


import { Link } from "react-router-dom"
import { PATHS } from "@/routers/Paths";
import ZoomImage from "@/components/ui/ZoomImage";
import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/icons";

type Project = {
    id: string;
    title: string;
    description?: string;
    src?:string;
    date?:string;
    service_type?:string;
    service_space_type?:string;
    alt?:string;
    stage:{label:string, value:string};
    views:number;
    likes:number;
    created_at:string;
    updated_at:string;
};

type ServiceType = {
    id: string;
    label: string;
    description?: string;
    src?:string;
    date?:string;
    alt?:string;
};

type ServiceSpaceType = {
    id: string;
    label: string;
    description?: string;
    src?:string;
    date?:string;
    alt?:string;
};

type visibilityStag = {
    id:string;
    label:string;
    value:string;
}

type Action = "edit" | "publish" | "private" | "hide" | "delete";

type Props = {
    projects: Project[];
    serviceTypes:ServiceType[];
    serviceSpaceTypes:ServiceSpaceType[];
    onAction?: (projectId: string, action: Action) => void;
    visibilityStags:visibilityStag[];
};

export function ProjectCardList ({projects, onAction, serviceTypes, serviceSpaceTypes, visibilityStags}: Props) {

    const [openId, setOpenId] = useState<string | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [placement, setPlacement] = useState<"bottom" | "top">("bottom");

    // search + filters
    const [query, setQuery] = useState("");
    const [serviceTypeFilter, setServiceTypeFilter] = useState<string | "all">("all");
    const [serviceSpaceTypeFilter, setServiceSpaceTypeFilter] = useState<string | "all">("all");
    const [visibilityStagFilter, setVisibilityStagFilter] = useState<string | "all">("all");
    const [sortBy, setSortBy] = useState<"likes"|"views"|"newest">("newest");
    const [sortDir, setSortDir] = useState<"desc"|"asc">("desc"); // desc is usually what you want


    // Close on outside click
    useEffect(() => {

        function handleDocClick(e: MouseEvent) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpenId(null);
        }

        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setOpenId(null);
        }

        document.addEventListener("click", handleDocClick);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("click", handleDocClick);
            document.removeEventListener("keydown", handleEsc);
        };

    }, []);

    const derivedServiceTypes = Array.from(
        new Set((projects || []).map((p) => p.service_type).filter(Boolean))
    );

    const derivedServiceSpaceTypes = Array.from(
        new Set((projects || []).map((p) => p.service_space_type).filter(Boolean))
    );

    const derivedStages = Array.from(
        new Set((projects || []).map((p) => p.stage.value).filter(Boolean))
    );

    const serviceTypeOptions = serviceTypes && serviceTypes.length ? serviceTypes : derivedServiceTypes;
    const serviceSpaceTypeOptions = serviceSpaceTypes && serviceSpaceTypes.length ? serviceSpaceTypes : derivedServiceSpaceTypes;
    const stageOptions = visibilityStags && visibilityStags.length ? visibilityStags : derivedStages;

    // filtering logic
    const filtered = projects.filter((project) => {
        // query match against title/description
        const q = query.trim().toLowerCase();
            if (q) {
                const hay = `${project.title} ${project.description || ""}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }

            // service type
            if (serviceTypeFilter !== "all") {
                if (project.service_type !== serviceTypeFilter) return false;
            }

            // service space type
            if (serviceSpaceTypeFilter !== "all") {
                if (project.service_space_type !== serviceSpaceTypeFilter) return false;
            }

            // service space type
            if (visibilityStagFilter !== "all") {
                if (project.stage.value !== visibilityStagFilter) return false;
            }

            return true;
        }
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "likes")      return (b.likes || 0) - (a.likes || 0);
        if (sortBy === "views")      return (b.views || 0) - (a.views || 0);
        if (sortBy === "newest") {
            const ta = new Date(a.created_at || a.updated_at || 0).getTime();
            const tb = new Date(b.created_at || b.updated_at || 0).getTime();
            return tb - ta;
        }
        return 0;
    });

if (sortDir === "asc") sorted.reverse();


    const handleAction = (id: string, action: Action) => {
        setOpenId(null);
        onAction?.(id, action);
    };

    // when toggling the menu, compute available space:
    function toggleMenu(id: string) {
        if (openId === id) {
            setOpenId(null);
            return;
        }

        const btn = triggerRef.current;
        if (!btn) {
            setPlacement("bottom");
            setOpenId(id);
            return;
        }

        const rect = btn.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // quick estimate of menu height
        const estimatedMenuHeight = 220;

        // prefer bottom unless not enough space and there's more space above
        if (spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow) {
            setPlacement("top");
        } else {
            setPlacement("bottom");
        }

        setOpenId(id);
    }

    function handleResetFilters(e:React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setServiceTypeFilter('all');
        setServiceSpaceTypeFilter('all');
        setVisibilityStagFilter('all');
        setSortBy('newest');
        setSortDir('desc');
        return
    }
    return (
        <div ref={rootRef} className="w-full h-full">
            {/* Search + filters */}
            <div className="flex gap-8 items-center justify-between mb-4 w-full">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="flex-1 px-3 py-2 rounded border focus:outline-none"
                />

                <div className="flex gap-4">
                    <select value={serviceTypeFilter}
                    onChange={(e) => setServiceTypeFilter((e.target.value as string) || "all")}
                    className="px-2 py-2 rounded border focus:outline-none"
                    >
                        <option value="all"> Services </option>
                            {serviceTypeOptions.map((s:any) => (
                                <option key={s?.id} value={s?.label}>{s?.label}</option>
                            ))}
                    </select>

                    <select value={serviceSpaceTypeFilter}
                    onChange={(e) => setServiceSpaceTypeFilter((e.target.value as string) || "all")}
                    className="px-2 py-2 rounded border focus:outline-none"
                    >
                        <option value="all"> Space Services </option>
                            {serviceSpaceTypeOptions.map((s:any) => (
                                <option key={s?.id} value={s?.label}>{s?.label}</option>
                            ))}
                    </select>

                    <select value={visibilityStagFilter}
                    onChange={(e) => setVisibilityStagFilter((e.target.value as string) || "all")}
                    className="px-2 py-2 rounded border focus:outline-none"
                    >
                        <option value="all"> Visibility </option>
                            {stageOptions.map((s:any) => (
                                <option key={s?.value} value={s?.value}>{s?.label}</option>
                            ))}
                    </select>

                    <div>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-2 py-2 rounded border">
                            <option value="newest">Newest</option>
                            <option value="likes">Most liked</option>
                            <option value="views">Most viewed</option>
                        </select>
                        <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} className="px-2">
                            {sortDir === "desc" ? <ICONS.arrowDownWideShort/> : <ICONS.arrowUpWideShort/>}
                        </button>
                    </div>
                </div>

            </div>

                { sorted.length > 0
                ?
                    <ul className="relative flex flex-col gap-4 w-full">

                        {sorted.map((project) => (
                            <>
                                <li className="flex gap-2">
                                    <Link to={PATHS.ADMIN.projectUpdate('slug')} className="flex max-xs:flex-col gap-2 w-full">
                                        <div className="xs:min-w-max xs:h-28 aspect-video overflow-hidden">
                                            <ZoomImage src={project.src} alt="" className="object-cover h-full w-full rounded-lg" />
                                        </div>

                                        <div className="flex gap-2 w-full">
                                            <div className="flex flex-col gap-2 w-full">

                                                <h4 className="text-ellipsis-2line md:text-ellipsis-1line font-medium text-sm md:text-lg text-muted"> {project.title} </h4>

                                                <div className="hidden sm:flex flex-wrap gap-1 sm:gap-2 w-fit">
                                                    <span className="text-ellipsis-1line text-2xs px-2 py-1 border border-muted/15 rounded-full bg-surface">{project.service_type}</span>
                                                    <span className="text-ellipsis-1line text-2xs px-2 py-1 border border-muted/15 rounded-full bg-surface">{project.service_space_type}</span>
                                                </div>

                                                <div className="flex flex-wrap">
                                                    <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{project.stage.label}</span>
                                                    <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{project.views} Views</span>
                                                    <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{project.likes} Likes</span>
                                                </div>

                                                <p className="text-2xs min-w-max">{project.date}</p>

                                            </div>
                                            <div className="w-fit">
                                                <button
                                                    type="button"
                                                    aria-haspopup="menu"
                                                    aria-expanded={openId === project.id}
                                                    ref={triggerRef}
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu(project.id); }}
                                                    className="relative inline-flex items-center justify-center sm:p-2 rounded-full ring-muted/15 hover:ring-1 focus:ring-1 hover:bg-surface active:bg-surface focus:outline-none"
                                                    title="Actions"

                                                >
                                                    <ICONS.ellipsisVertical/>
                                                    {openId === project.id && (
                                                        <div role="menu"
                                                            aria-label={`Actions for ${project.title}`}
                                                            className={"absolute right-0 w-45 rounded-md border border-muted/25 bg-surface shadow-xs z-20 overflow-hidden " +
                                                            (placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2")}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <button role="menuitem"
                                                                onClick={() => handleAction(project.id, "edit")}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                                            > Edit </button>

                                                            <button role="menuitem"
                                                                onClick={() => handleAction(project.id, "edit")}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                                            > Publish </button>

                                                            <button role="menuitem"
                                                                onClick={() => handleAction(project.id, "edit")}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                                            > Hide </button>

                                                            <button role="menuitem"
                                                                onClick={() => handleAction(project.id, "edit")}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                                            > Delete </button>

                                                            <div className="border-t" />

                                                            <button role="menuitem"
                                                                onClick={() => handleAction(project.id, "edit")}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                                            > Delete </button>
                                                        </div>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                    </Link>

                                </li>
                                <div className="w-full h-full border-b border-muted/15 last:border-0 mask-r-to-transparent mask-r-from-100%"/>
                            </>
                        ))}

                    </ul>
                :
                    <div className="flex items-center justify-center gap-2 w-full h-full border border-red-400">
                        <ICONS.informationCircle className="size-6" />
                        <p>
                            No projects match your current search or filters.
                        </p>
                        <button type="button" onClick={handleResetFilters}
                        className="font-medium underline"
                        > Reset filters </button>
                    </div>
                }
        </div>
    )
}
