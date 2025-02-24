import apiClient from "../axios";
import { Response } from "./comon";

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
    tag: null;
    /**
     * 用户类型, 0普通用户1媒体2非遗传承人3管理员
     */
    userType: number;
    [property: string]: any;
}

export function getSelf() {
    return apiClient.get<Response<Self>>('/personal/me')
}
