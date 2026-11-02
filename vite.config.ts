import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// base "./" — сайт открывается и с корня домена, и из подпапки
// (например, https://<user>.github.io/paradai-site/).
export default defineConfig({
    base: "./",
    plugins: [react()],
})
