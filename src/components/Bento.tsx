import SafeImage from "./SafeImage"
import SmartLink from "./SmartLink"
import { bentoPhoto } from "../data/content"
import "./Bento.css"

export default function Bento() {
    return (
        <section id="story" className="bento">
            <div className="bento__inner">
                <h2 className="section-title bento__title">from Thailand with pride</h2>

                <div className="bento__grid">
                    {/* 1. Фото в стиле полароида */}
                    <figure className="bento__polaroid">
                        <div className="bento__tape" aria-hidden />
                        <div className="bento__photo">
                            <SafeImage
                                src={bentoPhoto}
                                alt="Woman with a woven basket reaching up into a cacao tree"
                                label="Farmers photo"
                            />
                        </div>
                        <figcaption className="bento__credit">Photo: PARADAI Facebook page</figcaption>
                    </figure>

                    <div className="bento__col">
                        {/* 2. Миссия — «газетная вырезка» */}
                        <div className="bento__paper">
                            <span className="bento__quote" aria-hidden>
                                “
                            </span>

                            <div>
                                <h3 className="bento__label">Our Mission</h3>
                                <p className="bento__mission">
                                    We work directly with local farmers in Phuket and
                                    other provinces across Thailand. Together, we nurture the crops to bring out
                                    the unique, floral character of authentic Thai cacao.
                                </p>
                            </div>

                            <div className="bento__sign">
                                <span>Paradai Sourcing Team</span>
                                <div className="bento__stamp">since 2016</div>
                            </div>
                        </div>

                        {/* 3. Две маленькие карточки */}
                        <div className="bento__mini-row">
                            <div className="bento__mini">
                                <h4 className="bento__mini-title">Shops</h4>
                                <p className="bento__mini-value">Bangkok &amp; Phuket</p>
                                <p className="bento__mini-sub">Thailand</p>
                            </div>
                            <div className="bento__mini">
                                <h4 className="bento__mini-title">Sourcing</h4>
                                <p className="bento__mini-value bento__mini-value--accent">
                                    100% Direct Trade
                                </p>
                                <p className="bento__mini-sub">No middlemen, fair pay</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bento__cta-row">
                    <SmartLink href="/about" className="hand-border-btn">
                        discover our journey →
                    </SmartLink>
                </div>
            </div>
        </section>
    )
}
