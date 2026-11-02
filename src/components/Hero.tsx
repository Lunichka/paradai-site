import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { clamp, mapRange } from "../lib/math"
import SafeImage from "./SafeImage"
import { heroImages } from "../data/content"

type Props = {
    /** Высота «прокручиваемой» секции (px). Больше — медленнее анимация. */
    sectionHeight?: number
    eyebrow?: string
    title?: string
    subtitle?: string
    scrollHint?: string
    bgColor?: string
    textColor?: string
    accentColor?: string
}

/** Запасной знак-треугольник (рисуется, пока нет triangle.png) */
function TriangleMark({ opacity }: { opacity: number }) {
    return (
        <svg
            viewBox="0 0 60 100"
            aria-hidden
            style={{
                position: "absolute",
                left: "53%",
                top: "50%",
                width: "0.34em",
                height: "auto",
                transform: "translate(-50%, -50%)",
                opacity,
                pointerEvents: "none",
                zIndex: 2,
            }}
        >
            <g fill="none" stroke="#A8915F" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M2 2 L58 98 L2 98 Z" />
                <path d="M2 74 L40 62 M2 86 L26 76 M2 62 L48 50" />
            </g>
        </svg>
    )
}

export default function Hero({
    sectionHeight = 1800,
    eyebrow = "",
    title = "carefully roasted, crafted by hand",
    subtitle = "",
    scrollHint = "Scroll to unwrap",
    bgColor = "#EBE6DA",
    textColor = "#2C1E1A",
    accentColor = "#8A3E25",
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [mouse, setMouse] = useState({ x: 0, y: 0, active: false })
    const [triangleMissing, setTriangleMissing] = useState(false)
    const reduce = useReducedMotion()

    useEffect(() => {
        let raf = 0
        const update = () => {
            raf = 0
            const el = containerRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const total = Math.max(rect.height - window.innerHeight, 1)
            setProgress(clamp(-rect.top / total, 0, 1))
        }
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    // Прогресс: 0 → 1 по мере прокрутки секции
    const logoSplit = mapRange(progress, 0, 0.35, 0, 72)
    const logoOpacity = mapRange(progress, 0.55, 1, 1, 0.18)

    const chocolateY = mapRange(progress, 0, 0.55, 125, -68)
    const chocolateScale = mapRange(progress, 0, 0.32, 0.9, 1.03)
    const chocolateRotate = mapRange(progress, 0, 0.55, -6, 2)

    const podX = mapRange(progress, 0, 0.75, 0, 120)
    const podY = mapRange(progress, 0, 0.75, 0, 86)
    const podScale = mapRange(progress, 0, 0.75, 1, 0.9)
    const podOpacity = mapRange(progress, 0.5, 0.9, 1, 0.15)

    const leafX = mapRange(progress, 0, 0.75, 0, 95)
    const leafY = mapRange(progress, 0, 0.75, 0, -62)
    const leafRotate = mapRange(progress, 0, 0.75, 0, 18)
    const leafOpacity = mapRange(progress, 0.45, 0.82, 1, 0)

    const captionOpacity = mapRange(progress, 0, 0.28, 1, 0)
    const captionY = mapRange(progress, 0, 0.28, 0, -22)

    const triangleOpacity = mapRange(progress, 0.28, 0.62, 1, 0)
    const progressBarHeight = `${progress * 100}%`

    // Параллакс от мыши отключается при prefers-reduced-motion
    const mx = !reduce && mouse.active ? mouse.x : 0
    const my = !reduce && mouse.active ? mouse.y : 0
    const px = (amount: number) => mx * amount
    const py = (amount: number) => my * amount
    const smooth = reduce ? "none" : "80ms linear"

    const beans = [
        { src: heroImages.bean1, top: "18%", left: "14%", width: "10%", toX: -110, toY: -90, fromR: -16, toR: -82, fadeStart: 0.2, fadeEnd: 0.72, parallax: 24, scale: 1.06 },
        { src: heroImages.bean2, top: "28%", left: "9%", width: "7.5%", toX: -145, toY: 56, fromR: 10, toR: 78, fadeStart: 0.22, fadeEnd: 0.74, parallax: 18, scale: 0.92 },
        { src: heroImages.bean3, top: "20%", right: "14%", width: "8.2%", toX: 128, toY: -52, fromR: 12, toR: 88, fadeStart: 0.22, fadeEnd: 0.74, parallax: 20, scale: 0.98 },
        { src: heroImages.bean1, top: "39%", right: "8%", width: "7%", toX: 154, toY: 74, fromR: -12, toR: -74, fadeStart: 0.24, fadeEnd: 0.75, parallax: 16, scale: 0.84 },
        { src: heroImages.bean2, bottom: "19%", left: "18%", width: "6.8%", toX: -78, toY: 104, fromR: 18, toR: 96, fadeStart: 0.24, fadeEnd: 0.78, parallax: 14, scale: 0.86 },
        { src: heroImages.bean3, bottom: "16%", right: "20%", width: "7%", toX: 92, toY: 94, fromR: -14, toR: -94, fadeStart: 0.24, fadeEnd: 0.78, parallax: 18, scale: 0.88 },
    ] as const

    return (
        <section
            id="top"
            ref={containerRef}
            aria-label="Paradai"
            style={{
                width: "100%",
                height: sectionHeight,
                minHeight: 1200,
                position: "relative",
                background: bgColor,
                color: textColor,
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    minHeight: 700,
                    overflow: "hidden",
                }}
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setMouse({
                        x: (e.clientX - rect.left) / rect.width - 0.5,
                        y: (e.clientY - rect.top) / rect.height - 0.5,
                        active: true,
                    })
                }}
                onMouseLeave={() => setMouse({ x: 0, y: 0, active: false })}
            >
                {/* Индикатор прокрутки справа */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        right: "clamp(16px, 2vw, 28px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 20,
                    }}
                >
                    <div
                        style={{
                            width: 2,
                            height: 132,
                            background: `${textColor}22`,
                            position: "relative",
                            borderRadius: 99,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: "0 auto auto 0",
                                width: "100%",
                                height: progressBarHeight,
                                background: textColor,
                                borderRadius: 99,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: progressBarHeight,
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: textColor,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    </div>
                </div>

                {/* Логотип PARADAI на фоне: «раскрывается» при прокрутке */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        zIndex: 1,
                        opacity: logoOpacity,
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "var(--font-wordmark)",
                            fontSize: "clamp(72px, 12vw, 200px)",
                            lineHeight: 0.86,
                            letterSpacing: "-0.04em",
                            color: textColor,
                            userSelect: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span
                            style={{
                                transform: `translateX(-${logoSplit}px)`,
                                transition: `transform ${smooth}`,
                            }}
                        >
                            PAR
                        </span>

                        {triangleMissing ? (
                            <TriangleMark opacity={triangleOpacity} />
                        ) : (
                            <img
                                src={heroImages.triangle}
                                alt=""
                                onError={() => setTriangleMissing(true)}
                                style={{
                                    position: "absolute",
                                    left: "53%",
                                    top: "50%",
                                    width: "0.48em",
                                    height: "auto",
                                    transform: "translate(-50%, -50%)",
                                    opacity: triangleOpacity * 0.9,
                                    pointerEvents: "none",
                                    zIndex: 2,
                                }}
                            />
                        )}

                        <span style={{ width: "clamp(50px, 10vw, 150px)" }} />
                        <span
                            style={{
                                transform: `translateX(${logoSplit}px)`,
                                transition: `transform ${smooth}`,
                            }}
                        >
                            DAI
                        </span>
                    </div>
                </div>

                {/* Текстовый блок */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "clamp(48px, 8vh, 86px)",
                        transform: "translateX(-50%)",
                        width: "min(92vw, 900px)",
                        textAlign: "center",
                        zIndex: 10,
                    }}
                >
                    {eyebrow && (
                        <div
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: accentColor,
                                marginBottom: 14,
                            }}
                        >
                            {eyebrow}
                        </div>
                    )}

                    <h1
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 400,
                            fontSize: "clamp(22px, 2.6vw, 34px)",
                            lineHeight: 1.22,
                            letterSpacing: "-0.03em",
                            color: textColor,
                            textWrap: "balance",
                        }}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            style={{
                                margin: "18px auto 0",
                                width: "min(88vw, 620px)",
                                fontSize: "clamp(15px, 1.4vw, 19px)",
                                lineHeight: 1.6,
                                color: `${textColor}CC`,
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Шоколадка */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "60%",
                        width: "clamp(220px, 26vw, 390px)",
                        aspectRatio: "0.73 / 1",
                        zIndex: 12,
                        transform: `translate(-50%, -50%) translate(${px(12)}px, ${py(12) + chocolateY}px) scale(${chocolateScale}) rotate(${chocolateRotate}deg)`,
                        transition: `transform ${smooth}`,
                        filter: "drop-shadow(0 20px 50px rgba(44, 30, 26, 0.20))",
                    }}
                >
                    <SafeImage src={heroImages.chocolate} alt="Paradai chocolate bar" label="Chocolate" fit="contain" />
                </div>

                {/* Стручок */}
                <div
                    style={{
                        position: "absolute",
                        right: "clamp(8%, 10vw, 14%)",
                        bottom: "clamp(10%, 12vh, 18%)",
                        width: "clamp(130px, 16vw, 220px)",
                        aspectRatio: "1 / 1",
                        zIndex: 8,
                        opacity: podOpacity,
                        transform: `translate(${px(22) + podX}px, ${py(18) + podY}px) scale(${podScale})`,
                        transition: `transform ${smooth}, opacity ${smooth}`,
                        filter: "drop-shadow(0 12px 26px rgba(44, 30, 26, 0.15))",
                    }}
                >
                    <SafeImage src={heroImages.pod} alt="Open cacao pod" label="Cacao pod" fit="contain" />
                </div>

                {/* Лист */}
                <div
                    style={{
                        position: "absolute",
                        right: "clamp(14%, 14vw, 18%)",
                        top: "clamp(28%, 30vh, 36%)",
                        width: "clamp(120px, 15vw, 210px)",
                        aspectRatio: "1 / 1",
                        zIndex: 7,
                        opacity: leafOpacity,
                        transform: `translate(${px(28) + leafX}px, ${py(22) + leafY}px) rotate(${leafRotate}deg)`,
                        transition: `transform ${smooth}, opacity ${smooth}`,
                    }}
                >
                    <SafeImage src={heroImages.leaf} alt="Cacao leaf" label="Leaf" fit="contain" />
                </div>

                {/* Бобы */}
                {beans.map((bean, i) => {
                    const beanX = mapRange(progress, 0, 0.72, 0, bean.toX)
                    const beanY = mapRange(progress, 0, 0.72, 0, bean.toY)
                    const beanR = mapRange(progress, 0, 0.72, bean.fromR, bean.toR)
                    const beanOpacity = mapRange(progress, bean.fadeStart, bean.fadeEnd, 1, 0)
                    const pos = bean as { top?: string; left?: string; right?: string; bottom?: string }

                    return (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                top: pos.top,
                                left: pos.left,
                                right: pos.right,
                                bottom: pos.bottom,
                                width: bean.width,
                                aspectRatio: "1 / 1",
                                zIndex: 9,
                                opacity: beanOpacity,
                                transform: `translate(${px(bean.parallax) + beanX}px, ${py(bean.parallax * 0.8) + beanY}px) rotate(${beanR}deg) scale(${bean.scale})`,
                                transition: `transform ${smooth}, opacity ${smooth}`,
                                filter: "drop-shadow(0 10px 20px rgba(44, 30, 26, 0.12))",
                            }}
                        >
                            <SafeImage src={bean.src} alt="" label={`Bean ${(i % 3) + 1}`} fit="contain" />
                        </div>
                    )
                })}

                {/* Подсказка внизу */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "clamp(18px, 4vh, 32px)",
                        transform: `translateX(-50%) translateY(${captionY}px)`,
                        opacity: captionOpacity,
                        zIndex: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        pointerEvents: "none",
                    }}
                >
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: `${textColor}AA`,
                            textAlign: "center",
                        }}
                    >
                        {scrollHint}
                    </span>

                    <div style={{ width: 12, height: 28, position: "relative", opacity: 0.65 }}>
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: 0,
                                bottom: 0,
                                width: 1.5,
                                background: textColor,
                                transform: "translateX(-50%)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                bottom: 0,
                                width: 8,
                                height: 8,
                                borderBottom: `1.5px solid ${textColor}`,
                                borderRight: `1.5px solid ${textColor}`,
                                transform: "translateX(-50%) rotate(45deg)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
