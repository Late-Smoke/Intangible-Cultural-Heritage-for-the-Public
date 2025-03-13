import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'
import * as User from './user'
import { reactive, ref } from "vue";
import { debouncePromise, promiseSuccess } from "@/utils";
import { AxiosResponse } from "axios";


// self
export interface Self extends User.User { }

export interface Comment extends User.Comment { }

export interface ProfileUpdateDTO {
    nickName?: string
    avatarUrl?: string
    signature?: string
    sex?: number
}

const id = ref<number>()
const getSelfFunction = () => {
    const promise = apiClient.get<Response<Self>>('/personal/me')
    promiseSuccess(promise).then(r => id.value = r.data.data.id)
    return promise
}

export function getId(): number | undefined {
    if (!id.value) debouncePromise(getSelfFunction)
    return id.value
}

export function getSelf() {
    return debouncePromise(getSelfFunction)
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

export function updateProfile(data: ProfileUpdateDTO) {
    return apiClient.put('/update/userMessage', data)
}

export function updatePassword(phoneNumber: string | number, code: string | number, password: string) {
    return apiClient.put<Response<any>>('/users/auth/password/update', {
        phoneNumber: typeof phoneNumber == 'string' ? parseInt(phoneNumber) : phoneNumber,
        code: typeof code == 'string' ? parseInt(code) : code,
        password
    })
}


// privacy
export interface IPrivacySettings {
    // id: number
    // userId: number
    followSetting?: boolean
    commentSetting?: boolean
    favoriteSetting?: boolean
    activitySetting?: boolean
    // createdTime: string
}

export const PrivacySettings = {
    get: () => apiClient.get<Response<IPrivacySettings>>('/personal/privacy'),
    toggleComment: () => apiClient.put<Response<any>>('/personal/privacy/comment'),
    toggleActivities: () => apiClient.put<Response<any>>('/personal/privacy/activity'),
    toggleFollowing: () => apiClient.put<Response<any>>('/personal/privacy/follow'),
    toggleFavorites: () => apiClient.put<Response<any>>('/personal/privacy/favorite'),
}


// follows
export interface FollowUser extends User.BaseUser {
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

export interface IFollowController {
    users?: FollowUser[],
    userResponse?: Response<FollowUser[]>,
    load: () => Promise<any>
    includes: (id: number | string) => boolean
}

function createFollowController(getMethod: () => Promise<AxiosResponse<Response<FollowUser[]>, any>>): IFollowController {
    const loadFunction = () => promiseSuccess(getMethod())
    return {
        load() {
            return debouncePromise(loadFunction).then(r => {
                this.users = Array.isArray(r.data.data) ? r.data.data : []
                this.userResponse = r.data
            })
        },
        includes(id) {
            if (!this.users) {
                this.load()
                return false
            } else return Boolean(this.users.find(x => x.id == id))
        }
    }
}

export const FollowController = reactive({
    following: createFollowController(getFollowing),
    followers: createFollowController(getFollowers),

    loadBoth() {
        return Promise.all([this.following.load(), this.followers.load()])
    },
})
