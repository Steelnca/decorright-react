
import { useEffect } from "react";
import { useRef } from "react";

// Card Overlay

export function MenuCard({title, children, open, setOpen}: {title: string, children:any, open:boolean, setOpen:any}) {

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Close when clicking outside


    // Only attach listeners when `open === true`
    useEffect(() => {
        if (!open) return;

        function onPointerDown(e: PointerEvent) {
        const target = e.target as Node;
        // if click inside the dropdown wrapper, ignore
        if (wrapperRef.current && wrapperRef.current.contains(target)) return;
        // otherwise close
        setOpen(false);
        }

        function onKey(e: KeyboardEvent) {
        if (e.key === 'Escape') setOpen(false);
        }

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKey);
        return () => {
        document.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    if (!open) return null;


    return (

        <>

                <div ref={wrapperRef} className="fixed flex justify-center top-0 right-0 w-full md:w-w-[22rem] lg:w-1/3 xl:w-1/4 h-full">

                    <div className="absolute w-full h-full z-10 bg-muted/45 md:mask-l-to-transparent md:mask-l-from-0"></div>

                    <div className="relative p-2 space-y-4 w-full z-20">
                        <div className="flex flex-col gap-2 w-full h-full p-2 border border-muted/25 bg-surface rounded-lg">

                            {/* Card Header */}
                            <div className="flex justify-between w-full h-fit border border-muted/15 p-2 rounded-lg">
                                <h2 className="text-sm font-semibold">{ title }</h2>
                                <button type="button" title="Exist Menu" onClick={() => setOpen(!open)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Card Content */}
                            { children }

                        </div>
                    </div>
                </div>

        </>

    )
}