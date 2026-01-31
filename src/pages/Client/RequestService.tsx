
import RequestServiceLayout from "@/components/layout/client/RequestService"

export default function RequestService () {
    return (

        <main>
            <section className="h-hero min-h-hero content-container relative flex flex-col items-center justify-center w-full">
                <div className="absolute right-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] border border-muted/20 rounded-4xl bg-surface/25 mask-l-to-transparent mask-l-to-30% overflow-hidden" />
                    <RequestServiceLayout />
                <div className="absolute left-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] border border-muted/20 rounded-4xl bg-surface/25 mask-r-to-transparent mask-r-to-30% overflow-hidden" />
            </section>
        </main>

    )
}
