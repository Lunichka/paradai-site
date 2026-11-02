import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

// Блоки внутренних страниц мягко появляются при прокрутке (сдвиг + прозрачность).
// Чтобы добавить анимацию новому блоку, впишите его CSS-селектор в REVEAL.
// Работает через атрибуты data-rv, а не классы: React их не трогает, и после показа
// мы их снимаем, так что собственные hover-эффекты карточек не страдают.
const REVEAL = [
    ".shop__head",
    ".shop-section__head",
    ".shop-card",
    ".builder",
    ".custom-box",
    ".contacts__hero",
    ".locations > *",
    ".contact-cards > *",
    ".contact-form",
    ".wholesale",
    ".breadcrumbs",
    ".pdp__gallery",
    ".pdp__details",
    ".related__head",
    ".related-card",
    ".pay__title",
    ".pay__section",
    ".receipt-holder",
].join(",")

export function useScrollReveal() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL))
        if (!items.length) return

        const timers: number[] = []
        const io = new IntersectionObserver(
            (entries) => {
                // карточки одной «волны» появляются по очереди
                const fresh = entries.filter((e) => e.isIntersecting)
                fresh.forEach((entry, i) => {
                    const el = entry.target as HTMLElement
                    io.unobserve(el)
                    el.style.setProperty("--rv-delay", `${Math.min(i, 6) * 70}ms`)
                    el.setAttribute("data-rv-in", "")
                    timers.push(
                        window.setTimeout(() => {
                            el.removeAttribute("data-rv")
                            el.removeAttribute("data-rv-in")
                            el.style.removeProperty("--rv-delay")
                        }, 1100 + i * 70),
                    )
                })
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
        )
        items.forEach((el) => {
            el.setAttribute("data-rv", "")
            io.observe(el)
        })
        return () => {
            io.disconnect()
            timers.forEach(clearTimeout)
            items.forEach((el) => {
                el.removeAttribute("data-rv")
                el.removeAttribute("data-rv-in")
            })
        }
    }, [pathname])
}
