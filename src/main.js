
import { createApp,h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 导入所有图标
import 'element-plus/dist/index.css';
import '@/assets/main.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import * as mdiIcons from '@mdi/js';

if (process.env.NODE_ENV === 'development') {
  window.__DEV__ = true;
} else {
  window.__DEV__ = false;
}
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale: zhCn});

// 全局注册element-plus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Create global components for all MDI icons
Object.entries(mdiIcons).forEach(([name, pathData]) => {
  app.component(name, {
    setup: () => () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em'
      }, [h('path', { d: pathData })])
  });
});


app.mount('#app')
