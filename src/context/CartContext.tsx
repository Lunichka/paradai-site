import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

// Одна корзина на весь сайт (раньше у каждой страницы была своя, и они не знали друг о друге).
// Хранится в localStorage, поэтому переживает переход между страницами и перезагрузку.

export type CartItem = {
    id: string
    name: string
    details: string
    price: number
    qty: number
}

export type CartInput = Omit<CartItem, "qty">

type CartContextValue = {
    items: CartItem[]
    count: number
    subtotal: number
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    add: (item: CartInput, qty?: number) => void
    remove: (id: string) => void
    increase: (id: string) => void
    decrease: (id: string) => void
    clear: () => void
}

const STORAGE_KEY = "paradai-cart-v1"

const CartContext = createContext<CartContextValue | null>(null)

function load(): CartItem[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(
            (i): i is CartItem =>
                !!i &&
                typeof i.id === "string" &&
                typeof i.name === "string" &&
                typeof i.price === "number" &&
                typeof i.qty === "number" &&
                i.qty > 0
        )
    } catch {
        return []
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(load)
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {
            /* приватный режим или заблокированное хранилище — корзина просто живёт до перезагрузки */
        }
    }, [items])

    const add = useCallback((item: CartInput, qty = 1) => {
        setItems((current) => {
            const existing = current.find((i) => i.id === item.id)
            if (existing) {
                return current.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
            }
            return [...current, { ...item, qty }]
        })
    }, [])

    const remove = useCallback((id: string) => setItems((c) => c.filter((i) => i.id !== id)), [])
    const increase = useCallback(
        (id: string) => setItems((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))),
        []
    )
    const decrease = useCallback(
        (id: string) =>
            setItems((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)),
        []
    )
    const clear = useCallback(() => setItems([]), [])
    const openCart = useCallback(() => setOpen(true), [])
    const closeCart = useCallback(() => setOpen(false), [])

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            count: items.reduce((sum, i) => sum + i.qty, 0),
            subtotal: items.reduce((sum, i) => sum + i.price * i.qty, 0),
            isOpen,
            openCart,
            closeCart,
            add,
            remove,
            increase,
            decrease,
            clear,
        }),
        [items, isOpen, openCart, closeCart, add, remove, increase, decrease, clear]
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>")
    return ctx
}
