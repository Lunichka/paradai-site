import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import Product from "./pages/Product"
import Payment from "./pages/Payment"
import Contacts from "./pages/Contacts"
import NotFound from "./pages/NotFound"

// Адреса страниц. Новая страница = новый файл в src/pages/ + строка здесь.
export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="collection" element={<Shop />} />
                <Route path="product/:slug" element={<Product />} />
                <Route path="payment" element={<Payment />} />
                <Route path="about" element={<About />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
