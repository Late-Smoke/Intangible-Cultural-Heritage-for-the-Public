import { reactive } from "vue"

export enum historyType { post, activity }

export interface HistoryAddItem {
    type: historyType
    title: string
    subtitle?: string
    image: string | null
    username?: string
    userAvatar?: string
    tags: string | null
    price?: number
}

export interface HistoryItem extends HistoryAddItem {
    time: Date
    url: string
    selected?: boolean
}

const historyStorageKey = 'browse_history'

export const HistoryController = reactive({
    history: [] as HistoryItem[],
    add(itemAdd: HistoryAddItem) {
        const item: HistoryItem = {
            ...itemAdd,
            time: new Date(),
            url: location.pathname + location.search + location.hash
        }
        const now = new Date().getTime()
        this.history = this.history.filter(x => !(now - x.time?.getTime() < 10 * 60 * 1000 && x.url == item.url))
        this.history.push(item)
        this.save()
    },
    removeSelected() {
        this.history = this.history.filter(x => !x.selected)
        this.save()
    },
    save() {
        this.normalize()
        localStorage.setItem(historyStorageKey, JSON.stringify(this.history))
    },
    load() {
        this.history = JSON.parse(localStorage.getItem(historyStorageKey)) || []
        this.normalize()
    },
    normalize() {
        this.history = this.history
            .filter(x => x != null && typeof x == 'object' && x.type != undefined)
            .map(x => {
                x.selected = undefined
                x.time = new Date(x.time)
                return x
            })
    }
})

HistoryController.load()
