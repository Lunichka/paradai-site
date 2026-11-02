import { useEffect, useState } from "react"
import type { CSSProperties } from "react"

type Props = {
    src?: string
    alt: string
    /** Подпись на плейсхолдере, пока файла нет */
    label?: string
    fit?: "contain" | "cover"
    style?: CSSProperties
    className?: string
}

/**
 * <img> с аккуратным плейсхолдером: если файла нет или он не загрузился,
 * вместо «сломанной картинки» показывается тёплая заглушка с подписью.
 * Так сайт выглядит цельно ещё до того, как все фото положены в public/images.
 */
export default function SafeImage({
    src,
    alt,
    label,
    fit = "cover",
    style,
    className,
}: Props) {
    const [failed, setFailed] = useState(false)

    useEffect(() => setFailed(false), [src])

    if (!src || failed) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={className}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 8,
                    background:
                        "linear-gradient(160deg, rgba(255,255,255,0.55), rgba(138,62,37,0.10))",
                    border: "1px dashed rgba(71,43,29,0.28)",
                    borderRadius: 8,
                    color: "rgba(71,43,29,0.6)",
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    ...style,
                }}
            >
                {label ?? alt}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            style={{
                width: "100%",
                height: "100%",
                objectFit: fit,
                display: "block",
                ...style,
            }}
        />
    )
}
