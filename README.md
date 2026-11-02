# Paradai — сайт тайского крафтового шоколада

Пересборка сайта из Framer в обычный проект **Vite + React + TypeScript + Framer Motion + React Router**.
Всё лежит в репозитории, шрифты — локально, без Framer и без запросов к Google Fonts.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка типов + сборка в dist/
npm run preview  # посмотреть собранную версию
```

## Страницы

| Адрес | Файл | Что это |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | Главная: Hero → Collection → Bento → Gallery → Why → CTA |
| `/collection` | `src/pages/Shop.tsx` | Витрина: плитки, классика, остальное, конструктор набора бонбонов |
| `/product/:id` | `src/pages/Product.tsx` | Карточка товара (id берётся из `src/data/shop.ts`) |
| `/payment` | `src/pages/Payment.tsx` | Оплата и чек (собирается из корзины) |
| `/about` | `src/pages/About.tsx` | Our story |
| `/contacts` | `src/pages/Contacts.tsx` | Магазины, контакты, форма |
| любой другой | `src/pages/NotFound.tsx` | 404 |

Маршруты описаны в `src/App.tsx`. Общая обвязка (шапка, футер, корзина) — `src/components/Layout.tsx`.

## Где что править

| Что менять | Где |
| --- | --- |
| Цвета, шрифты, отступы, «ручной» радиус | `src/styles/tokens.css` |
| Общие стили внутренних страниц (кнопки, поля, карточки, окно) | `src/styles/pages.css` |
| Тексты главной, ссылки, пути к фото | `src/data/content.ts` |
| Товары, цены, бонбоны, размер набора, доставка | `src/data/shop.ts` |
| Меню в шапке и тайские названия пунктов | массив `LINKS` в `src/components/Header.tsx` |
| Логотип | `public/images/brand/logo.webp` (прозрачный фон, подменяйте файл) |
| Фраза с фото на главной | `statement` в `src/data/content.ts`, вёрстка в `components/Statement.tsx` |
| Какие блоки появляются при прокрутке | список `REVEAL` в `src/components/useScrollReveal.ts` |
| Пункты меню в футере | `footerContent.nav` в `src/data/content.ts` |
| Секции главной | `src/components/` (Hero, Collection, Bento, Gallery, Why, CTA, Footer) |

Шрифтов ровно три (роли заданы в `tokens.css`):

- **Boldonse** — все заголовки (`--font-display`)
- **Inter** — основной текст, подписи, кнопки, навигация (`--font-body`)
- **Italiana** — только логотип PARADAI (`--font-wordmark`)

## Корзина

Одна корзина на весь сайт: `src/context/CartContext.tsx`. Состав хранится в `localStorage`
(ключ `paradai-cart-v1`), поэтому не пропадает после перезагрузки. Любая страница получает её через `useCart()`:
`add`, `remove`, `increase`, `decrease`, `clear`, `count`, `subtotal`. Окно корзины — `CartDrawer.tsx`.
Оплата и отправка формы контактов пока **демонстрационные**: деньги не списываются, письма не уходят.

## Картинки

Все свои картинки лежат в `public/images/` в формате WebP (см. `public/images/README.md`):
вырезки для шапки в `hero/`, фото мастерской в `gallery/`, бонбоны в `bonbons/`.
Если файла нет или он не загрузился, компонент показывает аккуратную заглушку с подписью, а не «сломанную» картинку.

> **Что ещё нужно заменить.** Фото плиток в магазине и карточках товаров, портрет основателя на «О нас»
> и пара фото из Unsplash+ подтянуты по внешним ссылкам из старого Framer-проекта. Пока интернет есть, они
> показываются, но лежат не у вас: ссылки могут умереть, а у Unsplash+ есть водяной знак.
> Положите свои файлы в `public/images/products/` и поменяйте пути в `src/data/shop.ts` и `src/data/content.ts`.

## Адрес сайта и GitHub Pages

Если сайт открывается по адресу вида `https://<логин>.github.io/<репозиторий>/`, у него есть префикс.
Он задаётся переменной `BASE_PATH` при сборке — в `deploy.yml` она уже подставляется автоматически.
Локально (`npm run dev`) префикс не нужен.

- **Свой домен** — уберите блок `env: BASE_PATH` из `.github/workflows/deploy.yml`, тогда префикс будет `/`.
- **Прямые ссылки на внутренние страницы** (например, `/product/…`) на GitHub Pages работают благодаря
  `dist/404.html` — это копия `index.html`, её делает `scripts/postbuild.mjs` после сборки.

## Репозиторий и публикация

```bash
git remote add origin git@github.com:<ваш-логин>/paradai-site.git
git push -u origin main
```

Публикация на GitHub Pages: **Settings → Pages → Source: GitHub Actions**.
Workflow `.github/workflows/deploy.yml` соберёт и выложит сайт при каждом push в `main`.

## Что стоит знать

- **Шапка** собрана по компоненту `ParadaiHeader` из Framer (логотип, язык EN/TH, бургер, панель меню) плюс корзина.
  Язык TH пока переводит только пункты меню, как и в Framer; тайский шрифт Noto Sans Thai подключён только для них.
- **Фраза с фото** под шапкой главной — блок `InlineMediaText` из Framer. Его оригинальные картинки выгрузить не удалось,
  поэтому внутри фото мастерской из галереи.
- Подробные характеристики (вес, состав, хранение) заполнены только у **Trang 82%**. У остальных товаров
  блок характеристик не показывается; чтобы он появился, добавьте поле `info` в `src/data/shop.ts`.
- **Trang 82%** и **Nakhon 60%** есть только как страницы товаров и блок «worth a try», в витрине их нет.
