import { useState } from "react"
import { Link } from "react-router-dom"
import SafeImage from "../components/SafeImage"
import { BagIcon } from "../components/icons"
import { useCart } from "../context/CartContext"
import { BOX_PRICE, BOX_SIZE, bonbons, formatPrice, productById, shopSections } from "../data/shop"
import type { Bonbon, Product, ShopSection } from "../data/shop"
import "./Shop.css"

export default function Shop() {
    const { add, openCart } = useCart()
    const [box, setBox] = useState<Bonbon[]>([])
    const boxIsFull = box.length === BOX_SIZE

    const addProduct = (product: Product) => {
        add({ id: product.id, name: product.name, details: product.details, price: product.price })
        openCart()
    }

    const addToBox = (bonbon: Bonbon) => setBox((current) => (current.length >= BOX_SIZE ? current : [...current, bonbon]))
    const removeFromBox = (index: number) => setBox((current) => current.filter((_, i) => i !== index))

    const addBoxToCart = () => {
        if (!boxIsFull) return
        const counts = box.reduce<Record<string, number>>((acc, b) => ({ ...acc, [b.name]: (acc[b.name] ?? 0) + 1 }), {})
        add({
            // Состав в id, чтобы разные коробки не склеивались в одну позицию
            id: `custom-box-${Object.entries(counts).map(([n, c]) => `${n}x${c}`).join("-")}`,
            name: `Custom Bonbon Box ${BOX_SIZE} pcs.`,
            details: Object.entries(counts).map(([n, c]) => `${n} × ${c}`).join(", "),
            price: BOX_PRICE,
        })
        setBox([])
        openCart()
    }

    const slots = Array.from({ length: BOX_SIZE }, (_, i) => box[i] ?? null)
    const readyBox = productById("assorted-bonbons-box")

    return (
        <div className="page">
            <div className="page__inner shop">
                <header className="shop__head">
                    <span className="eyebrow">The shop</span>
                    <h1 className="page-title">our chocolate collection</h1>
                    <nav className="shop__jump" aria-label="Sections">
                        {shopSections.map((s) => (
                            <a key={s.id} href={`#${s.id}`}>
                                {s.title}
                            </a>
                        ))}
                        <a href="#bonbons">Bonbons</a>
                    </nav>
                </header>

                {shopSections.map((section) => (
                    <ProductSection key={section.id} section={section} onAdd={addProduct} />
                ))}

                <section className="shop-section" id="bonbons">
                    <SectionHeading
                        eyebrow="04 / Bonbons"
                        title="Assorted Bonbons"
                        description="Choose a ready-made box or assemble your own set of 9 handmade bonbons."
                    />

                    <div className="bonbons-layout">
                        {readyBox && <ProductCard product={readyBox} onAdd={addProduct} />}

                        <div className="builder paper">
                            <div className="builder__title">
                                <span className="eyebrow">Custom bonbon creation</span>
                                <h3 className="block-title">assemble your set</h3>
                                <p>Click on the candies below to fill your 9-piece gift box.</p>
                            </div>

                            <div className="bonbons-grid">
                                {bonbons.map((bonbon) => (
                                    <button key={bonbon.name} type="button" className="bonbon-card" onClick={() => addToBox(bonbon)} disabled={boxIsFull}>
                                        <span className="bonbon-card__img">
                                            <img src={bonbon.image} alt="" />
                                        </span>
                                        <strong>{bonbon.name}</strong>
                                    </button>
                                ))}
                            </div>

                            <div className="custom-box">
                                <div className="box-grid">
                                    {slots.map((slot, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="box-slot"
                                            onClick={() => removeFromBox(i)}
                                            disabled={!slot}
                                            aria-label={slot ? `Remove ${slot.name}` : `Empty slot ${i + 1}`}
                                        >
                                            {slot && <img className="box-bonbon" src={slot.image} alt={slot.name} />}
                                        </button>
                                    ))}
                                </div>

                                <div className="box-caption">
                                    <span className="eyebrow">your custom box</span>
                                    <h3>
                                        {box.length} / {BOX_SIZE} bonbons
                                    </h3>
                                    <p>Click on a candy in a slot to remove it from the set.</p>
                                </div>
                            </div>

                            <button type="button" className="btn-hand btn-hand--block builder__add" disabled={!boxIsFull} onClick={addBoxToCart}>
                                {boxIsFull ? `Add box to cart · ${formatPrice(BOX_PRICE)}` : `fill the box (${box.length}/${BOX_SIZE})`}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
    return (
        <div className="shop-section__head">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="block-title">{title}</h2>
            <p>{description}</p>
        </div>
    )
}

function ProductSection({ section, onAdd }: { section: ShopSection; onAdd: (p: Product) => void }) {
    const items = section.productIds.map(productById).filter((p): p is Product => !!p)
    return (
        <section id={section.id} className={`shop-section shop-section--${section.layout ?? "default"}`}>
            <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
            <div className="products-grid">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} onAdd={onAdd} />
                ))}
            </div>
        </section>
    )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
    return (
        <article className="shop-card paper">
            <Link className="shop-card__link" to={`/product/${product.id}`}>
                <div className="shop-card__visual">
                    <SafeImage src={product.image} alt={product.title} label={product.name} />
                </div>
                <div className="shop-card__main">
                    <span className="eyebrow">{product.details}</span>
                    <h3>{product.title}</h3>
                </div>
            </Link>

            <div className="shop-card__footer">
                <strong>{formatPrice(product.price)}</strong>
                <button type="button" className="icon-btn" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>
                    <BagIcon />
                </button>
            </div>
        </article>
    )
}
