import { Response } from "@/axios/api/common"
import router from "@/router"
import { AxiosResponse } from "axios"
import { ElMessage } from "element-plus"

/** 数字自动转换为 `n万` */
export function humanizeNumber(x: number) {
    if (x >= 10000) {
        return `${(x / 10000).toFixed(1)}万`
    } else return `${x}`
}

/** 解析 API 响应中不带 Z 的 ISO 时间字符串, `不可用于解析标准 ISO 时间戳` */
export function parseDate(dateString: string) {
    return new Date(dateString + 'Z')
}

/** 自动转换日期为 n分钟/n小时/n天前 (<3天) */
export function formatDate(date: string | Date) {
    const d = date instanceof Date ? date : parseDate(date)
    const diff = (new Date().getTime() - d.getTime()) / 1000

    if (diff < 60) return `${Math.floor(diff)}秒前`
    else if (diff < 60 * 60) return `${Math.floor(diff / 60)}分钟前`
    else if (diff < 60 * 60 * 24) return `${Math.floor(diff / 60 / 60)}小时前`
    else if (diff < 60 * 60 * 24 * 3) return `${Math.floor(diff / 60 / 60 / 24)}天前`
    else return d.toLocaleDateString()
}

export function html2txt(html: string) {
    const el = document.createElement('div')
    el.innerHTML = html
    return el.textContent
}

/** 两个时间转成文字表示的时间范围, 可自动转换字符串但 `不可用于解析带 Z 的标准 ISO 时间戳` */
export function timeRange2txt(from?: Date | string, to?: Date | string) {
    if (typeof from == 'string') from = parseDate(from)
    if (typeof to == 'string') to = parseDate(to)

    return `${from?.toLocaleString()} - ${to?.toLocaleString()}`
}

export function file2dataURL(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

export function splitStringBySpace(s: string | null) {
    return s ? [...s.split(' ')] : []
}

export function setClipboard(txt: string) {
    return new Promise((resolve, reject) => {
        try {
            resolve(navigator.clipboard.writeText(txt))
        } catch (e) {
            ElMessage.error('复制失败! 请检查浏览器剪贴板权限或是否已启用HTTPS')
            reject(e)
        }
    })
}

export function importProps<T, S extends T>(target: T, src: S): void {
    for (const key in target) {
        target[key] = src[key]
    }
}

export function arraySame(a: any[] | null, b: any[] | null, ordered = true): Boolean {
    if (!Array.isArray(a) || !Array.isArray(b)) return false

    if (ordered)
        return a.length == b.length && a.every((x, i) => x == b[i])
    else
        return a.length == b.length && a.filter(x => b.includes(x)).length == a.length
}


// quick navigation
export function gotoUser(id) {
    router.push({
        name: 'userHome',
        params: { id }
    })
}

export function gotoPost(postId) {
    router.push({
        name: 'post',
        params: { postId }
    })
}

export function gotoPostComment(postId, commentId) {
    router.push({
        name: 'post',
        params: { postId },
        query: { commentId }
    })
}

export function gotoPostEdit(id) {
    router.push({
        name: 'postEdit',
        params: { id }
    })
}

export function gotoActivity(id) {
    router.push({
        name: 'activityParticipate',
        params: { id }
    })
}

export function gotoActivityParticipateDetail(id) {
    router.push({
        name: 'activityParticipateDetail',
        params: { id }
    })
}


// API
export function promiseSuccess<T>(axiosPromise: Promise<AxiosResponse<Response<T>, any>>): Promise<AxiosResponse<Response<T>, any>> {
    return new Promise((resolve, reject) => {
        axiosPromise.then(r => {
            if (r.data.success) resolve(r)
            else reject(r)
        }).catch(e => reject(e))
    })
}

export function tryShowErrorMsg(r: AxiosResponse<Response<any>>) {
    if (r?.data?.errorMsg) {
        ElMessage.error(r.data.errorMsg)
    }
}

const debounceMap = new Map<() => Promise<any>, Promise<any>>()

export function debouncePromise<T>(loadFunction: () => Promise<T>): Promise<T> {
    if (debounceMap.has(loadFunction)) return debounceMap.get(loadFunction)
    const promise = loadFunction()
    promise.finally(() => debounceMap.delete(loadFunction))
    debounceMap.set(loadFunction, promise)
    return promise
}

export function array2query(params: Record<string, (string | number | boolean)[]>) {
    const queryStrings = []
    for (const [param, values] of Object.entries(params)) {
        for (const value of values) {
            queryStrings.push(`${encodeURIComponent(param)}=${encodeURIComponent(value)}`)
        }
    }
    return queryStrings.join('&')
}
