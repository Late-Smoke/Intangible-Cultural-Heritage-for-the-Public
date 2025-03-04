import apiClient from '../axios';

export function getFindPostApi() {// 发现-帖子
    return apiClient.get('/postnews/locationBased');
}

export function getFollowPostApi() {// 关注-帖子
    return apiClient.get('/postnews/following/feeds');
}