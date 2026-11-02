import "./CTA.css"

type Props = {
    text?: string
    href?: string
    variant?: "outline" | "filled"
    fullWidth?: boolean
    openInNewTab?: boolean
}

export default function CTA({
    text = "GO TO THE COLLECTION",
    href = "#collection",
    variant = "outline",
    fullWidth = false,
    openInNewTab = false,
}: Props) {
    return (
        <a
            className={`paradai-cta ${variant}${fullWidth ? " full" : ""}`}
            href={href}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noreferrer" : undefined}
        >
            <span>{text}</span>
            <span className="arrow" aria-hidden>
                →
            </span>
        </a>
    )
}
