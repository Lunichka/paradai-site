// Каталог магазина: страница /collection, карточки товара /product/:slug и корзина берут данные отсюда.
// Чтобы добавить товар, добавьте объект в products и его id в нужную секцию (shopSections).

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type ProductDetails = {
    /** Подзаголовок над названием на странице товара */
    tagline?: string
    weight?: string
    dietary?: string
    ingredients?: string
    storage?: string
    /** Дополнительные фото для галереи на странице товара */
    gallery?: string[]
}

export type Product = {
    /** id = адрес страницы: /product/<id> */
    id: string
    name: string
    title: string
    details: string
    price: number
    /** Путь к фото: asset("images/products/….webp"). Часть товаров пока ещё ссылается на чужие сайты — замените на свои файлы. */
    image: string
    info?: ProductDetails
}

export const products: Product[] = [
    {
        id: "phuket-dark-milk-60-1",
        name: "Phuket Dark Milk 60%",
        title: "Dark Milk Chocolate 60%",
        details: "Phuket Collection",
        price: 7.5,
        image: asset("images/products/phuket-milk-60.webp"),
    },
    {
        id: "phuket-dark-milk-63",
        name: "Phuket Dark Milk 63%",
        title: "Dark Milk Chocolate 63%",
        details: "Belize",
        price: 7.5,
        image: asset("images/products/belize-63.webp"),
    },
    {
        id: "phuket-sugar-free-77",
        name: "Phuket Sugar-Free 77%",
        title: "Dark Milk Chocolate 77%",
        details: "Sugar-Free",
        price: 7.5,
        image: asset("images/products/sugar-free-77.webp"),
    },
    {
        id: "phuket-dark-milk-60-2",
        name: "Phuket Dark Milk 60% Blue",
        title: "Dark Milk Chocolate 60%",
        details: "Phuket Collection",
        price: 7.5,
        image: asset("images/products/phuket-milk-60-b.webp"),
    },
    {
        id: "phuket-dark-milk-60-3",
        name: "Phuket Dark Milk 75% Green",
        title: "Dark Milk Chocolate 75%",
        details: "Phuket Collection",
        price: 7.5,
        image: asset("images/products/nakhon-75.webp"),
        info: { gallery: [asset("images/products/nakhon-75-lifestyle.webp")] },
    },
    {
        id: "origin-dark-70",
        name: "Single Origin Dark 70%",
        title: "Single Origin Dark 70%",
        details: "Single Ingredient Artisan Bar",
        price: 7.5,
        image: asset("images/products/chanthaburi-70.webp"),
        info: { gallery: [asset("images/products/chanthaburi-70-lifestyle.webp")] },
    },
    {
        id: "origin-dark-85",
        name: "Single Origin Dark 85%",
        title: "Single Origin Dark 85%",
        details: "Single Ingredient Artisan Bar",
        price: 8.5,
        image: "https://hellochocolate.com/cdn/shop/products/paradai-dark-chocolate-palo-five-spices-70-241950.jpg?v=1676483582&width=1000",
    },
    {
        id: "thai-cacao-powder",
        name: "Thai Cacao Powder",
        title: "100% Pure Thai Cacao Powder",
        details: "Cocoa Powder",
        price: 9.5,
        image: "https://craftchocolate.store/chocolade/wp-content/uploads/2025/12/paradai-cacaopoeder-phuket-thailand-natuurlijk.jpg",
    },
    {
        id: "assorted-bonbons-box",
        name: "Assorted Bonbons Box",
        title: "Assorted Bonbons",
        details: "Handmade Chocolate Bonbons",
        price: 18,
        image: "https://img.lazcdn.com/g/p/1a8cf365020d789933a567bfdd962243.jpg_720x720q80.jpg",
    },
    // Товары, которых нет в сетке магазина, но у которых есть своя страница («worth a try»).
    {
        id: "trang82",
        name: "Dark Chocolate Trang 82%",
        title: "Dark Chocolate Trang 82%",
        details: "Single Origin",
        price: 7.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwvc-USpus9iyzvSXAGkeZVVcA-9nPbWBKp9efWGd9kz3LFxlJoThwzpG&s=10",
        info: {
            tagline: "award winning • single origin",
            weight: "50g (1.76 Oz)",
            dietary: "Vegan, Organic",
            ingredients: "Cocoa beans, organic sugar. No additives.",
            storage:
                "Keep in a cool, dry place, away from direct light and strong odors. Store at maximum 18°C in its original packaging.",
            gallery: ["https://craftchocolate.store/chocolade/wp-content/uploads/2024/03/paradai-chocolate-bar-dark.jpg"],
        },
    },
    {
        id: "nakhon-60",
        name: "Dark Milk Nakhon 60%",
        title: "Dark Milk Chocolate",
        details: "Nakhon 60%",
        price: 7.5,
        image: asset("images/products/nakhon-58.webp"),
    },
]

export const productById = (id: string) => products.find((p) => p.id === id)

/** Что показывать в блоке «worth a try» на странице товара (текущий исключается). */
export const relatedIds = ["phuket-dark-milk-63", "nakhon-60", "trang82"]

// Секции страницы /collection (id секции = якорь: /collection#bonbons)
export type ShopSection = {
    id: string
    eyebrow: string
    title: string
    description: string
    productIds: string[]
    layout?: "default" | "compact" | "feature"
}

export const shopSections: ShopSection[] = [
    {
        id: "collection",
        eyebrow: "01 / Collection",
        title: "Phuket Collection",
        description: "Bright, tropical chocolate bars inspired by Phuket cacao and local craft.",
        productIds: [
            "phuket-dark-milk-60-1",
            "phuket-dark-milk-63",
            "phuket-sugar-free-77",
            "phuket-dark-milk-60-2",
            "phuket-dark-milk-60-3",
        ],
    },
    {
        id: "classic",
        eyebrow: "02 / Single Origin",
        title: "Single Origin Dark",
        description: "Minimal, deeper chocolate bars focused on cacao character and origin.",
        productIds: ["origin-dark-70", "origin-dark-85"],
        layout: "compact",
    },
    {
        id: "others",
        eyebrow: "03 / Cacao",
        title: "Cocoa Powder",
        description: "Pure cacao powder for drinks, baking and everyday chocolate rituals.",
        productIds: ["thai-cacao-powder"],
        layout: "feature",
    },
]

// ── Конструктор коробки бонбоньерок ──────────────────────────────────────────
export type Bonbon = { name: string; image: string }

export const bonbons: Bonbon[] = [
    { name: "Hazelnut Malibu", image: asset("images/bonbons/hazelnut-malibu.webp") },
    { name: "Macadamia Coffee", image: asset("images/bonbons/macadamia-coffee.webp") },
    { name: "Rum Raisin", image: asset("images/bonbons/rum-raisin.webp") },
    { name: "Double Dark", image: asset("images/bonbons/double-dark.webp") },
    { name: "Matcha Sencha", image: asset("images/bonbons/matcha-sencha.webp") },
    { name: "Yuzu Honey", image: asset("images/bonbons/yuzu-honey.webp") },
    { name: "Refreshing Mint", image: asset("images/bonbons/refreshing-mint.webp") },
    { name: "Mix Berry", image: asset("images/bonbons/mix-berry.webp") },
]

export const BOX_SIZE = 9
export const BOX_PRICE = 18
export const SHIPPING_PRICE = 2

export const formatPrice = (value: number) => `$${value.toFixed(2)}`
