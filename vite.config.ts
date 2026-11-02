import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// У сайта теперь настоящие адреса (/collection, /product/…, /payment), поэтому base — абсолютный.
//  • локально и на своём домене: "/"
//  • GitHub Pages (https://<user>.github.io/<repo>/): workflow сам подставляет BASE_PATH=/<repo>/
export default defineConfig({
    base: process.env.BASE_PATH ?? "/",
    plugins: [react()],
})
