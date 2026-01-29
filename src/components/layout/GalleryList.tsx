
import { ICONS } from '../../icons';
import { galleries } from "../../constants"
import { PCTALink, SCTALink } from '../ui/CTA';
import { PATHS } from '@/routers/Paths';

export function GalleryItem ({ gallery, index }: { gallery: any, index: number }) {
    return (

        <li key={index}
        className="relative flex flex-col gap-2 w-full h-full rounded-2xl cursor-pointer p-4 md:p-6 border border-primary/15">
            {/* <div className='primary-gallery-card absolute top-0 left-0 w-full h-full border hover:bg-primary/10 rounded-2xl -z-10 mask-b-to-transparent mask-b-to-100%'></div> */}
            <div className="flex flex-col gap-4">

                <div className='flex items-center gap-4 w-full'>

                    { gallery.project.budget && <span className='font-medium text-xs text-primary min-w-max w-fit px-2 py-0.5 bg-primary/15 rounded-full'> {gallery.project.budget} </span> }
                    <hr className="w-full border-0 border-b border-b-muted/10 mask-l-to-transparent" />
                    {/* Rating Icon */}
                    <div className='flex content-center gap-1 min-w-max w-fit h-fit'>
                        <ICONS.star className='size-4 text-primary/75'/>
                        <span className='text-2xs md:text-xs text-muted'> {gallery.project.rating} (120 reviews) </span>
                    </div>

                </div>

                <div>
                    <h3 className='font-medium text-sm md:text-xl mb-1'> {gallery.label} </h3>
                    <p className='text-2xs md:text-xs text-muted/75'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde excepturi accusamus consequatur? Consequuntur odio similique ratione qui laudantium! Quos atque distinctio, magnam cum labore laboriosam ad obcaecati provident laborum! </p>
                </div>

            </div>

            <div className='flex flex-col gap-8 md:gap-4 mt-4'>

                {/* Details & Checklist */}
                <div className='flex max-xs:flex-col md:flex-col lg:flex-row gap-4 w-full'>

                    <div className='flex flex-col justify-center gap-1 w-full text-center'>
                        <img src={gallery.images[0]} className="aspect-video object-cover w-full h-full rounded-lg"/>
                        <span className="font-medium text-xs md:text-sm"> Before </span>
                    </div>

                    <div className='flex flex-col justify-center gap-1 w-full text-center'>
                        <img src={gallery.images[0]} className="aspect-video object-cover w-full h-full rounded-lg"/>
                        <span className="font-medium text-xs md:text-sm"> After </span>
                    </div>


                </div>

                {/* CTA */}
                <div className='flex items-center justify-center gap-4 w-full border-t border-t-muted/15 pt-6'>

                    <SCTALink to={PATHS.projectDetail(gallery.project.id)} className='flex items-center justify-center text-xs w-full'> More Details </SCTALink>

                    <PCTALink to={PATHS.CLIENT.REQUEST_SERVICE} className='flex items-center justify-center gap-1 text-xs w-full py-2'> Request Projects {ICONS.chevronRight({className:'size-3 text-white'})} </PCTALink>
                </div>


            </div>

        </li>


    )
}

export function GalleryListLayout () {
    return (
        <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6 w-full h-fit">
            {galleries.map((gallery, index) => (
                <GalleryItem key={index} gallery={gallery} index={index} />
            ))}
        </ul>
    )
}
