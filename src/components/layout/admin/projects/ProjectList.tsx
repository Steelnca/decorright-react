


import { Link } from "react-router-dom"
import { projects } from "@/constants";
import { PATHS } from "@/routers/Paths";
import ZoomImage from "@/components/ui/ZoomImage";

export function ProjectCard ({project}: {project:any}) {

    return (

        <li>
            {/* <div className="absolute bottom-0 left-0 w-full h-full border-b border-muted/25 last:border-0 mask-x-to-transparent mask-x-from-96%"/> */}

            <Link to={PATHS.ADMIN.projectUpdate('slug')} className="flex max-xs:flex-col gap-1 xs:gap-2 w-full">
                <div className="xs:min-w-max xs:h-25 aspect-video overflow-hidden">
                    <ZoomImage src={project.src} alt="" className="object-cover h-full w-full rounded-lg" />
                </div>

                <div className="flex flex-col gap-2 w-full">

                    <h4 className="text-ellipsis-2line font-medium text-2xs xs:text-xs md:text-sm text-foreground"> {project.title} </h4>


                    <div className="flex flex-wrap gap-1 sm:gap-2 w-fit">
                        <span className="text-ellipsis-1line font-medium text-2xs px-1.5 py-0.5 border border-muted/15 rounded-full">Public</span>
                        <span className="text-ellipsis-1line font-medium text-2xs px-1.5 py-0.5 border border-muted/15 rounded-full">{project.service_type}</span>
                        <span className="text-ellipsis-1line font-medium text-2xs px-1.5 py-0.5 border border-muted/15 rounded-full">{project.space_type}</span>
                    </div>

                    <div className="flex flex-wrap">
                        <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{project.date}</span>
                        <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">823 Views</span>
                        <span className="text-2xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">477 Likes</span>
                    </div>

                </div>

            </Link>
        </li>

    )
}

export function ProjectCardList () {

    return (
        <ul className="flex flex-col gap-8 2xs:gap-6 w-full">

            {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
            ))}

        </ul>
    )
}
