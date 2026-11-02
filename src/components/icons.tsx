/** Иконка корзины-сумки (вместо эмодзи 🧺, которое на каждой платформе выглядит по-своему) */
export function BagIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Z" />
            <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
        </svg>
    )
}
