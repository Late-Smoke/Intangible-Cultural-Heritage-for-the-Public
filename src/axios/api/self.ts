import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'
import * as User from './user'
import { createElementPlusSettingSwitch } from "@/settings";
import { computed, reactive } from "vue";
import { promiseSuccess } from "@/utils";


// self
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


// privacy
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
    get: () => apiClient.get<Response<IPrivacySettings>>('/personal/privacy'),
    toggleComment: () => apiClient.put<Response<any>>('/personal/privacy/comment'),
    toggleActivities: () => apiClient.put<Response<any>>('/personal/privacy/activity'),
    toggleFollowing: () => apiClient.put<Response<any>>('/personal/privacy/follow'),
    toggleFavorites: () => apiClient.put<Response<any>>('/personal/privacy/favorite'),
}

export const PrivacySettingsController = {
    load() {
        PrivacySettings.get().then(r => {
            for (const key in this.settings) {
                this.settings[key as keyof IPrivacySettings].value = r.data.data[key as keyof IPrivacySettings] as boolean
                this.settings[key as keyof IPrivacySettings].loading = false
            }
        })
    },
    settings: {
        commentSetting: createElementPlusSettingSwitch('公开评论', PrivacySettings.toggleComment),
        activitySetting: createElementPlusSettingSwitch('公开参与的活动', PrivacySettings.toggleActivities),
        followSetting: createElementPlusSettingSwitch('公开关注列表', PrivacySettings.toggleFollowing),
        favoriteSetting: createElementPlusSettingSwitch('公开收藏夹', PrivacySettings.toggleFavorites),
    } as Record<keyof IPrivacySettings, ReturnType<typeof createElementPlusSettingSwitch>>,
}


// follows
export interface FollowUser {
    id: number
    nickName: string
    avatarUrl: string
    tag: string | null
    signature: string
    userType: number
    /** 是否关注了用户 */
    beFan: boolean
}

export function getFollowing() {
    return apiClient.get<Response<FollowUser[]>>('/follows/mystars')
}

export function getFollowers() {
    return apiClient.get<Response<FollowUser[]>>('/follows/myfans')
}

export const FollowController = reactive({
    followingList: undefined as FollowUser[],
    followersList: undefined as FollowUser[],

    loadFollowing() {
        return promiseSuccess(getFollowing()).then(r => this.followingList = r.data.data)
    },
    loadFollowers() {
        return promiseSuccess(getFollowers()).then(r => this.followersList = r.data.data)
    },
    loadBoth() {
        return Promise.all([this.loadFollowing(), this.loadFollowers()])
    },

    isFollowing(id: number | string) {
        return computed(() => {
            if (!this.followingList) {
                this.loadFollowing()
                return false
            } else return Boolean(this.followingList.find(x => x.id == id))
        })
    },
    isFollower(id: number | string) {
        return computed(() => {
            if (!this.followersList) {
                this.loadFollowers()
                return false
            } else return Boolean(this.followersList.find(x => x.id == id))
        })
    },
})
