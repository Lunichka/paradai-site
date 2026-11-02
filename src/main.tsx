import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// Шрифты подключены локально (никаких запросов к Google Fonts).
// Ровно три: Boldonse — заголовки, Inter — текст/интерфейс, Italiana — только логотип.
import "@fontsource/boldonse/400.css"
import "@fontsource/italiana/400.css"
import "@fontsource-variable/inter"

import "./styles/tokens.css"
import "./styles/global.css"
import "./styles/pages.css"
import "./App.css"

import App from "./App"
import { CartProvider } from "./context/CartContext"

// BASE_URL = "/" локально или "/<repo>/" на GitHub Pages (см. vite.config.ts)
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
)
