import router from "@/router"

/** 数字自动转换为 `n万` */
export function humanizeNumber(x: number) {
    if (x >= 10000) {
        return `${(x / 10000).toFixed(1)}万`
    } else return `${x}`
}

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
        name: 'postComment',
        params: { postId, commentId }
    })
}
