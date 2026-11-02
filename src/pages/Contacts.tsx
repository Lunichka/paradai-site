import { useState } from "react"
import type { FormEvent } from "react"
import Modal from "../components/Modal"
import { footerContent } from "../data/content"
import "./Contacts.css"

// Адреса магазинов (проверены по Google Maps). Перед запуском сайта стоит ещё раз убедиться,
// что точки не переехали.
const LOCATIONS = [
    {
        city: "Phuket Town",
        name: "Front Yard",
        address: "36 Yaowarat Road, Talat Yai, Mueang Phuket, Phuket 83000",
        hours: "Daily · 10:00–20:00",
        mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJQQKWWaMxUDAR8PE1GPV-LIM",
    },
    {
        city: "Bangkok",
        name: "Bangkok Art & Culture Centre",
        address: "939 Rama I Road, Wang Mai, Pathum Wan, Bangkok 10330",
        hours: "Tue–Sun · 10:00–20:00 (closed Mon)",
        mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJperRf76Z4jARlW5FOpGbx_w",
    },
]

export default function Contacts() {
    const [sent, setSent] = useState(false)

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.currentTarget.reset()
        setSent(true)
    }

    return (
        <div className="page">
            <div className="page__inner">
                <section className="contacts__hero">
                    <span className="eyebrow">Contacts</span>
                    <h1 className="page-title">visit, write, taste.</h1>
                    <p className="page-lead">For orders, collaborations, wholesale requests or a quiet chocolate question — reach us here.</p>
                </section>

                <section className="contacts__block">
                    <div className="contacts__heading">
                        <span className="eyebrow">Our stores</span>
                        <h2 className="block-title">two coastlines, one chocolate</h2>
                    </div>

                    <div className="locations">
                        {LOCATIONS.map((loc) => (
                            <article className="hand-card location" key={loc.city}>
                                <span className="eyebrow">{loc.city}</span>
                                <h3>{loc.name}</h3>
                                <p className="location__address">{loc.address}</p>
                                <p className="location__hours">{loc.hours}</p>
                                <a className="location__link" href={loc.mapsUrl} target="_blank" rel="noreferrer">
                                    Get directions →
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="contact-cards">
                    <ContactCard number="01" title="Visit" label="Bangkok / Phuket" text="Crafted in Thailand, inspired by local cacao and tropical landscapes." />
                    <ContactCard
                        number="02"
                        title="Write"
                        label={footerContent.email}
                        text="For online orders, product questions and collaboration requests."
                        href={`mailto:${footerContent.email}`}
                    />
                    <ContactCard
                        number="03"
                        title="Call"
                        label={footerContent.phone}
                        text="For urgent order questions and local pickup details."
                        href={footerContent.phoneHref}
                    />
                </section>

                <section className="contacts__content">
                    <form className="contact-form hand-card" onSubmit={submit}>
                        <div className="contacts__heading">
                            <span className="eyebrow">Send a note</span>
                            <h2 className="block-title">ask us anything</h2>
                            <p>Keep it short and sweet. We’ll get back to you with care.</p>
                        </div>

                        <div className="contact-form__fields">
                            <label className="field">
                                <span>Your name</span>
                                <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
                            </label>
                            <label className="field">
                                <span>Email</span>
                                <input type="email" name="email" placeholder="hello@email.com" autoComplete="email" required />
                            </label>
                            <label className="field">
                                <span>Message</span>
                                <textarea name="message" placeholder="Tell us what you need..." required />
                            </label>
                        </div>

                        <button type="submit" className="btn-hand btn-hand--block contact-form__submit">
                            Send a note →
                        </button>
                    </form>

                    <aside className="wholesale hand-card">
                        <div className="tape wholesale__tape" />
                        <span className="eyebrow">For wholesale</span>
                        <h2 className="block-title">cafés, hotels &amp; concept stores</h2>
                        <p>Interested in carrying Paradai chocolate? Write us with your location, product request and preferred quantity.</p>

                        <dl className="mini-receipt">
                            <div>
                                <dt>Wholesale</dt>
                                <dd>available</dd>
                            </div>
                            <div>
                                <dt>Events</dt>
                                <dd>on request</dd>
                            </div>
                            <div>
                                <dt>Gifts</dt>
                                <dd>custom boxes</dd>
                            </div>
                        </dl>
                    </aside>
                </section>
            </div>

            {sent && (
                <Modal
                    title="Message sent"
                    onClose={() => setSent(false)}
                    actions={
                        <button type="button" className="btn-hand btn-hand--block" onClick={() => setSent(false)}>
                            Continue
                        </button>
                    }
                >
                    Thank you! This is a demo form: the message has not been sent anywhere.
                </Modal>
            )}
        </div>
    )
}

function ContactCard({ number, title, label, text, href }: { number: string; title: string; label: string; text: string; href?: string }) {
    const content = (
        <>
            <span className="eyebrow">{number}</span>
            <h2>{title}</h2>
            <strong>{label}</strong>
            <p>{text}</p>
        </>
    )
    return href ? (
        <a className="hand-card contact-card contact-card--link" href={href}>
            {content}
        </a>
    ) : (
        <article className="hand-card contact-card">{content}</article>
    )
}
