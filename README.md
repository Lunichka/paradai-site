# Paradai — сайт тайского крафтового шоколада

Пересборка сайта из Framer в обычный проект **Vite + React + TypeScript + Framer Motion**.
Всё лежит в репозитории, шрифты — локально, без Framer и без запросов к Google Fonts.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка типов + сборка в dist/
```

## Где что править

| Что менять | Где |
| --- | --- |
| Цвета, шрифты, отступы, «ручной» радиус | `src/styles/tokens.css` |
| Тексты, ссылки, пути к фото | `src/data/content.ts` |
| Секции | `src/components/` (Hero, Collection, Bento, Gallery, Why, CTA, Footer) |
| Порядок секций на странице | `src/App.tsx` |

Шрифтов ровно три (роли заданы в `tokens.css`):

- **Boldonse** — все заголовки страниц (`--font-display`)
- **Inter** — основной текст, подписи, кнопки, навигация (`--font-body`)
- **Italiana** — только логотип PARADAI (`--font-wordmark`)

## Картинки

Положите файлы в `public/images/` (см. `public/images/README.md`).
Пока файла нет, компонент показывает аккуратную заглушку с подписью, а не «сломанную» картинку.

## Репозиторий и публикация

```bash
git remote add origin git@github.com:<ваш-логин>/paradai-site.git
git push -u origin main
```

Публикация на GitHub Pages: **Settings → Pages → Source: GitHub Actions**.
Workflow `.github/workflows/deploy.yml` соберёт и выложит сайт при каждом push в `main`.

## Что ещё не перенесено

Здесь только то, что вы прислали: Hero, Collection, CTA, Bento, Why. Футер и галерея пересобраны заново.
Шапка, страницы товара, Our Story и Contacts в этот проект пока не входят.
