import { useCallback, useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { useReducedMotion } from "framer-motion"
import SafeImage from "./SafeImage"
import { galleryPhotos } from "../data/content"
import "./Gallery.css"

// Лёгкие наклоны — как фото, разложенные на столе, а не ровная лента.
// Пропорции кадра берутся из galleryPhotos[i].orientation (content.ts).
const TILTS = [-1.2, 0.8, -0.6, 1, -0.4, 0.9, -0.8, 0.6, -1]
const RATIO = { portrait: "4 / 5", landscape: "4 / 3" } as const

export default function Gallery() {
    const scroller = useRef<HTMLDivElement>(null)
    const drag = useRef({ down: false, startX: 0, startLeft: 0 })
    const reduce = useReducedMotion()
    const [state, setState] = useState({ progress: 0, canPrev: false, canNext: true })

    const update = useCallback(() => {
        const el = scroller.current
        if (!el) return
        const max = Math.max(el.scrollWidth - el.clientWidth, 1)
        const progress = Math.min(Math.max(el.scrollLeft / max, 0), 1)
        setState({
            progress,
            canPrev: el.scrollLeft > 4,
            canNext: el.scrollLeft < max - 4,
        })
    }, [])

    useEffect(() => {
        const el = scroller.current
        if (!el) return
        let raf = 0
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(() => ((raf = 0), update()))
        }
        update()
        el.addEventListener("scroll", onScroll, { passive: true })
        const ro = new ResizeObserver(onScroll)
        ro.observe(el)
        return () => {
            el.removeEventListener("scroll", onScroll)
            ro.disconnect()
            if (raf) cancelAnimationFrame(raf)
        }
    }, [update])

    const step = (dir: 1 | -1) => {
        const el = scroller.current
        if (!el) return
        const first = el.querySelector<HTMLElement>(".gallery__item")
        const gap = parseFloat(getComputedStyle(el).columnGap) || 24
        const amount = (first?.offsetWidth ?? 320) + gap
        el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" })
    }

    // Перетаскивание мышью (тачскрин и так скроллится пальцем)
    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return
        const el = e.currentTarget
        drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft }
        el.classList.add("is-dragging")
        el.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current.down) return
        e.currentTarget.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
    }
    const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current.down) return
        drag.current.down = false
        e.currentTarget.classList.remove("is-dragging")
    }

    const total = galleryPhotos.length
    const current = Math.min(total, Math.max(1, Math.round(state.progress * (total - 1)) + 1))

    return (
        <section id="workshop" className="gallery" aria-labelledby="gallery-title">
            <div className="container gallery__head">
                <h2 id="gallery-title" className="section-title">
                    inside the workshop
                </h2>

                <div className="gallery__controls">
                    <span className="gallery__count" aria-hidden>
                        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <button
                        type="button"
                        className="gallery__btn"
                        onClick={() => step(-1)}
                        disabled={!state.canPrev}
                        aria-label="Previous photo"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        className="gallery__btn"
                        onClick={() => step(1)}
                        disabled={!state.canNext}
                        aria-label="Next photo"
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scroller}
                className="gallery__scroller"
                role="region"
                aria-label="Workshop photos"
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onDragStart={(e) => e.preventDefault()}
            >
                {galleryPhotos.map((photo, i) => (
                    <figure
                        key={photo.src}
                        className={`gallery__item${photo.orientation === "portrait" ? " gallery__item--portrait" : ""}`}
                        style={{ ["--tilt" as string]: `${TILTS[i % TILTS.length]}deg` }}
                    >
                        <div className="gallery__photo" style={{ aspectRatio: RATIO[photo.orientation] }}>
                            <SafeImage
                                src={photo.src}
                                alt={photo.alt}
                                label={photo.caption}
                                style={{ objectPosition: photo.focus ?? "50% 50%" }}
                            />
                        </div>
                        <figcaption className="gallery__caption">
                            <span>{String(i + 1).padStart(2, "0")}</span>
                            {photo.caption}
                        </figcaption>
                    </figure>
                ))}
            </div>

            <div className="container" aria-hidden>
                <div className="gallery__track">
                    <div className="gallery__thumb" style={{ width: `${(1 / total) * 100}%`, left: `${state.progress * (1 - 1 / total) * 100}%` }} />
                </div>
            </div>
        </section>
    )
}
