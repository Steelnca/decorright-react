
import { ServiceCardList } from "../components/layout/Services"
import { CategoryList } from "../components/layout/Categories"

import { PCTALink } from "../components/ui/CTA"
import { SectionHeader } from "../components/ui/SectionHeader"

export function Services () {
    return (

        <>
            <section className="content-container relative px-4 sm:px-8 md:px-12">
                <div className="absolute top-0 left-0 w-full h-1/2 -z-10 border border-muted/15 rounded-t-4xl mask-b-to-transparent mask-b-from-90%"></div>
                <div className="w-full h-full my-18">
                    {/* Context */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="font-medium text-4xl"> Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
                            <p className="text-xs md:text-sm"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam corrupti vero a enim harum molestias facilis, optio pariatur voluptate itaque nam obcaecati quas omnis reprehenderit doloribus perspiciatis. dolores enim harum molestias facilis, optio pariatur voluptate itaque nam obcaecati quas omnis reprehenderit doloribus perspiciatis. Qui, ex. </p>
                        </div>


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
                    <ServiceCardList />
                </div>

            </section>

            <section className="content-container relative my-18 px-4 sm:px-8 md:px-12">
                <SectionHeader
                    title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam corrupti vero a enim harum molestias facilis, optio pariatur voluptate itaque nam obcaecati quas omnis reprehenderit doloribus perspiciatis. dolores enim harum molestias facilis, optio pariatur voluptate itaque nam obcaecati quas omnis reprehenderit doloribus perspiciatis. Qui, ex."
                />
                <CategoryList/>
            </section>
        </>
    )
}