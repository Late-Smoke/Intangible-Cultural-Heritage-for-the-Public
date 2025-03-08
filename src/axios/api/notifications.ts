import apiClient from "../axios";
import { Response } from "./common";

export interface Notifications {
    total_message: number
    likeMessageSize: number
    replyMessagesSize: number
    followMessagesSize: number
    systemMessagesSize: number
    likeMessage: Notification[]
    replyMessages: Notification[]
    followMessages: Notification[]
    systemMessages: Notification[]
}

export interface UserVo {
    id: number
    nickName: string
    avatarUrl: string
    tag: null | string
    signature: string
    userType: number
    /** 是否关注了用户 */
    beFan: boolean
}

export interface Notification {
    userVo: UserVo
    id: number
    acceptUserId: number
    sendUserId: number
    messageType: "like_comment" | "like_post" | "reply_comment" | "reply_post" | 'follow' | "system"
    title: string
    firstContent?: string
    secondContent?: string
    readStatus: boolean
    relatedId?: number
    relatedType?: 'comment' | 'post' | 'user'
    createdTime: string
}

export function getUnread() {
    return apiClient.get<Response<Notifications>>('/message')
}

export function getUnreadCount() {
    return apiClient.get<Response<number>>('/message/size')
}

export function markAsRead(id) {
    return apiClient.put<Response<any>>('/message', undefined, { params: { id } })
}

export function markAllAsRead() {
    return apiClient.get<Response<any>>('/message/all')
}
