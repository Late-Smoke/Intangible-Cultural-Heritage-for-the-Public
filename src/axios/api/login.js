import apiClient from '../axios';

export function getCodeApi(phone) {// 获取验证码
    return apiClient.get('/users/auth/code/generate', { params: { phoneNumber: phone }});
}

export function codeLoginApi(phone,code) { //验证码登录
    return apiClient.put('/users/auth/code', null , { params: { phoneNumber:phone,code }});
}

export function passwordLoginApi(phone,password) { //密码登录
return apiClient.put('/users/auth/password', null , { params: { phoneNumber:phone,password }});
}

export function updatePasswordApi(phone,code,password) { //修改密码
    return apiClient.post('/users/auth/password/update', { phoneNumber: phone,code,password });
}