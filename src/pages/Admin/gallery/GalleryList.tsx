
// Request page for admin users to overview and manage request

import { GalleryListLayout } from "@/components/layout/GalleryList";

export default function GalleryListPage() {
    return (
        <main>
            <section className="h-hero min-h-hero relative flex flex-col w-full md:pt-8 mb-40">
                <div className="relative flex flex-col gap-8 h-full">
                    <h1 className="font-semibold text-lg md:text-2xl"> Gallery List </h1>
                    {/* Request overview content goes here */}

                    <div className="w-full">
                        <GalleryListLayout />
                    </div>

                </div>
            </section>
        </main>
    )
}