import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

type Props = {
    title: string
    children: ReactNode
    /** Кнопки внутри окна */
    actions: ReactNode
    onClose: () => void
}

/** Окно-подтверждение («Added to cart», «Order completed», «Message sent»): Esc и клик по фону закрывают. */
export default function Modal({ title, children, actions, onClose }: Props) {
    const card = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        window.addEventListener("keydown", onKey)
        // Фокус внутрь окна: клавиатурный пользователь не «теряется» на странице под ним
        card.current?.focus()
        return () => window.removeEventListener("keydown", onKey)
    }, [onClose])

    return (
        <div className="modal">
            <button type="button" className="modal__backdrop" onClick={onClose} aria-label="Close" tabIndex={-1} />
            <div className="modal__card" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={card}>
                <h2>{title}</h2>
                <div className="modal__text">{children}</div>
                <div className="modal__actions">{actions}</div>
            </div>
        </div>
    )
}
