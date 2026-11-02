// Весь контент и пути к картинкам — в одном месте, чтобы править не трогая вёрстку.

// Файлы из public/ подключаем через BASE_URL, чтобы пути работали и на корне домена,
// и на GitHub Pages в подпапке (https://<user>.github.io/<repo>/).
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// ── Hero ─────────────────────────────────────────────────────────────────────
// Положите PNG с прозрачным фоном в public/images/hero/ с этими именами.
export const heroImages = {
    chocolate: asset("images/hero/chocolate.png"),
    pod: asset("images/hero/pod.png"),
    leaf: asset("images/hero/leaf.png"),
    bean1: asset("images/hero/bean-1.png"),
    bean2: asset("images/hero/bean-2.png"),
    bean3: asset("images/hero/bean-3.png"),
    // Если файла нет, рисуется запасной SVG-треугольник
    triangle: asset("images/hero/triangle.png"),
}

// ── Collection ───────────────────────────────────────────────────────────────
// TODO: пока отдельных страниц нет, все ссылки ведут на якорь секции.
export const products = [
    {
        index: "01",
        slug: "collection",
        name: "Phuket Collection",
        desc: "Flavors of the southern tropics",
        cta: "View Collection",
        href: "#collection",
        accent: "#8A5C3A",
        // ⚠ сейчас это ссылки на чужие сайты. Скачайте фото в public/images/products/
        // и замените на asset("images/products/phuket.jpg") и т.д.
        image: "https://craftchocolate.store/chocolade/wp-content/uploads/2025/01/phuket-paradai-70-puur.jpg",
    },
    {
        index: "02",
        slug: "bonbons",
        name: "Assorted Bonbons",
        desc: "Handmade chocolate bonbons",
        cta: "View Bonbons",
        href: "#collection",
        accent: "#7B4B72",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJxbPZ7U4jOZygzbUyOyO5iDno6QWyUP9woukJdfRZ014ufrxiMg59ME&s=10",
    },
    {
        index: "03",
        slug: "classic",
        name: "Single Origin Dark",
        desc: "Single ingredient artisan bars",
        cta: "View Classic",
        href: "#collection",
        accent: "#3D6B50",
        image: "https://hellochocolate.com/cdn/shop/products/paradai-dark-chocolate-pure-coconut-sugar-70-264640.jpg?v=1676483576&width=1000",
    },
    {
        index: "04",
        slug: "others",
        name: "Cacao Powder",
        desc: "100% pure Thai cacao powder",
        cta: "View Others",
        href: "#collection",
        accent: "#8C6239",
        image: "https://craftchocolate.store/chocolade/wp-content/uploads/2025/12/paradai-cacaopoeder-doosje-met-zakje.jpg",
    },
]

// ── Bento ("from Phuket with pride") ─────────────────────────────────────────
// ⚠ Это превью Unsplash+ (на фото виден водяной знак). Нужна купленная/своя фотография.
export const bentoPhoto =
    "https://plus.unsplash.com/premium_photo-1679366698077-cc947df22bd0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

// ── Why Paradai ──────────────────────────────────────────────────────────────
export const whySteps = [
    {
        number: "01",
        title: "ORIGIN",
        label: "From Phuket, Thailand",
        body: "We source cacao exclusively from small family farms in Phuket's highlands — where volcanic soil and coastal humidity produce beans with a rare floral depth no other region can replicate.",
    },
    {
        number: "02",
        title: "FARM",
        label: "Working closely with farmers",
        body: "Direct relationships, fair prices, and regular farm visits. We help growers refine fermentation — the invisible craft that determines 70% of a chocolate's final flavour.",
    },
    {
        number: "03",
        title: "CRAFT",
        label: "Small batch production",
        body: "Each batch is 25 kg — stone-ground for 48 hours, tempered by hand, and poured into moulds one bar at a time. No shortcuts. Every imperfection is proof it's real.",
    },
    {
        number: "04",
        title: "AWARDS",
        label: "Internationally recognised",
        body: "Gold at the International Chocolate Awards. Two stars at the Great Taste Awards. Recognition we're proud of — but it's the farmers who deserve the podium.",
    },
    {
        number: "05",
        title: "LOCALE",
        label: "Crafted with local pride",
        body: "Wrapped in hand-printed Thai mulberry paper. Packed in upcycled cacao-husk boxes. Every detail is a love letter to the island that made this chocolate possible.",
    },
]

// ── Gallery ──────────────────────────────────────────────────────────────────
// Положите фото в public/images/gallery/ (jpg/webp). Подписи — временные, поправьте.
export const galleryPhotos = [
    { src: asset("images/gallery/01.jpg"), alt: "Melted chocolate being poured from a steel tempering pot", caption: "tempering" },
    { src: asset("images/gallery/02.jpg"), alt: "Two chocolate makers working in the Paradai kitchen", caption: "the kitchen" },
    { src: asset("images/gallery/03.jpg"), alt: "Roasted cacao beans in a roasting drum", caption: "roasting" },
    { src: asset("images/gallery/04.jpg"), alt: "Hand-wrapped chocolate bars ready for packing", caption: "wrapping" },
    { src: asset("images/gallery/05.jpg"), alt: "Cacao pods on a Phuket farm", caption: "the farm" },
    { src: asset("images/gallery/06.jpg"), alt: "Finished Paradai bars on a wooden table", caption: "the bars" },
]

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerContent = {
    headline: ["Paradai Chocolate", "Crafted in Bangkok, Thailand"],
    copyright: "© 2026 Paradai. All rights reserved.",
    email: "hello@paradaichocolate.com",
    phone: "+66 2981 6413",
    phoneHref: "tel:+6629816413",
    nav: [
        { label: "Collection", href: "#collection" },
        { label: "From Phuket", href: "#story" },
        { label: "Workshop", href: "#workshop" },
        { label: "Why Paradai", href: "#why" },
    ],
}
