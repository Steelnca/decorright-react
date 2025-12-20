import { ICONS } from '../../icons';
import { categories } from "../../constants"


export function CategoryChecklist ({ category }: { category: any }) {
    return (

        <ul className='flex flex-col gap-2 w-full'>
            {category.checklist && category.checklist.length > 0 && (
                category.checklist.map((item: string, itemIndex: number) => {
                    const CheckIcon = ICONS['check'];
                    return (
                        <li key={itemIndex} className='flex items-center gap-2'>
                            <CheckIcon className={` ${category.primaryDisplay ? 'size-4' : 'size-3'}  text-primary`} />
                            <span className={`${category.primaryDisplay ? 'text-2xs md:text-xs' : 'text-3xs md:text-2xs'}  text-muted`}> {item} </span>
                        </li>
                    )
                })
            )}
        </ul>

    )
}

export function CategoryItem ({ category, index }: { category: any, index: number }) {
    return (
        <li key={index} className={` relative ${category.primaryDisplay ? 'primary-category-card border-none':'regular-category-card'} flex flex-col gap-2 w-full h-full border rounded-2xl cursor-pointer`}>
            {!category.primaryDisplay ? null : <div className='primary-category-card absolute top-0 left-0 w-full h-full border hover:bg-primary/10 rounded-2xl -z-10 mask-b-to-transparent mask-b-to-100%'></div>}
            <div className="flex flex-col gap-2">

                <div className='flex gap-2 w-full'>

                    <div className='flex flex-col gap-3 w-full'>
                        <span className='font-medium text-xs text-primary min-w-max w-fit px-2 py-0.5 bg-primary/15 rounded-full'> Best sales </span>
                        <h3 className={`font-medium ${category.primaryDisplay ? 'text-lg' : 'text-xs'}`}> {category.label} </h3>
                    </div>
                    {/* Rating Icon */}
                    <div className='flex gap-1 mt-1 min-w-max w-fit'>
                        <ICONS.star className='size-4 text-primary/75'/>
                        <span className='text-2xs md:text-xs text-muted'> 4.9 {category.primaryDisplay ? '(120 reviews)' : null}  </span>
                    </div>
                </div>

                <p className={`${category.primaryDisplay ? 'text-2xs md:text-xs' : 'text-3xs md:text-2xs text-ellipsis-2line'} text-muted`}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde excepturi accusamus consequatur? Consequuntur odio similique ratione qui laudantium! Quos atque distinctio, magnam cum labore laboriosam ad obcaecati provident laborum! </p>

            </div>

            {category.primaryDisplay ? null :

                <div className='flex flex-col gap-4'>
                    <p className='font-bold text-xs md:text-sm'>$65.000</p>

                    {/* CheckList */}
                    <CategoryChecklist category={category} />

                </div>

            }

            {!category.primaryDisplay ? null :
                <div className='flex flex-col md:flex-row gap-8 md:gap-4 mt-4'>

                    {/* Details & Checklist */}
                    <div className='flex flex-col gap-4 md:gap-8 w-full'>

                        {/* Contents Checklist */}
                        <div>
                            <h4 className='font-semibold text-sm mb-2'> What we offer </h4>
                            <CategoryChecklist category={category} />
                        </div>

                        {/* Service Pricing */}

                        <div>
                            <h4 className='font-semibold text-sm mb-2'> Starting from </h4>
                            <p className='font-bold text-lg'>$80.000</p>
                        </div>


                        {/* CTA */}
                        <div>
                            <button className='px-4 py-2 bg-primary text-white text-2xs md:text-xs font-medium rounded-lg hover:bg-primary/90 transition'> Explore {category.label} Projects </button>
                        </div>

                    </div>

                    {/* Images Display Grid */}
                    <div className='grid grid-cols-2 gap-2'>
                        {category.images && category.images.length > 0 && (
                            category.images.map((imgSrc: string, imgIndex: number) => (
                                <img key={imgIndex} src={imgSrc} alt={`${category.label} ${imgIndex + 1}`} className="aspect-square object-cover w-full h-full rounded-lg"/>
                            ))
                        )}
                    </div>

                </div>
            }

        </li>
    )
}

export function CategoryList () {
    return (
        <ul className="grid justify-items-center md:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] grid-rows-[repeat(auto-fit,minmax(16rem,1fr))] auto-rows-fr gap-6 w-full h-full">
            {categories.map((category, index) => (
                <CategoryItem key={index} category={category} index={index} />
            ))}
        </ul>
    )
}

export function Categories () {
    return (

        <section className="content-container flex flex-col gap-8 w-full my-16">
            {/* Section Header */}

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 w-full md:w-3/4">
                    <h2 className="font-semibold text-2xl"> Explore projects by category </h2>
                    <p className="text-sm text-muted/75"> Discover our diverse portfolio of interior design projects across various categories, each tailored to meet unique styles and needs. </p>
                </div>
            </div>

            <CategoryList/>

        </section>
    )
}