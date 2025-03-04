import apiClient from "../axios";
import { Response } from "./common";
import * as Posts from '@/axios/api/posts'
import * as Activity from '@/axios/api/activity'

export interface Self {
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
    
    id:number
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
