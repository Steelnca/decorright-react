
import { Hero } from "../components/layout/Hero"
import { ServicesHero } from "../components/layout/Services"
import { ProjectsHero } from "../components/layout/Projects"
import { FAQ } from "../components/layout/FAQ"

export function Home () {
    return (
        <>
            <main className="bg-linear-3 from-transparent via-primary/15 to-surface/45">
                <Hero/>
            </main>
            <ServicesHero/>
            <ProjectsHero/>
            <FAQ/>
        </>
    )
}
