import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import ZoomImage from "@components/ui/ZoomImage";
import { AdminService, type GalleryItem } from "@/services/admin.service";
import Spinner from "@/components/common/Spinner";
import toast from "react-hot-toast";

import { getLocalizedContent } from "@/utils/i18n";
import { useTranslation } from "react-i18next";

export function GalleryItemCard({ item, lang }: { item: GalleryItem, lang: string }) {
    const { t } = useTranslation();
    return (
        <li className="relative flex flex-col gap-2 w-full h-full rounded-2xl cursor-pointer px-3 md:px-4 border border-muted/20 bg-surface overflow-clip">
            {/* <div className='primary-gallery-card absolute top-0 left-0 w-full h-full border hover:bg-primary/10 rounded-2xl -z-10 mask-b-to-transparent mask-b-to-100%'></div> */}
            <div className="p-3 md:p-4 h-full border-x border-muted/20">
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <div className="relative flex items-center gap-2">
                            <div className="absolute w-2 aspect-square bg-emphasis border border-muted/45 rounded-full ltr:-left-4 md:ltr:-left-5 rtl:-right-5" />
                            <h3 className="font-medium sm:text-lg lg:text-xl "> {getLocalizedContent(item, 'title', lang)} </h3>
                        </div>
                        <p className="text-ellipsis-6line text-2xs md:text-xs text-muted/75"> {getLocalizedContent(item, 'description', lang)} </p>
                    </div>
                </div>

                <div className="relative flex flex-col w-full mt-4">

                    {/* Details & Checklist */}

                    <ImgComparisonSlider className="coloured-slider max-xs:hidden flex h-full aspect-video rounded-lg outline-0 cursor-ew-resize">
                        <figure slot="first" className="relative w-full h-full">
                            <img
                            slot="first"
                            aria-label="Before Image"
                            src={item.before_image_url || ""}
                            className="block w-full h-full object-cover object-center"
                            />
                            <figcaption className="absolute top-2 left-2 font-medium uppercase text-xs text-white px-2 py-0.5 border border-muted/45 bg-black/45 rounded-full">{ t('gallery.before', 'Before') } </figcaption>
                        </figure>

                        <figure slot="second" className="relative w-full h-full">
                            <img
                            slot="second"
                            aria-label="After Image"
                            src={item.after_image_url || ""}
                            className="block w-full h-full object-cover object-center"
                            />
                            <figcaption className="absolute top-2 right-2 font-medium uppercase text-xs text-white px-2 py-0.5 border border-muted/45 bg-black/45 rounded-full"> { t('gallery.after', 'After') } </figcaption>
                        </figure>
                    </ImgComparisonSlider>

                    <div className="xs:hidden flex flex-col gap-4">
                        <div className='flex flex-col gap-1 w-full'>
                            <ZoomImage src={item.before_image_url || ""} className="aspect-video object-cover w-full rounded-lg" />
                            <span className="text-3xs uppercase text-muted text-center"> {t('gallery.before', 'Before')} </span>
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <ZoomImage src={item.after_image_url || ""} className="aspect-video object-cover w-full rounded-lg" />
                            <span className="text-3xs uppercase text-muted text-center"> {t('gallery.after', 'After')} </span>
                        </div>
                    </div>

                    <div className="max-md:hidden absolute -bottom-[105%] w-full h-full border border-muted/15 rounded-lg" />

                </div>
            </div>
        </li>
    );
}

export default function GalleryPortfolioListLayout() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, isAdmin } = useAuth();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Public list shows 'PUBLIC' items to everyone
                // 'AUTHENTICATED_ONLY' to logged-in users
                // and everything including 'HIDDEN' to Admins
                const visibility: any[] = ['PUBLIC'];
                if (user) visibility.push('AUTHENTICATED_ONLY');
                if (isAdmin) visibility.push('HIDDEN');

                const data = await AdminService.getGalleryItems({ visibility });
                setItems(data);
            } catch (error) {
                console.error("Failed to fetch gallery items:", error);
                toast.error("Failed to load gallery items.");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [user]);

    if (loading) return <div className="flex justify-center p-20"><Spinner status={loading} /></div>;

    if (items.length === 0) {
        return (
            <div className="text-center p-20 border-2 border-dashed border-muted/10 rounded-2xl bg-surface/50">
                <p className="text-muted">{t('gallery.no_items', 'No showcase items available at the moment.')}</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {items.map((item) => (
                <GalleryItemCard key={item.id} item={item} lang={i18n.language} />
            ))}
        </ul>
    );
}
