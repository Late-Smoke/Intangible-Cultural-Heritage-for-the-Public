import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 导入所有图标
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import apiClient from './axios/axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{locale: zhCn});

// 全局注册element-plus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}


// 读取token
let token = localStorage.getItem('token')
if (token) apiClient.defaults.headers.common['Authorization'] = token


app.mount('#app')
