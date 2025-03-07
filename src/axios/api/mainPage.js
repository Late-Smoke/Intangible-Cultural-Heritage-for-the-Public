import apiClient from '../axios';

export function getPictureApi() {// 发现-轮播图
    return apiClient.get('/postnews/pictures');
}

export function getFindPostApi() {// 发现-帖子
    return apiClient.get('/postnews/locationBased');
}

export function getFollowPostApi() {// 关注-帖子
    return apiClient.get('/postnews/following/feeds');
}

export function postHeritageApi(type,secondType) { //获取非遗分类
    return apiClient.post('/culturalHeritage', { type,secondType });
}