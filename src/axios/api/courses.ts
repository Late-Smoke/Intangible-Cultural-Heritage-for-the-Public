import { array2query } from "@/utils";
import apiClient from "../axios";
import { Response } from "./common";

export interface UserCourseInfo {
    name?: string
    description?: string
    topImageUrl?: string
}

export interface CourseUser extends UserCourseInfo {
    nickName: string
    avatarUrl: string
    courses: Course[]
}

export interface BaseCourse {
    title: string
    type: '图文' | '视频'
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

export function getSelfCourse(id): Promise<Course | null> {
    return getSelfCourses().then(r => r.data.data?.find(c => c.id == id))
}

export function getUser(userId) {
    return apiClient.get<Response<CourseUser>>(`/courses/${userId}`)
}

export function getUserCourse(userId, courseId): Promise<Course | null> {
    return getUser(userId).then(r => r.data.data?.courses?.find(c => c.id == courseId))
}

export function updateUser(user: UserCourseInfo) {
    return apiClient.post<Response<any>>(`/userCourse`, user)
}

export function publishCourse(course: BaseCourse) {
    return apiClient.post<Response<any>>('/courses', course)
}

export function updateCourse(course: CourseUpdateDTO) {
    return apiClient.post<Response<any>>('/courses/new', course)
}

export function unlockCourses(courseIds: number[] | string[]) {
    return apiClient.put<Response<number[]>>(`/coursePartEvent?${array2query({ courseIds })}`)
}

export function payCourses(invoiceIds: number[] | string[]) {
    return apiClient.put<Response<string>>(`/coursePartEvent/charge?${array2query({ eventIds: invoiceIds })}`)
}

export function updateCourseProgress(id, process: string) {
    return apiClient.put('/courses/process', { id, process })
}
