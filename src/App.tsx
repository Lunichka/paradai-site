import Hero from "./components/Hero"
import Collection from "./components/Collection"
import Bento from "./components/Bento"
import Gallery from "./components/Gallery"
import Why from "./components/Why"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

export default function App() {
    return (
        <main>
            <Hero />
            <Collection />
            <Bento />
            <Gallery />
            <Why />

            {/* Закрывающий призыв перед футером */}
            <section className="closing">
                <CTA text="GO TO THE COLLECTION" href="#collection" />
            </section>

            <Footer />
        </main>
    )
}
