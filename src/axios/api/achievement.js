import apiClient from "../axios";

export function getAchievement(id) {
    return apiClient.get(`/userAchievements/${id}`);
}
