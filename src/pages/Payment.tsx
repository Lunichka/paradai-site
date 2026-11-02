import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import { useCart } from "../context/CartContext"
import { SHIPPING_PRICE, formatPrice } from "../data/shop"
import "./Payment.css"

type PaymentMethod = "card" | "promptpay" | "applepay"

const METHODS: { value: PaymentMethod; label: string }[] = [
    { value: "card", label: "Credit Card" },
    { value: "promptpay", label: "Thai QR / PromptPay" },
    { value: "applepay", label: "Apple Pay" },
]

export default function Payment() {
    const { items, subtotal, clear } = useCart()
    const navigate = useNavigate()
    const [method, setMethod] = useState<PaymentMethod>("card")
    const [placedTotal, setPlacedTotal] = useState<number | null>(null)

    const total = subtotal + SHIPPING_PRICE
    // Номер и дата чека создаются один раз при открытии страницы
    const receiptMeta = useMemo(() => {
        const now = new Date()
        const pad = (n: number) => String(n).padStart(2, "0")
        return {
            date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
            number: `#PARADAI-${Math.floor(10000 + Math.random() * 90000)}-TH`,
        }
    }, [])

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPlacedTotal(total)
    }

    // Корзина очищается, когда окно «Order completed» закрыли — чек под ним остаётся на месте
    const finish = () => {
        clear()
        setPlacedTotal(null)
        navigate("/collection")
    }

    if (items.length === 0 && placedTotal === null) {
        return (
            <div className="page">
                <div className="page__inner page__inner--narrow pay-empty">
                    <span className="eyebrow">Secure checkout</span>
                    <h1 className="page-title">your cart is empty</h1>
                    <p className="page-lead">Add a bar, some bonbons or cacao powder first, and the receipt will appear here.</p>
                    <Link to="/collection" className="btn-hand">
                        Go to the collection →
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="page">
            <div className="page__inner">
                <header className="pay__title">
                    <span className="eyebrow">Secure checkout</span>
                    <h1 className="page-title">payment &amp; delivery</h1>
                </header>

                <div className="pay__layout">
                    <form className="pay__form" onSubmit={submit}>
                        <section className="pay__section">
                            <h2>1. Delivery info</h2>
                            <div className="pay__fields">
                                <Field label="Your name" type="text" placeholder="Warit Thanomkiat" autoComplete="name" />
                                <div className="pay__two">
                                    <Field label="Phone" type="tel" placeholder="+66 2981 6413" autoComplete="tel" />
                                    <Field label="Email" type="email" placeholder="hello@paradaichocolate.com" autoComplete="email" />
                                </div>
                                <Field label="Shipping address" type="text" placeholder="Soi Rommanee, Taling Chan, Phuket 83000" autoComplete="street-address" />
                            </div>
                        </section>

                        <section className="pay__section">
                            <h2>2. Payment method</h2>
                            <div className="pay__methods" role="radiogroup" aria-label="Payment method">
                                {METHODS.map((m) => {
                                    const active = method === m.value
                                    return (
                                        <button
                                            key={m.value}
                                            type="button"
                                            role="radio"
                                            aria-checked={active}
                                            className={`pay-method${active ? " active" : ""}`}
                                            onClick={() => setMethod(m.value)}
                                        >
                                            <span className="pay-method__dot" aria-hidden />
                                            <strong>{m.label}</strong>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        <div>
                            <button className="btn-hand pay__submit" type="submit">
                                Complete order · {formatPrice(total)} →
                            </button>
                            <p className="pay__demo">Demo checkout: no payment is taken and nothing is sent.</p>
                        </div>
                    </form>

                    <aside className="receipt-wrap" aria-label="Order summary">
                        <div className="receipt-holder">
                            <div className="tape receipt-tape" />
                            <div className="receipt">
                                <div className="receipt__header">
                                    <h2>P A R A D A I</h2>
                                    <p>BANGKOK / PHUKET • THAILAND</p>
                                    <small>DATE: {receiptMeta.date}</small>
                                </div>

                                <div className="receipt__divider" />

                                <div className="receipt__items">
                                    {items.map((item) => (
                                        <div className="receipt__item" key={item.id}>
                                            <div>
                                                <p>{item.name}</p>
                                                <small>
                                                    {item.qty} × {formatPrice(item.price)}
                                                </small>
                                            </div>
                                            <strong>{formatPrice(item.qty * item.price)}</strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="receipt__divider" />

                                <div className="receipt__totals">
                                    <div>
                                        <span>SUBTOTAL</span>
                                        <strong>{formatPrice(subtotal)}</strong>
                                    </div>
                                    <div>
                                        <span>SHIPPING</span>
                                        <strong>{formatPrice(SHIPPING_PRICE)}</strong>
                                    </div>
                                    <div className="receipt__line" />
                                    <div className="receipt__total">
                                        <span>TOTAL</span>
                                        <strong>{formatPrice(total)}</strong>
                                    </div>
                                </div>

                                <div className="receipt__barcode">
                                    <div className="barcode" />
                                    <span>{receiptMeta.number}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {placedTotal !== null && (
                <Modal
                    title="Order completed!"
                    onClose={finish}
                    actions={
                        <button type="button" className="btn-hand btn-hand--block" onClick={finish}>
                            Return to the store
                        </button>
                    }
                >
                    Your order for {formatPrice(placedTotal)} has been successfully processed. Our craftsman is already carefully packaging the artisan chocolate.
                </Modal>
            )}
        </div>
    )
}

function Field({ label, type, placeholder, autoComplete }: { label: string; type: string; placeholder: string; autoComplete?: string }) {
    return (
        <label className="field">
            <span>{label}</span>
            <input type={type} placeholder={placeholder} autoComplete={autoComplete} required />
        </label>
    )
}
