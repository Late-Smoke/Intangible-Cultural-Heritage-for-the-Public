import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'
import * as User from './user'
import { createElementPlusSettingSwitch } from "@/settings";

export interface Self extends User.User { }

export interface Comment extends User.Comment { }

export function getSelf() {
    return apiClient.get<Response<Self>>('/personal/me')
}

export function getPosts() {
    return apiClient.get<Response<Posts.Post[]>>('/personal/postnews')
}

export function getFavPosts() {
    return apiClient.get<Response<Posts.Post[]>>('/personal/favorite/postnews')
}

export function getComments() {
    return apiClient.get<Response<Comment[]>>('/personal/comments')
}

export function getJoinedActivities() {
    return apiClient.get<Response<Activity.Activity[]>>('/personal/participate/activity')
}

export function getStarredActivities() {
    return apiClient.get<Response<Activity.Activity[]>>('/personal/favorite/activity')
}


export interface IPrivacySettings {
    id: number
    userId: number
    followSetting: boolean
    commentSetting: boolean
    favoriteSetting: boolean
    activitySetting: boolean
    createdTime: string
}

export const PrivacySettings = {
    load() {
        apiClient.get<Response<IPrivacySettings>>('/personal/privacy').then(r => {
            for (const key in this.settings) {
                this.settings[key as keyof IPrivacySettings].value = r.data.data[key as keyof IPrivacySettings] as boolean
                this.settings[key as keyof IPrivacySettings].loading = false
            }
        })
    },
    settings: {
        commentSetting: createElementPlusSettingSwitch('公开评论', () => apiClient.put<Response<any>>('/personal/privacy/comment')),
        activitySetting: createElementPlusSettingSwitch('公开参与的活动', () => apiClient.put<Response<any>>('/personal/privacy/activity')),
        followSetting: createElementPlusSettingSwitch('公开关注列表', () => apiClient.put<Response<any>>('/personal/privacy/follow')),
        favoriteSetting: createElementPlusSettingSwitch('公开收藏夹', () => apiClient.put<Response<any>>('/personal/privacy/favorite')),
    } as Record<keyof IPrivacySettings, ReturnType<typeof createElementPlusSettingSwitch>>,
}
