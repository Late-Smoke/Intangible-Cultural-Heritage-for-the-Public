import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'
import * as Self from '@/axios/api/self'

export interface BaseUser {
    id: number
    avatarUrl: string;
    nickName: string;
    userType: number;
    tag: null | string;
}

export interface User extends BaseUser {
    /**
     * 头像url
     */
    avatarUrl: string;
    createdTime: string;
    fans: number;
    idols: number;
    likes: number;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 性别, 0男1女
     */
    sex: number;
    /**
     * 个性签名
     */
    signature: string;
    tag: null | string;
    /**
     * 用户类型, 0普通用户1媒体2非遗传承人3管理员
     */
    userType: number;

    id: number
}

export interface Comment {
    id: number;
    postId: number;
    replyContent: string;
    parentId: null | number;
    rootCommentId: null | number;
    userId: number;
    nickName: string;
    avatarUrl: string;
    content: string;
    status: number;
    likes: null;
    disLikes: null;
    createdTime: string;
    children: null;
}

export function getUser(id) {
    return apiClient.get<Response<User>>('/other/me', { params: { id } })
}

export function getPosts(id) {
    return apiClient.get<Response<Posts.Post[]>>('/other/postnews', { params: { id } })
}

export function getFavPosts(id) {
    return apiClient.get<Response<Posts.Post[]>>('/other/favorite/postnews', { params: { id } })
}

export function getComments(id) {
    return apiClient.get<Response<Comment[]>>('/other/comment', { params: { id } })
}

export function getJoinedActivities(id) {
    return apiClient.get<Response<Activity.Activity[]>>('/other/participate/activity', { params: { id } })
}

export function getStarredActivities(id) {
    return apiClient.get<Response<Activity.Activity[]>>('/other/favorite/activity', { params: { id } })
}


export interface FollowUser extends Self.FollowUser { }

export function getFollowing(id) {
    return apiClient.get<Response<FollowUser[]>>('/follows/otherstars', { params: { id } })
}

export function follow(userId) {
    return apiClient.put<Response<string>>(`/follows/follow/${userId}`)
}

export function unfollow(userId) {
    return apiClient.delete<Response<string>>(`/follows/unfollow/${userId}`)
}
