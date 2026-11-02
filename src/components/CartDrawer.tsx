import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatPrice } from "../data/shop"
import "./CartDrawer.css"

export default function CartDrawer() {
    const { items, subtotal, isOpen, closeCart, increase, decrease, remove } = useCart()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart()
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, closeCart])

    const checkout = () => {
        closeCart()
        navigate("/payment")
    }

    return (
        <>
            {isOpen && <button type="button" className="cart-overlay" onClick={closeCart} aria-label="Close cart" />}

            {/* inert: пока корзина закрыта, до неё нельзя дойти Tab-ом */}
            <aside className={`cart-panel${isOpen ? " open" : ""}`} aria-label="Cart" inert={!isOpen}>
                <div className="cart-header">
                    <h2>your cart</h2>
                    <button type="button" onClick={closeCart}>
                        close ✕
                    </button>
                </div>

                <div className="cart-items">
                    {items.length === 0 ? (
                        <p className="empty-cart">Your cart is empty. Add chocolate, bonbons or cacao powder to begin.</p>
                    ) : (
                        items.map((item) => (
                            <article className="cart-item" key={item.id}>
                                <div className="cart-item-text">
                                    <h3>{item.name}</h3>
                                    <p>{item.details}</p>
                                    <span>
                                        {item.qty} pcs. × {formatPrice(item.price)}
                                    </span>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="qty-controls">
                                        <button type="button" onClick={() => decrease(item.id)} aria-label={`Decrease ${item.name}`}>
                                            −
                                        </button>
                                        <strong>{item.qty}</strong>
                                        <button type="button" onClick={() => increase(item.id)} aria-label={`Increase ${item.name}`}>
                                            +
                                        </button>
                                    </div>
                                    <button type="button" className="remove-button" onClick={() => remove(item.id)}>
                                        remove
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <div className="cart-bottom">
                    <div className="cart-total">
                        <span>Total:</span>
                        <strong>{formatPrice(subtotal)}</strong>
                    </div>
                    <button type="button" className="btn-hand btn-hand--block" disabled={items.length === 0} onClick={checkout}>
                        checkout →
                    </button>
                </div>
            </aside>
        </>
    )
}
