import apiClient from "../axios";
import { Response } from "./common";
import { ElMessage } from 'element-plus';

export interface BasePost {
    /**
     * 帖子类型, 要么是”帖子“，要么是”资讯“ 再无其他
     */
    category: '帖子' | '资讯';
    /**
     * 帖子标题
     */
    title: string;
    /**
     * 内容, 纯文字
     */
    content: string;
    /**
     * 标签
     */
    tag: string | null;
    /**
     * 图片视频集合
     */
    urls: Url[] | null;
}

export interface HotPost extends BasePost {
    /**
     * 头像url
     */
    avatarUrl: string;
    /**
     * 评论数
     */
    comments: number;
    /**
     * 当前用户是否点赞过的标识
     */
    currentUserLike: boolean;

    currentUserFavorite: boolean

    /**
     * 收藏量
     */
    favorite: number;
    /**
     * 帖子id
     */
    id: number;
    /**
     * 点赞量
     */
    likes: number;
    /**
     * 帖主昵称
     */
    nickName: string;
    /**
     * 性别, 0男1女
     */
    sex: number;
    /**
     * 贴主id
     */
    userId: number;
    /**
     * 帖主类型, 0普通用户1新闻媒体2非遗传承人3管理眼
     */
    userType: number;
    /**
     * 浏览量
     */
    views: number;
    [property: string]: any;
}

export interface Url {
    /**
     * 创建时间
     */
    createdTime?: string;
    /**
     * 帖子id
     */
    postId?: number;
    /**
     * 文件类型, 0为图片1为视频
     */
    type: 0 | 1;
    url: string;
}

export interface Post extends BasePost {
    /**
     * 发布者头像
     */
    avatarUrl: string;
    /**
     * 评论量
     */
    comments: number;
    /**
     * 是否点赞, 当前用户是否点过赞
     */
    currentUserLike: boolean;

    currentUserFavorite: boolean

    /**
     * 收藏量
     */
    favorite: number;
    /**
     * 帖子id
     */
    id: number;
    /**
     * 点赞量
     */
    likes: number;
    /**
     * 发布者昵称
     */
    nickName: string;
    /**
     * 性别, 0男1女
     */
    sex: number;
    /**
     * 发布者id
     */
    userId: number;
    /**
     * 用户类型, 0是普通用户1是媒体2是非遗继承人3是管理员
     */
    userType: number;
    /**
     * 浏览量
     */
    views: number;

    createdTime: string
    pinned: boolean

    /** 是否关注了用户 */
    beFan: boolean
}

export interface PostUpdateDTO extends BasePost {
    id: number
}

export function getHotPosts() {
    return apiClient.get<HotPost>('/postnews/hot')
}

export function getPostById(id) {
    return apiClient.get<Response<Post>>(`/postnews/${id}`)
}

export function addLike(id) {
    return apiClient.put<Response<any>>(`/postnews/like/${id}`)
}

export function removeLike(id) {
    return apiClient.delete<Response<any>>(`/postnews/unlike/${id}`)
}

export function addFav(id) {
    return apiClient.put<Response<any>>(`/postnews/favorite/${id}`)
}

export function removeFav(id) {
    return apiClient.delete<Response<any>>(`/postnews/unfavorite/${id}`)
}

export function pinPost(id) {
    const r = apiClient.get<Response<any>>(`/personal/postnews/pinned/${id}`)
    r.then(r => {
        try {
            ElMessage.success(r.data.success && r.data.data)
        } catch { }
    })
    return r
}

export function unpinPost(id) {
    const r = apiClient.delete<Response<any>>(`/personal/postnews/pinned/${id}`)
    r.then(r => {
        try {
            ElMessage.success(r.data.success && r.data.data)
        } catch { }
    })
    return r
}

export function postPost(post: BasePost) {
    return apiClient.post<Response<string>>('/postnews/one', post)
}

export function updatePost(post: PostUpdateDTO) {
    return apiClient.put<Response<string>>('/postnews/update', post)
}

export function deletePost(id) {
    return apiClient.delete<Response<string>>(`/postnews/${id}`)
}
