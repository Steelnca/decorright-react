
import { Link } from "react-router-dom"
import HeroImgSrc from "/public/hero-image.jpg"


export function HeroContentCheckListItem({content}:{content:string}) {
    return (
        <li className="text-2xs lg:text-xs text-muted/75 px-1 py-0.5 lg:px-2 lg:py-1 w-fit bg-surface/75 rounded-full"> ✓ {content} </li>
    )
}

export function HeroContentCheckList () {
    return (
        <ul className="flex flex-wrap gap-2 w-full">
            <HeroContentCheckListItem content={'Personalized Design Consultations'} />
            <HeroContentCheckListItem content={'Space Planning'} />
            <HeroContentCheckListItem content={'Custom Furniture & Decor'} />
        </ul>
    )
}

export function HeroContent () {
    return (
        <div className="flex flex-col justify-center gap-8 h-full">
            <div className="flex flex-col gap-2">
                <h3 className="font-medium text-xs md:text-sm"> Space & Decoration </h3>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold "> Interior <span className="text-primary"> Design </span> That Elevates Everyday Living </h1>
            </div>
            <p className="text-2xs lg:text-xs text-muted/75 max-w-lg">
                Welcome to Deco Right, your trusted partner for exquisite interior design and decor solutions. We bring your vision to life with creativity and style.
            </p>

            {/* Hero Check List */}
            <HeroContentCheckList/>
        </div>
    )
}

export function HeroCTA () {
    return (
        <div className="flex max-md:flex-col gap-4">
            <Link to={'/'} className="content-center text-center font-medium text-sm text-emphasis md:w-fit px-4 py-2 bg-primary rounded-xl"> Services </Link>
            <Link to={'/'} className="flex gap-2 justify-center text-center font-medium text-sm text-foreground md:w-fit px-4 py-2 border-2 border-emphasis rounded-xl"> Catalog & Categories
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="size-5 w-fit"><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z" fill="white"/></svg>
            </Link>
        </div>
    )
}

export function HeroMetrics () {
    return (
        <div className="relative flex justify-center items-center gap-4 md:gap-6 w-full p-4">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-surface/75 rounded-2xl -z-10 mask-r-to-transparent mask-r-to-95%"></div>
            <div className="flex flex-col items-center w-full">
                <span className="font-bold text-2xl md:text-4xl">4.8<span className="font-semibold text-sm md:text-lg">/5</span> </span>
                <span className="text-3xs md:text-2xs text-muted"> Customer Rating </span>
            </div>
            <div className="flex flex-col items-center w-full">
                <span className="flex items-center font-bold text-2xl md:text-4xl">500<span className="font-semibold text-sm md:text-lg">+</span> </span>
                <span className="text-3xs md:text-2xs text-muted"> Projects Completed </span>
            </div>
            <div className="flex flex-col items-center w-full">
                <span className="flex items-center font-bold text-2xl md:text-4xl">10<span className="font-semibold text-sm md:text-lg">+</span> </span>
                <span className="text-3xs md:text-2xs text-muted"> Years of Experience </span>
            </div>
        </div>
    )
}


export function HeroImg () {
    return (
        <div className="max-md:hidden aspect-auto rounded-e-3xl overflow-hidden">
            <img src={HeroImgSrc} alt="Hero Image" className="object-cover w-full h-full" />
        </div>
    )
}

export function Hero () {
    return (
        <section className="relative flex items-center min-h-full max-w-360 mx-auto">
            <div className="absolute right-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] bg-primary/10 rounded-4xl mask-l-to-transparent mask-l-to-10% overflow-hidden"></div>

            <div className="flex w-full border border-muted/15 p-1 md:p-2 rounded-4xl">

                <div className="flex flex-col justify-center gap-4 w-full p-4 md:p-8 bg-linear-320 from-surface/15 to-primary/25 rounded-3xl md:rounded-s-3xl md:rounded-e-none">
                    <div className="flex flex-col justify-evenly gap-6 h-full">
                        {/* Content */}
                        <HeroContent />

                        {/* CTA Buttons */}
                        <HeroCTA />
                    </div>

                    {/* Metrics data & Ratings */}
                    <HeroMetrics />

                </div>

                {/* Hero Image */}
                <HeroImg/>

            </div>

            <div className="absolute left-full w-full h-[calc(100svh-20rem)] md:h-[calc(100svh-18rem)] bg-primary/10 rounded-4xl mask-r-to-transparent mask-r-to-10% overflow-hidden"></div>
        </section>
    )
}