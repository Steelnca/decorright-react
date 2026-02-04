
import { ProjectDetail } from "@/components/layout/ProjectDetail"

export default function ProjectPage() {
    return (

        <main>
            <section className="h-hero min-h-hero max-w-270 mx-auto relative flex flex-col items-center justify-center w-full md:mt-8 ">
                <div className="absolute right-full w-full h-[calc(100svh-28rem)] md:h-[calc(100svh-16rem)] border border-muted/20 rounded-4xl mask-l-to-transparent mask-l-to-30% overflow-hidden" />

                <div className="relative flex justify-center items-center w-full h-full px-4 py-4 md:py-8 ">
                    <ProjectDetail/>
                </div>

                <div className="absolute left-full w-full h-[calc(100svh-18rem)] md:h-[calc(100svh-16rem)] border border-muted/20 rounded-4xl mask-r-to-transparent mask-r-to-30% overflow-hidden" />
            </section>
        </main>

    )
}