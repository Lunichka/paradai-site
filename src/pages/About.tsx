import { useRef } from "react"
import type { ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import SafeImage from "../components/SafeImage"
import SmartLink from "../components/SmartLink"
import { heroImages } from "../data/content"
import "./About.css"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
/** Угол, под которым карточки «влетают» при прокрутке */
const ENTRY_TILT = 10

// Портрет — временная картинка с чужого сайта. Положите свою в public/images/about/ и поправьте путь.
const FOUNDER_PHOTO = "https://media.timeout.com/images/105696892/750/562/image.jpg"

const FLAVORS: [string, number][] = [
    ["Honey sweetness", 85],
    ["Lychee & floral", 70],
    ["Citrus notes", 40],
    ["Banana", 75],
    ["Cacao intensity", 90],
]

export default function About() {
    // Анимации отключаются при prefers-reduced-motion
    const animate = !useReducedMotion()

    const timelineRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 85%", "end 65%"] })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div className="page about">
            <div className="page__inner page__inner--narrow">
                <section className="about__hero">
                    <motion.h1
                        className="page-title"
                        initial={animate ? { opacity: 0, y: 18 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        the phuket cacao <span>story</span>
                    </motion.h1>
                    <motion.p
                        className="page-lead"
                        initial={animate ? { opacity: 0, y: 18 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    >
                        A journey born in the wild highlands of Phuket, shaped by family tradition and crafted with uncompromising local pride.
                    </motion.p>
                </section>

                <section className="timeline" ref={timelineRef}>
                    <motion.div className="timeline__line" style={{ scaleY: animate ? lineScale : 1 }} />

                    <TimelineItem
                        number="01 / The Farm"
                        title="Rooted in Phuket"
                        text="The cocoa comes from one single-origin estate in Phuket, where Warit grew up. The cocoa farmer is his mother, who grows cocoa naturally in addition to many other traditional tropical crops."
                        animate={animate}
                    >
                        <Reveal className="cacao-card paper" rest={2} direction={-1} hoverFlatten delay={0.12} animate={animate}>
                            <div className="cacao-card__art">
                                <SafeImage src={heroImages.pod} alt="" label="Cacao pod" fit="contain" />
                            </div>
                            <p>Phuket Highlands Soil</p>
                        </Reveal>
                    </TimelineItem>

                    <TimelineItem
                        number="02 / The Makers"
                        title="Crafted with Care"
                        text="Phurich grew up surrounded by cacao trees in Phuket. Today, he works directly with local farmers, overseeing every single stage of production—from bean to bar—inside our family factory in the old town."
                        reverse
                        animate={animate}
                    >
                        <Reveal className="founder-card paper" rest={-2} direction={1} hoverFlatten delay={0.12} animate={animate}>
                            <div className="founder-card__photo">
                                <SafeImage src={FOUNDER_PHOTO} alt="Portrait placeholder" label="Portrait" />
                            </div>
                            <div className="founder-card__caption">
                                <h4>Phurich Tanawut</h4>
                                <p>Co-Founder &amp; Head Maker</p>
                            </div>
                        </Reveal>
                    </TimelineItem>

                    <TimelineItem
                        number="03 / The Taste"
                        title="The Butter Dominance"
                        text="Compared to other Paradai chocolates, the fruitiness and acidity here are slightly milder. This unique balance allows the rich, velvety cocoa butter to dominate, letting subtle undertones unfold gracefully."
                        animate={animate}
                    >
                        <Reveal className="flavor-card paper" rest={-1} direction={-1} tilt={0.6} delay={0.12} animate={animate}>
                            <h4 className="eyebrow">Flavor profile</h4>
                            <div className="flavor-list">
                                {FLAVORS.map(([label, value], i) => (
                                    <div className="flavor-row" key={label}>
                                        <div className="flavor-label">
                                            <span>{label}</span>
                                            <strong>{value}%</strong>
                                        </div>
                                        <div className="flavor-track">
                                            <motion.div
                                                className="flavor-fill"
                                                initial={{ width: animate ? "0%" : `${value}%` }}
                                                whileInView={{ width: `${value}%` }}
                                                viewport={{ once: true, amount: 0.6 }}
                                                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE }}
                                            />
                                            <motion.div
                                                className="flavor-dot"
                                                initial={{ left: animate ? "0%" : `${value}%` }}
                                                whileInView={{ left: `${value}%` }}
                                                viewport={{ once: true, amount: 0.6 }}
                                                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </TimelineItem>

                    <TimelineItem
                        number="04 / The Awards"
                        title="World Recognition"
                        text="The exciting taste play and delicate extraction of our Phuket cacao earned the prestigious Silver Medal at the International Chocolate Awards World Final 2023."
                        reverse
                        animate={animate}
                    >
                        <Reveal className="award-card paper" rest={1} direction={1} delay={0.12} animate={animate}>
                            <div className="award-ribbon">
                                <span>★</span>
                                <div />
                            </div>
                            <h4 className="eyebrow">Silver medal</h4>
                            <h3>World Final</h3>
                            <p>London, 2023</p>
                            <hr />
                            <blockquote>“Honored by the International Chocolate Awards for exceptional taste and purity.”</blockquote>
                        </Reveal>
                    </TimelineItem>
                </section>

                <motion.section
                    className="about__cta"
                    initial={animate ? { opacity: 0, y: 28 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <h2 className="block-title">Experience the award-winning craft.</h2>
                    <SmartLink href="/collection" className="btn-hand btn-hand--outline">
                        Go to the collection →
                    </SmartLink>
                </motion.section>
            </div>
        </div>
    )
}

/** Появление при прокрутке: карточка «влетает» под углом и ложится на место (один раз). */
function Reveal({
    className,
    children,
    rest = 0,
    direction = 1,
    tilt = 1,
    hoverFlatten = false,
    delay = 0,
    y = 32,
    animate,
}: {
    className?: string
    children?: ReactNode
    rest?: number
    direction?: 1 | -1
    tilt?: number
    hoverFlatten?: boolean
    delay?: number
    y?: number
    animate: boolean
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: animate ? 0 : 1, rotate: animate ? rest + direction * ENTRY_TILT * tilt : rest, y: animate ? y : 0 }}
            whileInView={{ opacity: 1, rotate: rest, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
            whileHover={hoverFlatten ? { rotate: 0, transition: { duration: 0.4, ease: EASE } } : undefined}
        >
            {children}
        </motion.div>
    )
}

function TimelineItem({
    number,
    title,
    text,
    reverse = false,
    animate,
    children,
}: {
    number: string
    title: string
    text: string
    reverse?: boolean
    animate: boolean
    children: ReactNode
}) {
    return (
        <article className={`timeline__item${reverse ? " timeline__item--reverse" : ""}`}>
            <Reveal className="timeline__copy" direction={reverse ? -1 : 1} tilt={0.3} y={22} animate={animate}>
                <div className="timeline__card paper">
                    <span className="eyebrow">{number}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </Reveal>
            <div className="timeline__visual">{children}</div>
        </article>
    )
}
