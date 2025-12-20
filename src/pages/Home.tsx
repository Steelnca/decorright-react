
import { Hero } from "../components/layout/Hero"
import { Categories } from "../components/layout/Categories"
import { Services } from "../components/layout/Services"
import { Showcase } from "../components/layout/Showcase"
import { FAQ } from "../components/layout/FAQ"

export function Home () {
    return (
        <>
            <Hero/>
            <Services/>
            <Categories/>
            <Showcase/>
            <FAQ/>
        </>
    )
}
