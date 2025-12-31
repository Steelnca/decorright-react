
export function SectionHeader({name, title, desc}:{name?:string, title:string, desc:string}){

    return (
        <div className="flex flex-col gap-2 md:gap-4 w-full">
            { name && <h2 className="font-medium text-sm md:text-base w-fit px-2 md:px-3 py-1 bg-emphasis rounded-full"> { name } </h2> }
            <div className="flex flex-col gap-2 md:gap-4 w-full">
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl"> { title } </h3>
                <p className="text-2xs sm:text-xs md:text-sm text-muted/75"> { desc }  </p>
            </div>
        </div>
    )
}