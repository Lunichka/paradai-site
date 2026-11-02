import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * При смене страницы:
 *  - есть #якорь (/collection#bonbons, /#workshop) — прокручиваем к элементу (ждём, пока страница отрисуется);
 *  - якоря нет — наверх (браузер сам этого не делает в SPA).
 */
export default function ScrollManager() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0)
            return
        }
        const id = decodeURIComponent(hash.slice(1))
        let tries = 0
        let timer = 0
        const go = () => {
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ block: "start" })
            } else if (tries++ < 20) {
                timer = window.setTimeout(go, 50)
            }
        }
        go()
        return () => window.clearTimeout(timer)
    }, [pathname, hash])

    return null
}
