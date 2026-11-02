import { footerContent as f } from "../data/content"
import SmartLink from "./SmartLink"
import "./Footer.css"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__card">
                <div className="footer__top">
                    <div className="footer__col footer__intro">
                        <p className="footer__headline">
                            {f.headline[0]}
                            <br />
                            {f.headline[1]}
                        </p>
                        <span className="footer__copyright">{f.copyright}</span>
                    </div>

                    <nav className="footer__col" aria-label="Footer">
                        <p className="footer__heading">Explore</p>
                        <ul className="footer__list">
                            {f.nav.map((item) => (
                                <li key={item.href}>
                                    <SmartLink href={item.href}>{item.label}</SmartLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="footer__col">
                        <p className="footer__heading">Get in touch</p>
                        <ul className="footer__list">
                            <li>
                                <a href={`mailto:${f.email}`}>{f.email}</a>
                            </li>
                            <li>
                                <a href={f.phoneHref}>{f.phone}</a>
                            </li>
                        </ul>
                        <button
                            type="button"
                            className="footer__top-link"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            Back to top ↑
                        </button>
                    </div>
                </div>

                <div className="footer__wordmark" aria-hidden="true">
                    PARADAI
                </div>
            </div>
        </footer>
    )
}
