import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Header.css"

// Шапка-навигация. В присланном коде её не было — это простая версия под стиль сайта,
// чтобы страницы были связаны между собой. Ссылки меняются в массиве LINKS.
const LINKS = [
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "Our story" },
    { to: "/contacts", label: "Contacts" },
]

export default function Header() {
    const { count, openCart } = useCart()
    const { pathname } = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Меню закрывается при переходе на другую страницу
    useEffect(() => setMenuOpen(false), [pathname])

    return (
        <header className={`site-header${scrolled || menuOpen ? " is-solid" : ""}${menuOpen ? " is-open" : ""}`}>
            <div className="site-header__bar">
                <Link to="/" className="site-header__logo" aria-label="Paradai — home">
                    PARADAI
                </Link>

                <nav className="site-header__nav" aria-label="Main">
                    {LINKS.map((l) => (
                        <NavLink key={l.to} to={l.to} className="site-header__link">
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="site-header__actions">
                    <button type="button" className="site-header__cart" onClick={openCart} aria-label={`Open cart, ${count} items`}>
                        <span className="site-header__cart-label">Cart</span>
                        <strong>{count}</strong>
                    </button>
                    <button
                        type="button"
                        className="site-header__burger"
                        aria-expanded={menuOpen}
                        aria-controls="site-menu"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            <nav id="site-menu" className="site-header__menu" aria-label="Mobile" hidden={!menuOpen}>
                {LINKS.map((l) => (
                    <NavLink key={l.to} to={l.to}>
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}
