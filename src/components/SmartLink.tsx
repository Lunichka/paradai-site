import type { AnchorHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string
    children?: ReactNode
}

/**
 * Единая ссылка для всего сайта:
 *  - "/collection", "/#story" — внутренний переход без перезагрузки страницы (react-router);
 *  - "#why", "mailto:…", "https://…" — обычный <a>.
 */
export default function SmartLink({ href, children, ...rest }: Props) {
    const internal = href.startsWith("/") && !href.startsWith("//")
    if (internal) {
        return (
            <Link to={href} {...rest}>
                {children}
            </Link>
        )
    }
    return (
        <a href={href} {...rest}>
            {children}
        </a>
    )
}
