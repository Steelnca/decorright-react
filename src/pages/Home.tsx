
import { Hero } from "../components/layout/Hero"
import { Categories } from "../components/layout/Categories"
import { Services } from "../components/layout/Services"
import { Projects } from "../components/layout/Projects"
import { FAQ } from "../components/layout/FAQ"

export function Home () {
    return (
        <>
            <Hero/>
            <Services/>
            <Categories/>
            <Projects/>
            <FAQ/>
        </>
    )
}
