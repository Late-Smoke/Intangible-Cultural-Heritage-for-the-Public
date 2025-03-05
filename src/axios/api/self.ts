import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'
import * as User from './user'

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
    return apiClient.get<Response<Activity.Activity[]>>('/personal/activity/participate')
}

export function getStarredActivities() {
    return apiClient.get<Response<Activity.Activity[]>>('/personal/favorite/activity')
}
