
import { gallery } from "@/constants"
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import ZoomImage from "@components/ui/ZoomImage";

export function GalleryPortfolioItem (portfolio:any) {
    return (

        <li className="relative flex flex-col gap-2 w-full h-full rounded-2xl cursor-pointer px-3 md:px-4 border border-muted/20 bg-surface overflow-clip">
            {/* <div className='primary-gallery-card absolute top-0 left-0 w-full h-full border hover:bg-primary/10 rounded-2xl -z-10 mask-b-to-transparent mask-b-to-100%'></div> */}
            <div className="p-3 md:p-4 h-full border-x border-muted/20">
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <div className="relative flex items-center gap-2">
                            <div className="absolute w-2 aspect-square bg-emphasis border border-muted/45 rounded-full ltr:-left-4 md:ltr:-left-5 rtl:-right-5" />
                            <h3 className="font-medium sm:text-lg lg:text-xl "> {portfolio.label} </h3>
                        </div>
                        <ul className="relative flex flex-wrap items-center w-fit">
                            { portfolio.service && <li className="text-2xs md:text-xs min-w-max after:content-['•'] after:mx-1.5 last:after:content-none">{ portfolio.service }</li> }
                            { portfolio.space && <li className="text-2xs md:text-xs min-w-max after:content-['•'] after:mx-1.5 last:after:content-none">{ portfolio.space }</li> }
                        </ul>
                        <p className="text-ellipsis-6line text-2xs md:text-xs text-muted/75"> {portfolio.description} </p>
                    </div>

                </div>

                <div className="relative flex flex-col w-full mt-4">

                    {/* Details & Checklist */}

                    <ImgComparisonSlider className="coloured-slider max-xs:hidden aspect-video rounded-lg outline-0 cursor-ew-resize">
                        <figure slot="first" className="relative w-full h-full">
                            <img
                            slot="first"
                            aria-label="Before Image"
                            src={portfolio.images[1]}
                            className="block w-full h-full object-cover object-center"
                            />
                            <figcaption className="absolute top-2 left-2 text-xs text-muted px-2 py-0.5 border border-muted/45 bg-emphasis/80 rounded-full">Before</figcaption>
                        </figure>

                        <figure slot="second" className="relative w-full h-full">
                            <img
                            slot="second"
                            aria-label="After Image"
                            src={portfolio.images[3]}
                            className="block w-full h-full object-cover object-center"
                            />
                            <figcaption className="absolute top-2 right-2 text-xs text-muted px-2 py-0.5 border border-muted/45 bg-emphasis/80 rounded-full">After</figcaption>
                        </figure>
                    </ImgComparisonSlider>

                    <div className="xs:hidden flex flex-col gap-4">

                        <div className='flex flex-col justify-center gap-2 w-full text-center'>
                            <ZoomImage slot="first" src={portfolio.images[1]} className="aspect-video object-cover w-full h-full rounded-lg"/>
                            <span className="font-medium text-xs md:text-sm"> Before </span>
                        </div>

                        <div className='flex flex-col justify-center gap-2 w-full text-center'>
                            <ZoomImage slot="second" src={portfolio.images[3]} className="aspect-video object-cover w-full h-full rounded-lg"/>
                            <span className="font-medium text-xs md:text-sm"> After </span>
                        </div>
                    </div>

                    <div className="max-md:hidden absolute -bottom-[105%] w-full h-full border border-muted/15 rounded-lg" />

                </div>
            </div>

        </li>


    )
}

export default function GalleryPortfolioListLayout () {
    return (
        <ul className="grid justify-items-center grid-cols-1 lg:grid-cols-2 gap-6 w-full h-fit">
            {gallery.map((portfolio) => (
                <GalleryPortfolioItem key={portfolio.id} portfolio={portfolio} />
            ))}
        </ul>
    )
}
