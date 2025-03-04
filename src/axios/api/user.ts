import apiClient from "../axios";
import { Response } from "./common";

export function follow(userId) {
    return apiClient.put<Response<string>>(`/follows/follow/${userId}`)
}

export function unfollow(userId) {
    return apiClient.delete<Response<string>>(`/follows/unfollow/${userId}`)
}
