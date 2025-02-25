import axios from 'axios'
import router from '@/router';
import { ElMessage } from 'element-plus';

//axios实例
const apiClient = axios.create({
    // baseURL: null,
    timeout: 10000, // 请求超时时间为10秒
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
    },
    baseURL: '/api'
});

apiClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    ElMessage.error(error)

    if (error?.response?.status == 401) {
        router.push({ name: 'login' })
    }
    return Promise.reject(error);
});

export default apiClient;