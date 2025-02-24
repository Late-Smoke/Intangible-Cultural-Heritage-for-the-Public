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
        },
        {
          path: 'code',
          name: 'code',
          component: () => import('../components/login/code.vue'), 
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
          path: '',
          name: 'search',
          component: () => import('../components/search/search.vue'),
        }, 
        {
          path: 'result',
          name: 'result',
          component: () => import('../components/search/result.vue'),
          redirect: { name: 'comprehensive' }, 
          children: [
            {
              path: 'comprehensive',
              name:'comprehensive',
              component: () => import('../components/search/result/comprehensive.vue'),
            }, 
            {
              path:'activity',
              name:'activity',
              component: () => import('../components/search/result/activity.vue'),
            },
            {
              path:'info',
              name:'info',
              component: () => import('../components/slot/info.vue'), 
            },
            {
              path:'user',
              name:'user',
              component: () => import('../components/search/result/user.vue'), 
            }
          ]
        }
      ]
    },
    {
      path: '/searchView/pictureView',
      name:'pictureView',
      component: () => import('../views/search/pictureView.vue'), 
    },
    {
      path: '/searchView/result/activity/cityView',
      name:'activityView',
      component: () => import('../views/search/cityView.vue'),
    },
    {
      path: '/mainPageView',
      name:'mainPageView',
      component: () => import('../views/mainPage/mainPageView.vue'), 
      redirect: { name: 'homePage' },
      children: [
        {
          path: 'homePage',
          name:'homePage',
          component: () => import('../components/mainPage/homePage.vue'),
          redirect: { name: 'cultureMap' },
          children: [
            {
              path: 'cultureMap',
              name:'cultureMap',
              component: () => import('../components/mainPage/homePage/cultureMap.vue'), 
            },
            {
              path: 'advice',
              name:'advice',
              component: () => import('../components/mainPage/homePage/advice.vue'), 
            },
            {
              path: 'sort',
              name:'sort',
              component: () => import('../components/mainPage/homePage/sort.vue'), 
            }, 
          ] 
        },
        {
          path: 'activityPage',
          name:'activityPage',
          component: () => import('../components/mainPage/activityPage.vue'),
        },
        {
          path: 'myPage',
          name:'myPage',
          component: () => import('../components/mainPage/myPage.vue'), 
        }  
      ]
    }
  ],
})

export default router
