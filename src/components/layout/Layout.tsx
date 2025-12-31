
import { Outlet } from "react-router-dom"

import { NavBar } from "./NavBar"
import Footer from "./Footer"

export function VisitorLayout () {
    return (
        <>
            <header className="content-container relative flex justify-center w-full z-30">
                <NavBar/>
            </header>

            <Outlet/>

            <footer className="content-center">
                <Footer/>
            </footer>

        </>
    )
}

export function CustomerLayout () {
    return (
        <>
            <header className="content-container relative flex justify-center w-full z-30">
                <NavBar/>
            </header>

            <Outlet/>

        </>
    )
}
