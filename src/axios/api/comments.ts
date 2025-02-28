import apiClient from "../axios";
import { Response } from "./common";

export interface Comment {
    children: Comment[];
    content: string;
    createdTime: string;
    id: number;
    avatarUrl: string;
    nickName: string;
    parentId: number;
    postId: number;
    rootCommentId: number;
    status: number;
    userId: number;
    likes: number,
    disLikes: number,
    userIsLike: boolean,
    userIsDisLike: boolean,
}

export interface CommentPost {
    postId: number
    parentId: number
    rootCommentId: number
    content: string
    status: number
}

export function getHotCommentsForPost(id) {
    return apiClient.get<Response<Comment[]>>(`/comments/hot/${id}`)
}

export function getLatestCommentsForPost(id) {
    return apiClient.get<Response<Comment[]>>(`/comments/time/${id}`)
}

export function addLike(id) {
    return apiClient.put(`/comments/like/${id}`)
}

export function removeLike(id) {
    return apiClient.delete(`/comments/unLike/${id}`)
}

export function addDislike(id) {
    return apiClient.put(`/comments/disLike/${id}`)
}

export function removeDislike(id) {
    return apiClient.delete(`/comments/undisLike/${id}`)
}

export function postComment(comment: CommentPost) {
    return apiClient.post<Response<any>>('/comments', comment)
}
