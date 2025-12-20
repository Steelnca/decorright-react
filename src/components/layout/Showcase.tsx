
import { useState } from "react"

import { Link } from "react-router-dom"

import { images } from "../../constants";


export function ShowcaseCard ({showcase, index}: {showcase: {title: string; date: string; imgSrc: string}, index: number}) {

    const [liked, setLiked] = useState(false);

    return (


        <li key={index} >

            <Link to={'/'} className="flex flex-col h-fit gap-1">
                <div className="w-full aspect-video mb-2 overflow-hidden">
                    <img src={showcase.imgSrc} alt="" className="object-cover h-full w-full rounded-xl" />
                </div>
                <div className="flex gap-1">
                    <h3 className="font-medium text-sm"> {showcase.title} </h3>
                    <div className="flex h-fit gap-4 text-muted ml-auto px-1">
                        {/* Placeholder for future icons or actions */}
                        <div className="flex gap-0.5 pt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                            <span className="text-2xs"> {/* statistic count goes here */} 22k </span>
                        </div>

                        <div className="flex gap-0.5 pt-0.5">
                            <button type="button" onClick={() => setLiked(!liked)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${liked ? 'fill-red-500 text-red-500' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button>
                            <span className="text-2xs"> {/* statistic count goes here */} {liked ? 480 + 1: 480} </span>
                        </div>

                    </div>
                </div>

                <p className="text-2xs text-muted/75"> {showcase.date} </p>
            </Link>
        </li>

    )
}

export function ShowcaseCardList () {

    const showcaseProjects = [
        {
            title: 'Interior Design Furniture Selection & Project Management Decr',
            date: '6 months ago',
            imgSrc: images.image1
        },

        {
            title: 'Furniture Selection Interior Design',
            date: '2 months ago',
            imgSrc: images.image2
        },

        {
            title: 'Interior Redesign & Color Consultation',
            date: '18 days ago',
            imgSrc: images.image3
        },

        {
            title: 'Space Planning & Color Consultation',
            date: '3 years ago',
            imgSrc: images.image4
        },

        {
            title: 'Project Management & Space Planning',
            date: '11 months ago',
            imgSrc: images.image5
        },

        {
            title: 'Redesign & Interior Design',
            date: '4 years ago',
            imgSrc: images.image6
        },

        {
            title: 'Furniture Selection & Redesign',
            date: '3 weeks ago',
            imgSrc: images.image2
        },

        {
            title: 'Color Consultation & Interior Design',
            date: '9 weeks ago',
            imgSrc: images.image1
        },

    ];

    return (
        <ul className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 md:gap-6 w-full">

            {showcaseProjects.map((showcase, index) => (
                <ShowcaseCard key={index} showcase={showcase} index={index} />
            ))}

        </ul>
    )
}

export function Showcase () {
    return (
        <section className="content-container flex flex-col gap-6 w-full my-18">
            {/* Section Header */}
            <h2 className="font-medium text-lg w-fit px-3 py-1 bg-emphasis rounded-full"> Showcase </h2>
            <div className="flex flex-col gap-4 w-full">
                <h3 className="font-semibold text-2xl"> Browse our previous projects from our showcase </h3>
                <p className="text-xs md:text-sm text-muted/75"> A curated selection of our finest interior design projects, highlighting our commitment to quality, creativity, and client satisfaction. Explore the diverse styles and innovative solutions that define our work. </p>
            </div>

            {/* Showcase Cards */}
            <ShowcaseCardList/>

        </section>
    )
}