import apiClient from "../axios";
import { Response } from "./common";

export interface Comment {
    children: Comment[];
    content: string;
    createdTime: string;
    id: number;
    nickName: string;
    parentId: null;
    postId: number;
    rootCommentId: null;
    status: number;
    userId: number;
    [property: string]: any;
}

export function getHotCommentsForPost(id) {
    return apiClient.get<Response<Comment[]>>(`/comments/hot/${id}`)
}

export function getLatestCommentsForPost(id) {
    return apiClient.get<Response<Comment[]>>(`/comments/${id}`)
}
