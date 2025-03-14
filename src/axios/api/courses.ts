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

export interface BaseCourse {
    title: string
    type: string
    videoUrl: string | null
    introduction: string | null
    classContent: string | null
    price: number
}

export interface Course extends BaseCourse {
    id: number
    userId: number
    nickName: string | null
    avatarUrl: string | null

    title: string
    type: string
    videoUrl: string | null
    introduction: string | null
    classContent: string | null
    price: number

    process?: string
    unlockNumber: number
    unLock?: boolean
    createdTime: string

    selected?: boolean
}

export interface CourseUpdateDTO extends BaseCourse {
    id: number
}

export function getSelfCourses() {
    return apiClient.get<Response<Course[]>>('/personal/courses')
}

export function getUser(userId) {
    return apiClient.get<Response<User>>(`/courses/${userId}`)
}

export function publishCourse(course: BaseCourse) {
    return apiClient.post<Response<any>>('/courses', course)
}

export function updateCourse(course: CourseUpdateDTO) {
    return apiClient.put<Response<any>>('/courses/new', course)
}

export function unlockCourses(courseIds: number[] | string[]) {
    return apiClient.put('/coursePartEvent', null, { params: { courseIds } })
}

export function payCourses(eventIds: number[] | string[]) {
    return apiClient.put('/coursePartEvent', null, { params: { eventIds } })
}
