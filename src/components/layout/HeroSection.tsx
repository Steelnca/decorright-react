
export function HeroSection({children}:any) {

    return (
        <section className="hero-section-height relative flex items-center w-full max-w-360 mx-auto ">

            <div className="absolute right-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] bg-primary/10 rounded-4xl mask-l-to-transparent mask-l-to-10% overflow-hidden"></div>

            <div className="relative flex w-full h-full border border-muted/15 p-1.5 md:p-2 rounded-4xl"> {children} </div>

            <div className="absolute left-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] bg-primary/10 rounded-4xl mask-r-to-transparent mask-r-to-10% overflow-hidden"></div>

        </section>
    )
}