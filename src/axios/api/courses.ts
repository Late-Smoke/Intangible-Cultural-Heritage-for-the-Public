import apiClient from "../axios";
import { Response } from "./common";

export interface User {
    nickName: string
    avatarUrl: string
    name?: string
    description?: string
    topImageUrl?: string
    courses: Course[]
}

export interface Course {
    id: number
    userId: number
    nickName?: string
    avatarUrl?: string
    title: string
    type: string
    videoUrl?: string
    introduction?: string
    classContent?: string
    process?: string
    unlockNumber: number
    price: number
    unLock?: boolean
    createdTime: string

    selected?: boolean
}

export function getSelfCourses() {
    return apiClient.get<Response<Course[]>>('/personal/courses')
}

export function getUser(userId) {
    return apiClient.get<Response<User>>(`/courses/${userId}`)
}
