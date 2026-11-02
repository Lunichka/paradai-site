// GitHub Pages не умеет «любой адрес → index.html», зато отдаёт 404.html на неизвестные пути.
// Копия index.html в 404.html делает так, что прямой заход на /collection или /product/trang82
// (и обновление страницы) загружает приложение, а роутер сам показывает нужную страницу или 404.
import { copyFileSync } from "node:fs"

copyFileSync("dist/index.html", "dist/404.html")
console.log("dist/404.html created (SPA fallback for GitHub Pages)")
