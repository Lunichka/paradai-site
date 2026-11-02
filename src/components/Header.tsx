import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BagIcon } from "./icons";
import "./Header.css";

// Шапка собрана по компоненту ParadaiHeader из Framer: логотип-картинка, язык EN/TH,
// бургер и выпадающая панель с меню. Поверх добавлена корзина (её в Framer-шапке не было).
// Пункты меню и их тайские названия меняются в массиве LINKS.
type Lang = "EN" | "TH";

const LINKS = [
  { to: "/", label: "Home", labelTh: "หน้าแรก", end: true },
  { to: "/about", label: "About us", labelTh: "เกี่ยวกับเรา", end: false },
  { to: "/collection", label: "Collection", labelTh: "คอลเลกชัน", end: false },
  { to: "/contacts", label: "Contacts", labelTh: "ติดต่อ", end: false },
];

const LANG_KEY = "paradai-lang";

function readLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === "TH" ? "TH" : "EN";
  } catch {
    return "EN";
  }
}

type SwitchProps = {
  lang: Lang;
  onChange: (l: Lang) => void;
  className?: string;
};

/** Кнопка языка с выпадающим списком EN / TH. Работает по клику, поэтому годится и для телефона. */
function LanguageSwitch({ lang, onChange, className = "" }: SwitchProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className={`lang ${className}`} ref={ref}>
      <button
        type="button"
        className="lang__current"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {lang}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      <div
        className={`lang__list${open ? " is-open" : ""}`}
        role="listbox"
        aria-label="Language"
      >
        {(["EN", "TH"] as const).map((l) => (
          <button
            key={l}
            type="button"
            role="option"
            aria-selected={lang === l}
            className={lang === l ? "is-active" : ""}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              onChange(l);
              setOpen(false);
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(readLang);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* без сохранения тоже работает */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "TH" ? "th" : "en";
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Меню закрывается при переходе на другую страницу и по Esc
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const base = import.meta.env.BASE_URL;

  return (
    <>
      <header
        className={`site-header${scrolled || menuOpen ? " is-solid" : ""}`}
      >
        <div className="site-header__bar">
          <Link
            to="/"
            className="site-header__logo"
            aria-label="Paradai — home"
          >
            <img
              src={`${base}images/brand/logo.webp`}
              alt="PARADAI"
              width={1000}
              height={159}
            />
          </Link>

          <div className="site-header__actions">
            <button
              type="button"
              className="site-header__cart"
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
            >
              <BagIcon size={20} />
              <strong>{count}</strong>
            </button>

            <LanguageSwitch
              lang={lang}
              onChange={changeLang}
              className="lang--bar"
            />

            <button
              type="button"
              className={`burger${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav
          id="site-menu"
          className="menu-panel"
          aria-label="Main navigation"
          hidden={!menuOpen}
        >
          <LanguageSwitch
            lang={lang}
            onChange={changeLang}
            className="lang--panel"
          />

          <div className="menu-panel__links" lang={lang === "TH" ? "th" : "en"}>
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {lang === "TH" ? l.labelTh : l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      {/* Подложка снаружи шапки: у шапки есть backdrop-filter, из-за него fixed-элементы внутри не растягиваются на экран */}
      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
