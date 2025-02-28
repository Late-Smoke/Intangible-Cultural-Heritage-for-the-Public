
/** 数字自动转换为 n万 */
export function humanizeNumber(x: number) {
    if (x >= 10000) {
        return `${(x / 10000).toFixed(1)}万`
    } else return `${x}`
}
