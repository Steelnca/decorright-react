
import { serviceTypes } from "../../constants/index"

export function ServiceCardList () {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-6 w-full">

            {serviceTypes.map((service, index) => (

                <li key={index} className="relative p-4">
                    <div className="absolute top-0 right-0 w-full h-full bg-primary/10 mask-t-to-transparent -z-10 rounded-2xl"></div>
                    <div className="absolute top-0 right-0 w-full h-full border border-muted/10 mask-b-to-transparent -z-10 rounded-2xl"></div>
                    <div className="w-full aspect-4/3 mb-4 overflow-hidden">
                        <img src={service.imgSrc} alt="" className="object-cover h-full w-full rounded-xl" />
                    </div>

                    <h3 className="text-lg font-medium mb-2"> {service.label} </h3>
                    <p className="text-2xs text-muted/75"> Transform your living spaces with our expert residential interior design services, tailored to reflect your unique style and needs. </p>
                </li>
            ))}

        </ul>
    )
}

export function Services () {
    return (
        <section className="content-container flex flex-col gap-8 w-full my-8">

            {/* Section Header */}
            <div className="flex flex-col gap-4 w-full">
                <h2 className="font-medium text-lg w-fit px-3 py-1 bg-emphasis rounded-full"> Services </h2>

                <div className="flex flex-col gap-2 w-full md:w-3/4">
                    <h3 className="font-semibold text-2xl"> Explore our range of interior design services </h3>
                    <p className="text-sm text-muted/75"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus aperiam aspernatur, et repellendus facilis non dolore,  tailored to meet your unique needs. </p>
                </div>
            </div>

            {/* Service Cards */}
            <ServiceCardList/>

        </section>
    )
}