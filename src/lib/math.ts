export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

/** Линейно переводит value из диапазона [inMin, inMax] в [outMin, outMax] (с зажимом по краям). */
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) {
    if (value <= inMin) return outMin
    if (value >= inMax) return outMax
    const progress = (value - inMin) / (inMax - inMin)
    return outMin + progress * (outMax - outMin)
}
