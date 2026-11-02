import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import CartDrawer from "./CartDrawer"
import ScrollManager from "./ScrollManager"
import { useScrollReveal } from "./useScrollReveal"

/** Каркас всех страниц: шапка, содержимое страницы, общий футер, корзина-панель. */
export default function Layout() {
    const { pathname } = useLocation()
    useScrollReveal()
    return (
        <>
            <ScrollManager />
            <Header />
            <main key={pathname} className="page-fade">
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
        </>
    )
}
