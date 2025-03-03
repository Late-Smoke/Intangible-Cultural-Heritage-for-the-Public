import apiClient from '../axios';

////search
export function getHotCultureApi() {// 非遗热点
    return apiClient.get('/postnews/hot');
}
////result
//comprehensive
export function getBaiKeIdApi(input) {// 非遗百科id
    return apiClient.get('/search/encyclopedias', { params: { keyword: input }});
}

export function getBaiKeApi(id) {// 非遗百科
    return apiClient.get(`/encyclopedias/${id}`);
}

export function getNewPostApi(input) {// 相关帖子-最新
    return apiClient.get('/search/posts/time', { params: { keyword: input }});
}

export function getHotPostApi(input) {// 相关帖子-热度
    return apiClient.get('/search/posts/hot', { params: { keyword: input }});
}

//info
export function getInfoApi(input) {// 资讯
    return apiClient.get('/search/news/Time', { params: { keyword: input }});
}