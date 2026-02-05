
import ProjectCardList  from "@/components/layout/admin/projects/ProjectList";
import { projects, serviceTypes, serviceSpaceTypes, projectVisibilityStags } from "@/constants";

export default function ProjectList () {
    return (

        <main>
            <section className="h-hero min-h-hero relative flex flex-col w-full md:pt-8 mb-40">
                <div className="relative flex flex-col gap-8 h-full">
                    <h1 className="font-semibold text-lg md:text-2xl w-fit"> Project List </h1>
                    <div className="w-full">
                        <ProjectCardList projects={projects} serviceTypes={serviceTypes} serviceSpaceTypes={serviceSpaceTypes} visibilityStags={projectVisibilityStags} />
                    </div>
                </div>
            </section>
        </main>
    )
}