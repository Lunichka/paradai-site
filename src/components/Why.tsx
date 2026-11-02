import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import { whySteps as STEPS } from "../data/content"

type Props = {
    bg?: string
    cardAlt?: string
    accent?: string
    ink?: string
    inkSoft?: string
    eyebrow?: string
    heading?: string
    subheading?: string
}

// Неровные «вырезанные вручную» скругления + лёгкий наклон каждой карточки
const CARD_SHAPE = [
    { radius: "26px 10px 22px 14px", rotate: -1.2 },
    { radius: "12px 24px 14px 20px", rotate: 0.8 },
    { radius: "22px 14px 10px 24px", rotate: -0.6 },
    { radius: "14px 20px 24px 12px", rotate: 1 },
    { radius: "24px 12px 16px 22px", rotate: -0.4 },
]

// Зерно бумаги на всю секцию
const GrainOverlay = () => (
    <svg
        aria-hidden
        style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.05,
        }}
    >
        <filter id="pdi-why-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pdi-why-grain)" />
    </svg>
)

// Волнистая линия под лейблом (декоративный штрих, не рамка)
const Squiggle = ({ color }: { color: string }) => (
    <svg aria-hidden width="72" height="10" viewBox="0 0 72 10" style={{ display: "block", margin: "10px auto 0" }}>
        <path
            d="M2 6 C 14 1, 22 9, 34 5 C 46 1, 54 9, 70 4"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
        />
    </svg>
)

// «Рваный край» между заголовком карточки и текстом
const PaperTear = ({ color }: { color: string }) => (
    <svg
        aria-hidden
        viewBox="0 0 280 10"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 10, margin: "14px 0" }}
    >
        <path
            d="M0,5 C12,1 20,9 32,5 C44,1 52,9 64,5 C76,1 84,9 96,5 C108,1 116,9 128,5
               C140,1 148,9 160,5 C172,1 180,9 192,5 C204,1 212,9 224,5
               C236,1 244,9 256,5 C264,2 272,7 280,5 L280,10 L0,10 Z"
            fill={color}
        />
    </svg>
)

