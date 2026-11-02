import { useState } from "react"
import { motion } from "framer-motion"
import SafeImage from "./SafeImage"
import { products } from "../data/content"
import "./Collection.css"

const EASE = [0.16, 1, 0.3, 1] as const

type Product = (typeof products)[number]

// Нарисованная «карандашом» рамка вокруг фото при наведении
function PencilImageOutline({ visible, color }: { visible: boolean; color: string }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
            className="pencil-outline"
        >
            <motion.path
                d="M6 8 C24 3, 72 5, 94 9 C98 30, 97 66, 92 93 C66 98, 30 96, 7 91 C3 68, 4 32, 6 8"
                fill="none"
                stroke={color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 3"
                initial={false}
                animate={{ opacity: visible ? 0.72 : 0, pathLength: visible ? 1 : 0 }}
                transition={{ duration: 0.55, ease: EASE }}
            />
            <motion.path
                d="M8 11 C30 7, 68 4, 92 10 C96 34, 94 72, 90 90 C63 95, 34 98, 10 89 C5 62, 7 36, 8 11"
                fill="none"
                stroke={color}
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ opacity: visible ? 0.42 : 0, pathLength: visible ? 1 : 0 }}
                transition={{ duration: 0.68, ease: EASE, delay: 0.03 }}
            />
        </motion.svg>
    )
}

function Card({ p, idx }: { p: Product; idx: number }) {
    const [hovered, setHovered] = useState(false)
    const [ctaHovered, setCtaHovered] = useState(false)

    return (
        // Внешний слой — только подъём по hover (CSS), внутренний — появление при скролле (motion).
        // Раньше оба боролись за один transform.
        <div
            className="product-lift"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false)
                setCtaHovered(false)
            }}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
        >
            <motion.article
                className="product-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.07, ease: EASE }}
            >
                <div className="product-card__top">
                    <span className="product-card__slug" style={{ color: p.accent }}>
                        {p.index} / {p.slug}
                    </span>
                    <motion.div
                        animate={{ scale: hovered ? 1.7 : 1 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="product-card__dot"
                        style={{ background: p.accent }}
                    />
                </div>

                <h3 className="product-card__name">{p.name}</h3>

                <div className="product-card__image">
                    <motion.div
                        className="product-card__image-inner"
                        animate={hovered ? { scale: 1.06, rotate: 2 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <PencilImageOutline visible={hovered} color={p.accent} />
                        <SafeImage src={p.image} alt={p.name} fit="contain" />
                    </motion.div>
                </div>

                <p className="product-card__desc">{p.desc}</p>

                <div className="product-card__cta-row">
                    <a
                        href={p.href}
                        className="product-card__cta"
                        onMouseEnter={() => setCtaHovered(true)}
                        onMouseLeave={() => setCtaHovered(false)}
                    >
                        <span className="product-card__cta-text">
                            {p.cta}
                            <motion.span
                                aria-hidden
                                className="product-card__cta-line"
                                animate={{ scaleX: ctaHovered ? 1 : 0 }}
                                transition={{ duration: 0.32, ease: EASE }}
                                style={{ background: p.accent }}
                            />
                        </span>
                        <motion.span
                            aria-hidden
                            className="product-card__cta-arrow"
                            animate={{ x: ctaHovered ? 5 : 0 }}
                            transition={{ duration: 0.38, ease: EASE }}
                            style={{ color: p.accent }}
                        >
                            →
                        </motion.span>
                    </a>
                </div>
            </motion.article>
        </div>
    )
}

export default function Collection() {
    return (
        <section id="collection" className="collection">
            <div className="container">
                <motion.div
                    className="collection__head"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, ease: EASE }}
                >
                    <h2 className="section-title">our chocolate collection</h2>
                </motion.div>

                <div className="collection__grid">
                    {products.map((p, i) => (
                        <Card key={p.index} p={p} idx={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
