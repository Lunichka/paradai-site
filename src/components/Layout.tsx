import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import CartDrawer from "./CartDrawer"
import ScrollManager from "./ScrollManager"

/** Каркас всех страниц: шапка, содержимое страницы, общий футер, корзина-панель. */
export default function Layout() {
    return (
        <>
            <ScrollManager />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
        </>
    )
}
