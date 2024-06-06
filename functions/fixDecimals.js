export default function fixDecimals(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100


}