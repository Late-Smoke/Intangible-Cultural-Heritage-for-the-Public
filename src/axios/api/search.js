import apiClient from '../axios';

////search
export function getHotCultureApi() {// 非遗热点
    return apiClient.get('/postnews/hot');
}
////result
//comprehensive
export function getBaiKeApi(input) {// 非遗百科
    return apiClient.get('/search/encyclopedias', { params: { keyword: input }});
}

export function getNewPostApi(input) {// 相关帖子-最新
    return apiClient.get('/search/posts/time', { params: { keyword: input }});
}

export function getHotPostApi(input) {// 相关帖子-热度
    return apiClient.get('/search/posts/hot', { params: { keyword: input }});
}