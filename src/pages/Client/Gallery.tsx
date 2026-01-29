import { GalleryListLayout } from "@/components/layout/GalleryList";



export default function GalleryListPage () {
    return (

        <main>
            <section className="h-hero min-h-hero content-container relative flex flex-col items-center justify-center w-full mt-8 mb-16">

                <div className="absolute right-full w-full h-[calc(100svh-18rem)] md:h-[calc(100svh-16rem)] border border-muted/20 rounded-4xl mask-l-to-transparent mask-l-to-30% overflow-hidden"></div>

                    <div className="relative w-full h-full px-2 md:py-8">

                        <GalleryListLayout/>
                    </div>

                <div className="absolute left-full w-full h-[calc(100svh-18rem)] md:h-[calc(100svh-16rem)] border border-muted/20 rounded-4xl mask-r-to-transparent mask-r-to-30% overflow-hidden"></div>

            </section>
        </main>

    )
}
