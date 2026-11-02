import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Modal from "../components/Modal"
import SafeImage from "../components/SafeImage"
import { BagIcon } from "../components/icons"
import { useCart } from "../context/CartContext"
import { formatPrice, productById, relatedIds } from "../data/shop"
import type { Product as ProductType } from "../data/shop"
import NotFound from "./NotFound"
import "./Product.css"

export default function Product() {
    const { slug = "" } = useParams()
    const product = productById(slug)
    // key: при переходе на другой товар состояние страницы (фото, количество) начинается заново
    return product ? <ProductView key={product.id} product={product} /> : <NotFound />
}

function ProductView({ product }: { product: ProductType }) {
    const { add, openCart } = useCart()
    const [qty, setQty] = useState(1)
    const [slide, setSlide] = useState(0)
    // что именно добавили — для текста в окне
    const [added, setAdded] = useState<{ name: string; qty: number } | null>(null)

    const images = [product.image, ...(product.info?.gallery ?? [])]
    const info = product.info
    const specs = [
        ["Weight", info?.weight],
        ["Dietary type", info?.dietary],
        ["Ingredients", info?.ingredients],
    ].filter((row): row is [string, string] => !!row[1])

    const related = relatedIds
        .filter((id) => id !== product.id)
        .map(productById)
        .filter((p): p is ProductType => !!p)
        .slice(0, 2)

    const addToCart = (item: ProductType, amount: number) => {
        add({ id: item.id, name: item.name, details: item.details, price: item.price }, amount)
        setAdded({ name: item.title === item.name ? item.name : `${item.title} ${item.details}`.trim(), qty: amount })
    }

    return (
        <div className="page">
            <div className="page__inner page__inner--narrow">
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <ol>
                        <li>
                            <Link to="/">Home</Link>
                            <span className="breadcrumbs__sep" aria-hidden>
                                /
                            </span>
                        </li>
                        <li>
                            <Link to="/collection">Products</Link>
                            <span className="breadcrumbs__sep" aria-hidden>
                                /
                            </span>
                        </li>
                        <li>
                            <span aria-current="page">{product.title}</span>
                        </li>
                    </ol>
                </nav>

                <section className="pdp">
                    <div className="pdp__gallery">
                        {images.length > 1 && (
                            <div className="pdp__thumbs">
                                {images.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        className={`pdp__thumb${slide === i ? " active" : ""}`}
                                        onClick={() => setSlide(i)}
                                        aria-label={`Show image ${i + 1}`}
                                    >
                                        <SafeImage src={src} alt="" label={`${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="pdp__main-image paper">
                            <div>
                                <SafeImage src={images[slide]} alt={product.title} label={product.name} />
                            </div>
                        </div>
                    </div>

                    <div className="pdp__details">
                        <div className="pdp__heading">
                            <span className="eyebrow">{info?.tagline ?? product.details}</span>
                            <h1>{product.title}</h1>
                            <strong>{formatPrice(product.price)}</strong>
                        </div>

                        {(specs.length > 0 || info?.storage) && (
                            <div className="pdp__specs paper">
                                {specs.length > 0 && (
                                    <table>
                                        <tbody>
                                            {specs.map(([label, value]) => (
                                                <tr key={label}>
                                                    <th scope="row">{label}</th>
                                                    <td>{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {info?.storage && (
                                    <div className="pdp__storage">
                                        <p>{info.storage}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="pdp__purchase">
                            <div className="qty-stepper">
                                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                                    −
                                </button>
                                <span aria-live="polite">{qty}</span>
                                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                                    +
                                </button>
                            </div>
                            <button type="button" className="btn-hand pdp__add" onClick={() => addToCart(product, qty)}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="related">
                        <div className="related__head">
                            <span className="eyebrow">Experience more</span>
                            <h2 className="block-title">worth a try</h2>
                        </div>

                        <div className="related__grid">
                            {related.map((item) => (
                                <article className="related-card paper" key={item.id}>
                                    <Link to={`/product/${item.id}`} className="related-card__image" aria-label={item.title}>
                                        <SafeImage src={item.image} alt="" label={item.name} />
                                    </Link>
                                    <div className="related-card__info">
                                        <span className="eyebrow">{item.details}</span>
                                        <h3>
                                            <Link to={`/product/${item.id}`}>{item.title}</Link>
                                        </h3>
                                        <strong>{formatPrice(item.price)}</strong>
                                    </div>
                                    <button type="button" className="icon-btn" onClick={() => addToCart(item, 1)} aria-label={`Add ${item.title} to cart`}>
                                        <BagIcon />
                                    </button>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {added && (
                <Modal
                    title="Added to cart"
                    onClose={() => {
                        setAdded(null)
                        setQty(1)
                    }}
                    actions={
                        <>
                            <button
                                type="button"
                                className="btn-hand btn-hand--block"
                                onClick={() => {
                                    setAdded(null)
                                    setQty(1)
                                    openCart()
                                }}
                            >
                                Open cart
                            </button>
                            <button
                                type="button"
                                className="btn-hand btn-hand--outline btn-hand--block"
                                onClick={() => {
                                    setAdded(null)
                                    setQty(1)
                                }}
                            >
                                Continue
                            </button>
                        </>
                    }
                >
                    {added.qty} pcs. {added.name} added to your order.
                </Modal>
            )}
        </div>
    )
}

