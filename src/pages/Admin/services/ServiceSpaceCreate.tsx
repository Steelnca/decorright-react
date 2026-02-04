import ServiceSpaceCreateLayout from "@/components/layout/admin/services/ServiceSpaceCreate";

export default function ServiceSpaceCreate() {
    return (
        <main>
            <section className="h-hero min-h-hero relative flex flex-col w-full md:pt-8 mb-40">
                <div className="relative flex flex-col gap-8 h-full">
                    <h1 className="font-semibold text-lg md:text-2xl"> Create Service </h1>
                    {/* Service content goes here */}

                    <div className="w-full lg:w-2/3">
                        {/* Service creation form or content goes here */}
                        <ServiceSpaceCreateLayout />
                    </div>

                </div>
            </section>
        </main>
    )
}