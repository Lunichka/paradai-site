import Hero from "../components/Hero"
import Collection from "../components/Collection"
import Bento from "../components/Bento"
import Gallery from "../components/Gallery"
import Why from "../components/Why"
import CTA from "../components/CTA"

/** Главная: порядок секций меняется здесь. Шапка и футер подключаются в Layout. */
export default function Home() {
    return (
        <>
            <Hero />
            <Collection />
            <Bento />
            <Gallery />
            <Why />

            {/* Закрывающий призыв перед футером */}
            <section className="closing">
                <CTA text="GO TO THE COLLECTION" href="/collection" />
            </section>
        </>
    )
}
