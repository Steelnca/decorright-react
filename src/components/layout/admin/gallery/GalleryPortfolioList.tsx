
import ZoomImage from "@components/ui/ZoomImage";
import { gallery } from "@/constants"
import { Link } from "react-router-dom";
import { PATHS } from "@/routers/Paths";
import { useState } from "react";
import { ICONS } from "@/icons";

export function GalleryPortfolioItem({portfolio}:any) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e:any) => {
        setAnchorEl(e.currentTarget); // Opens specific menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Closes menu
    };

    return (

        <li key={portfolio.id} id={portfolio.id} className="flex flex-col gap-2 w-full h-full border border-red-500">

            <div className="flex gap-1 w-full aspect-video">
                <ZoomImage slot="first" src={portfolio.images.before} className="object-cover object-left w-1/2 h-full rounded-l-lg"/>
                <ZoomImage slot="second" src={portfolio.images.after} className="object-cover object-right w-1/2 h-full rounded-r-lg"/>
            </div>
            <div className="flex gap-2">
                <Link to={PATHS.ADMIN.galleryPortfolioUpdate('slug')} className="flex flex-col gap-2">
                    <h3 className="font-medium text-xs md:text-sm "> {portfolio.label} </h3>
                    <div className="flex flex-wrap w-fit">
                        <span className="text-xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">Public</span>
                        { portfolio.service && <span className="text-xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{portfolio.service}</span> }
                        { portfolio.space && <span className="text-xs min-w-max after:content-['•'] after:mx-1 last:after:content-none">{portfolio.space}</span> }
                    </div>
                    <div className="w-fit border border-red-400">
                        <button type="button" onClick={handleClick}>
                            <ICONS.ellipsisVertical/>
                        </button>
                    </div>
                </Link>

            </div>

        </li>


    )
}

export default function GalleryPortfolioListLayout () {
    return (
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-fit">
            {gallery.map((portfolio) => (
                <GalleryPortfolioItem portfolio={portfolio} />
            ))}
        </ul>
    )
}
