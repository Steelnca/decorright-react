import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from "react-i18next"
import { ServiceTypesService, type ServiceType } from "@/services/service-types.service"
import ZoomImage from "@components/ui/ZoomImage"
import { ICONS } from "@/icons"
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper.css';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';

export function ServiceCardItem({service}:{service:ServiceType}) {

    const { i18n } = useTranslation()

    const getLocalizedLabel = (service:ServiceType) => {
        const lang = i18n.language
        if (lang === "ar" && service.display_name_ar) return service.display_name_ar
        if (lang === "fr" && service.display_name_fr) return service.display_name_fr
        return service.display_name_en
    }

    return (
        <li key={service.id} className="relative p-4 rounded-xl overflow-hidden max-md:mb-10">
            <div className="absolute top-0 right-0 w-full h-full bg-surface shadow-xs mask-t-to-transparent -z-10 rounded-2xl" />
            <div className="absolute top-0 right-0 w-full h-full border border-muted/20 mask-b-to-transparent -z-10 rounded-2xl" />

            <div className="w-full aspect-4/3 mb-4 shadow-sm rounded-lg overflow-hidden">
                {service.image_url ? (
                    <ZoomImage src={service.image_url} alt={service.display_name_en} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10">
                        <ICONS.photo className="size-12" />
                    </div>
                )}
            </div>

            <h3 className="text-lg font-medium mb-0.5"> {getLocalizedLabel(service)} </h3>
            <p className="text-2xs md:text-xs text-muted/75"> {service.description} </p>
        </li>

    )
}

export function ServiceCardList() {
    const [services, setServices] = useState<ServiceType[]>([])
    const [loading, setLoading] = useState(true)
    const ref = useRef<HTMLUListElement | null>(null);
    const [cols, setCols] = useState(1);

    const [isMdSize, setIsMdSize] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsMdSize(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true)
                const data = await ServiceTypesService.getActive()
                setServices(data)
            } catch (error) {
                console.error("Failed to fetch service types:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const updateCols = () => {
        const cs = getComputedStyle(el);
        const template = cs.gridTemplateColumns; // e.g. "320px 320px 320px" or "none"
        if (!template || template === "none") {
            setCols(1);
            return;
        }
        // count actual columns by splitting on spaces (filter empties)
        const count = template.split(/\s+/).filter(Boolean).length;
        setCols(Math.max(1, count));
        };

        // initial read
        updateCols();

        // watch changes: ResizeObserver for element (and document) + window resize fallback
        let ro: ResizeObserver | null = null;
        try {
        ro = new ResizeObserver(updateCols);
        ro.observe(el);
        ro.observe(document.documentElement); // catch CSS media-query changes
        } catch {
        window.addEventListener("resize", updateCols);
        }

        return () => {
        if (ro) ro.disconnect();
        else window.removeEventListener("resize", updateCols);
        };
    }, []);

    // compute missing slots on last row
    const remainder = services.length % cols;
    const missing = remainder === 0 ? 0 : cols - remainder;

    // desired behavior: if 2 missing -> span 2, if 1 missing -> span 1
    const fillerSpan = missing === 2 ? Math.min(2, cols) : missing === 1 ? 1 : 0;


    if (loading) {
        return (
            <div className="w-full flex justify-center py-20 text-muted">
                <ICONS.cog className="size-10 animate-spin" />
            </div>
        )
    }

    if (services.length === 0) {
        return null
    }

    return (
        <>
            <ul
            ref={ref}
            className="max-md:hidden grid max-xl:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] grid-cols-3 gap-6 w-full h-full"
            >
            {services.map((service) => (
                <ServiceCardItem service={service} />
            ))}

            {fillerSpan > 0 && (
                <li
                aria-hidden
                style={{ gridColumn: `span ${fillerSpan}` }}
                className="rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-4 border-red-400"
                >
                <div className="w-full h-36 rounded-md bg-white/40 flex items-center justify-center text-gray-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                </div>
                </li>
            )}
            </ul>

            <Swiper
                hidden={isMdSize}
                loop={services.length > 1}
                modules={[Pagination, Navigation]}
                pagination={{ dynamicBullets: true, clickable: true }}
                className="hidden w-full h-full rounded-xl overflow-hidden"
                style={{ '--swiper-navigation-size': '30px', '--swiper-navigation-color': 'var(--acme-primary)', '--swiper-pagination-color': 'var(--acme-primary)' } as CSSProperties}
            >
                {services.map((service:ServiceType) => (
                    <SwiperSlide key={service.id} className="px-4 ">
                        <ServiceCardItem service={service} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>

    )
}