function hexToRgba(hex: string, alpha: number): string {
    const clean = hex.replace("#", "")
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`
}

export default function Why({
    bg = "var(--c-bg)",
    cardAlt = "#E7D8BC",
    accent = "#C15C2E",
    ink = "#34211A",
    inkSoft = "#6B5245",
    eyebrow = "WHY · PARADAI",
    heading = "Why choose us",
    subheading = "Five reasons our chocolate tastes like the island it comes from.",
}: Props) {
    const [active, setActive] = useState<number | null>(0)
    const [isMobile, setIsMobile] = useState(false)
    const [dragIdx, setDragIdx] = useState(0)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 810)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const handleCardClick = useCallback((i: number) => {
        setActive((prev) => (prev === i ? null : i))
    }, [])

    // ── Мобильная карусель ──
    const x = useMotionValue(0)
    const CARD_W = 272
    const CARD_GAP = 16
    const STRIDE = CARD_W + CARD_GAP

    const snapTo = (idx: number) => {
        const clamped = Math.max(0, Math.min(STEPS.length - 1, idx))
        setDragIdx(clamped)
        animate(x, -clamped * STRIDE, { type: "spring", stiffness: 320, damping: 36 })
    }

    const handleDragEnd = (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
        const { velocity, offset } = info
        if (Math.abs(velocity.x) > 300) snapTo(velocity.x < 0 ? dragIdx + 1 : dragIdx - 1)
        else if (Math.abs(offset.x) > CARD_W / 3) snapTo(offset.x < 0 ? dragIdx + 1 : dragIdx - 1)
        else snapTo(dragIdx)
    }

    // Цвета текста на активной (терракотовой) карточке: тёмные, а не светлые.
    // Светло-кремовый на #C15C2E даёт контраст ~3.6:1, тёмный ink — ~5:1.
    const onAccentTitle = ink
    const onAccentText = ink

    return (
        <section
            id="why"
            style={{
                width: "100%",
                background: bg,
                padding: isMobile ? "56px 20px 64px" : "88px 32px 96px",
                position: "relative",
                overflow: "hidden",
                color: ink,
            }}
        >
            <GrainOverlay />

            <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52, position: "relative", zIndex: 1 }}>
                <span
                    style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "#A04A22",
                        display: "inline-block",
                    }}
                >
                    {eyebrow}
                </span>
                <Squiggle color={accent} />
                <h2 className="section-title" style={{ margin: "18px 0 20px", color: ink }}>
                    {heading}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: inkSoft, maxWidth: 460, margin: "0 auto", textWrap: "balance" }}>
                    {subheading}
                </p>
            </div>

            {/* ── Десктоп: ряд карточек, клик раскрывает ── */}
            {!isMobile && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 18,
                        maxWidth: 1180,
                        margin: "0 auto",
                        justifyContent: "center",
                    }}
                >
                    {STEPS.map((s, i) => {
                        const isActive = active === i
                        const shape = CARD_SHAPE[i % CARD_SHAPE.length]
                        return (
                            <motion.button
                                type="button"
                                key={s.number}
                                onClick={() => handleCardClick(i)}
                                aria-expanded={isActive}
                                layout
                                initial={{ rotate: shape.rotate }}
                                animate={{ rotate: isActive ? 0 : shape.rotate, scale: isActive ? 1.015 : 1 }}
                                whileHover={{ y: -4, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                                style={{
                                    width: isActive ? 320 : 196,
                                    cursor: "pointer",
                                    textAlign: "left",
                                    font: "inherit",
                                    color: "inherit",
                                    border: 0,
                                    background: isActive ? accent : cardAlt,
                                    borderRadius: shape.radius,
                                    padding: "26px 24px",
                                    boxShadow: isActive
                                        ? `0 18px 36px ${hexToRgba(accent, 0.3)}`
                                        : `0 8px 20px ${hexToRgba(ink, 0.1)}`,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <span
                                    aria-hidden
                                    style={{
                                        position: "absolute",
                                        top: -6,
                                        right: 10,
                                        fontFamily: "var(--font-display)",
                                        fontSize: 56,
                                        lineHeight: 1,
                                        color: isActive ? bg : ink,
                                        opacity: isActive ? 0.22 : 0.08,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {s.number}
                                </span>

                                <div style={{ position: "relative" }}>
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 400,
                                            fontSize: 16,
                                            letterSpacing: "0.02em",
                                            margin: "0 0 8px",
                                            color: isActive ? onAccentTitle : ink,
                                        }}
                                    >
                                        {s.title}
                                    </h3>
                                    <p style={{ fontSize: 13.5, lineHeight: 1.5, color: isActive ? onAccentText : inkSoft }}>
                                        {s.label}
                                    </p>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <PaperTear color={hexToRgba(ink, 0.35)} />
                                                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: onAccentText }}>{s.body}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            )}

            {/* ── Мобильная версия: свайп-карусель ── */}
            {isMobile && (
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ overflow: "hidden", paddingBottom: 6 }}>
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: -(STEPS.length - 1) * STRIDE, right: 0 }}
                            dragElastic={0.12}
                            onDragEnd={handleDragEnd}
                            style={{
                                x,
                                display: "flex",
                                gap: CARD_GAP,
                                paddingLeft: `calc(50vw - ${CARD_W / 2 + 20}px)`,
                                paddingRight: `calc(50vw - ${CARD_W / 2 + 20}px)`,
                                width: "max-content",
                                cursor: "grab",
                            }}
                        >
                            {STEPS.map((s, i) => {
                                const shape = CARD_SHAPE[i % CARD_SHAPE.length]
                                const isFocused = dragIdx === i
                                return (
                                    <motion.div
                                        key={s.number}
                                        style={{
                                            width: CARD_W,
                                            flexShrink: 0,
                                            background: isFocused ? accent : cardAlt,
                                            borderRadius: shape.radius,
                                            padding: "24px 22px",
                                            position: "relative",
                                            overflow: "hidden",
                                            userSelect: "none",
                                        }}
                                        animate={{
                                            opacity: isFocused ? 1 : 0.6,
                                            scale: isFocused ? 1 : 0.95,
                                            rotate: isFocused ? 0 : shape.rotate,
                                        }}
                                        transition={{ duration: 0.28 }}
                                    >
                                        <span
                                            aria-hidden
                                            style={{
                                                position: "absolute",
                                                top: -4,
                                                right: 8,
                                                fontFamily: "var(--font-display)",
                                                fontSize: 48,
                                                color: isFocused ? bg : ink,
                                                opacity: isFocused ? 0.22 : 0.08,
                                            }}
                                        >
                                            {s.number}
                                        </span>
                                        <h3
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontWeight: 400,
                                                fontSize: 15,
                                                margin: "0 0 8px",
                                                color: ink,
                                            }}
                                        >
                                            {s.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                lineHeight: 1.5,
                                                margin: "0 0 10px",
                                                color: isFocused ? onAccentText : inkSoft,
                                            }}
                                        >
                                            {s.label}
                                        </p>
                                        {isFocused && (
                                            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: onAccentText }}>{s.body}</p>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
                        {STEPS.map((_, i) => (
                            <motion.button
                                key={i}
                                type="button"
                                onClick={() => snapTo(i)}
                                aria-label={`Go to reason ${i + 1}`}
                                aria-current={dragIdx === i}
                                style={{
                                    height: 8,
                                    borderRadius: 4,
                                    background: dragIdx === i ? accent : hexToRgba(accent, 0.3),
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                }}
                                animate={{ width: dragIdx === i ? 22 : 8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
