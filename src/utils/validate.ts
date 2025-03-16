// 判断是否外部链接
export function isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path)
}