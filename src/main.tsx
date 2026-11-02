import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// Шрифты подключены локально (никаких запросов к Google Fonts).
// Ровно три: Boldonse — заголовки, Inter — текст/интерфейс, Italiana — только логотип.
import "@fontsource/boldonse/400.css"
import "@fontsource/italiana/400.css"
import "@fontsource-variable/inter"

import "./styles/tokens.css"
import "./styles/global.css"
import "./App.css"

import App from "./App"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
