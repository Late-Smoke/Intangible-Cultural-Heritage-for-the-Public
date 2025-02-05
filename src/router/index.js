import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginView',
      component: () => import('../views/login/loginView.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../components/login/login.vue'),
        }, 
        {
          path: 'forget-password',
          name: 'forget-password',
          component: () => import('../components/login/forgetPassword.vue'),
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../components/Map.vue'),
    },
    {
      path: '/searchView',
      name:'searchView',
      component: () => import('../views/search/searchView.vue'),
      children: [
        {
          path: 'history',
          name: 'history',
          component: () => import('../components/login/login.vue'),
        }, 
        {
          path: 'result',
          name: 'result',
          component: () => import('../components/login/forgetPassword.vue'),
        }
      ]
    }
  ],
})

export default router
