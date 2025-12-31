
import { ProjectCardList } from "../components/layout/Projects"
import { PCTALink } from "../components/ui/CTA"
import { SectionHeader } from "../components/ui/SectionHeader"

export function ProjectsPage() {
    return (
        <>
            <section className="content-container relative px-4 sm:px-8 md:px-12">
                <div className="absolute top-0 left-0 w-full h-1/2 -z-10 border border-muted/15 rounded-t-4xl mask-b-to-transparent mask-b-from-90%"></div>
                <div className="w-full h-full my-18">
                    {/* Context */}
                    <div className="flex flex-col gap-6">

                        <SectionHeader
                            title="Projects & Portfolio of DecoRight"
                            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, repellendus ab! Est, animi excepturi necessitatibus blanditiis nesciunt, magnam reiciendis minus minima dolor quaerat voluptate inventore. Nobis ullam molestiae porro soluta!"
                        />


                        {/* CTA */}
                        <div className="flex gap-2">
                            <PCTALink to="/request-project"> Request a Project </PCTALink>
                        </div>

                    </div>

                    {/* Hero Image */}
                    <div>

                    </div>
                </div>


                <div>
                    <ProjectCardList />
                </div>

            </section>

        </>
    )
}