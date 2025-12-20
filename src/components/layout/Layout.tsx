
import { Outlet } from "react-router-dom"

import { NavBar } from "./NavBar"
import Footer from "./Footer"

export function Layout () {
    return (
        <>
            <header className="relative w-full z-30 border-b border-muted/10">
                <NavBar/>
            </header>

            <main className="h-full min-h-[calc(100svh-4.5rem-6rem)] md:min-h-[calc(100svh-4.5rem-7.5rem)] overflow-hidden">
                <Outlet/>
            </main>

            <footer className="content-center">
                <Footer/>
            </footer>

        </>
    )
}
