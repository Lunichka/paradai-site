import { footerContent as f } from "../data/content"
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
                                    <a href={item.href}>{item.label}</a>
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
                        <a className="footer__top-link" href="#top">
                            Back to top ↑
                        </a>
                    </div>
                </div>

                <div className="footer__wordmark" aria-hidden="true">
                    PARADAI
                </div>
            </div>
        </footer>
    )
}
