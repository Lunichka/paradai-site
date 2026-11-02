import { Link } from "react-router-dom"
import "./NotFound.css"

export default function NotFound() {
    return (
        <div className="page notfound">
            <div className="page__inner page__inner--narrow notfound__inner">
                <div className="notfound__label">
                    <span className="eyebrow">Error</span>
                    <strong>404</strong>
                </div>

                <section className="notfound__card">
                    <div className="tape notfound__tape notfound__tape--left" />
                    <div className="tape notfound__tape notfound__tape--right" />

                    <div className="notfound__mark" aria-hidden>
                        <div className="bar">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>

                    <div className="notfound__copy">
                        <span className="eyebrow">Page not found</span>
                        <h1>this piece went missing</h1>
                        <p>The page you’re looking for may have melted, moved, or never made it into the box.</p>
                    </div>

                    <div className="notfound__actions">
                        <Link className="btn-hand" to="/">
                            Back home →
                        </Link>
                        <Link className="notfound__ghost" to="/collection">
                            Go to collection
                        </Link>
                    </div>
                </section>

                <div className="notfound__note">
                    <p>Paradai Chocolate • Bangkok / Phuket • Thailand</p>
                    <span>#MISSING-BONBON-404</span>
                </div>
            </div>
        </div>
    )
}
