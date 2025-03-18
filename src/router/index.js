import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // home
    {
      path: '/',
      name: 'root',
      component: () => import('../views/mainPage/mainPageView.vue'),
      redirect: { name: 'cultureMap' },
      children: [
        // activity
        {
          path: 'activity',
          name: 'activityHome',
          component: () => import('@/views/activity/home.vue'),
        },
        // self
        {
          path: 'self',
          name: 'self',
          component: () => import('@/views/user/home.vue'),
        },
      ]
    },

    // follow list
    {
      path: '/self/following',
      name: 'selfFollowing',
      component: () => import('@/views/user/UserList.vue'),
      props: {
        listType: '我的关注'
      }
    },
    {
      path: '/self/followers',
      name: 'selfFollowers',
      component: () => import('@/views/user/UserList.vue'),
      props: {
        listType: '我的粉丝'
      }
    },

    // login
    {
      path: '/login',
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
      path: '/gaode',
      name: 'gaode',
      component: () => import('../components/slot/gaode.vue'),
    },
    {
      path: '/baiduMap',
      name: 'baiduMap',
      component: () => import('../components/slot/baiduMap.vue'),
    },

    // search
    {
      path: '/searchView',
      name: 'searchView',
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
        }
      ]
    },
    {
      path: '/searchView/pictureView',
      name: 'pictureView',
      component: () => import('../views/search/pictureView.vue'),
    },
    {
      path: '/searchView/result/activity/cityView',
      name: 'activityView',
      component: () => import('../views/search/cityView.vue'),
    },

    // culture map
    {
      path: '/mainPageView',
      name: 'mainPageView',
      component: () => import('../views/mainPage/mainPageView.vue'),
      redirect: { name: 'homePage' },
      children: [
        {
          path: 'homePage',
          name: 'homePage',
          component: () => import('../components/mainPage/homePage.vue'),
          redirect: { name: 'cultureMap' },
          children: [
            {
              path: 'cultureMap',
              name: 'cultureMap',
              component: () => import('../components/mainPage/homePage/cultureMap.vue'),
            },
            {
              path: 'advice',
              name: 'advice',
              component: () => import('../components/mainPage/homePage/advice.vue'),
            },
            {
              path: 'sort',
              name: 'sort',
              component: () => import('../components/mainPage/homePage/sort.vue'),
            },
          ]
        },
      ]
    },

    // test
    {
      path: '/test1',
      name: 'test1',
      component: () => import('@/views/test/test.vue'),
    },

    // post
    {
      path: '/post/:postId(\\d+)',
      name: 'post',
      component: () => import('@/views/posts/post.vue'),
      props: route => ({
        postId: route.params.postId,
        commentId: route.query.commentId
      })
    },

    // activity
    {
      path: '/activity',
      name: 'activityRoot',
      component: () => import('@/views/activity/home.vue'),
    },
    {
      path: '/activity/:id(\\d+)',
      name: 'activityDetail',
      component: () => import('@/views/activity/detail.vue'),
    },
    {
      path: '/activity/:id(\\d+)/participate',
      name: 'activityParticipate',
      component: () => import('@/views/activity/participate.vue'),
    },

    // user
    {
      path: '/user/:id(\\d+)',
      name: 'userHome',
      component: () => import('@/views/user/home.vue'),
      props: route => ({
        userId: route.params.id
      })
    },
    {
      path: '/user/:id(\\d+)/following',
      name: 'userFollowing',
      component: () => import('@/views/user/UserList.vue'),
      props: route => ({
        userId: route.params.id
      })
    },

    // notifications
    {
      path: '/notifications',
      name: 'notificationsHome',
      component: () => import('@/views/notifications/home.vue'),
    },
    {
      path: '/notifications/replies',
      name: 'notificationsReplies',
      component: () => import('@/views/notifications/details.vue'),
    },
    {
      path: '/notifications/follows',
      name: 'notificationsFollows',
      component: () => import('@/views/notifications/details.vue'),
    },
    {
      path: '/notifications/likes',
      name: 'notificationsLikes',
      component: () => import('@/views/notifications/details.vue'),
    },
    {
      path: '/notifications/settings',
      name: 'notificationsSettings',
      component: () => import('@/views/notifications/settings.vue'),
    },

    // settings
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/home.vue'),
    },
    {
      path: '/settings/account',
      name: 'accountSettings',
      component: () => import('@/views/settings/account.vue'),
    },
    {
      path: '/settings/privacy',
      name: 'privacySettings',
      component: () => import('@/views/settings/privacy.vue'),
    },

    // history
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/history/history.vue'),
    },

    // courses
    {
      path: '/course/mine',
      name: 'myCourses',
      component: () => import('@/views/courses/mine.vue'),
    },
    {
      path: '/user/:id(\\d+)/courses',
      name: 'userCourses',
      props: route => ({
        userId: route.params.id,
        unlock: route.query.unlock,
      }),
      component: () => import('@/views/courses/user.vue'),
    },
    {
      path: '/user/:userId(\\d+)/courses/edit/:courseId(\\d+)',
      name: 'courseEdit',
      props: route => ({
        userId: route.params.userId,
        courseId: route.params.courseId,
      }),
      component: () => import('@/views/courses/edit.vue'),
    },
    {
      path: '/course/add',
      name: 'courseAdd',
      component: () => import('@/views/courses/edit.vue'),
    },
    {
      path: '/course/:id(\\d+)',
      name: 'course',
      props: route => ({
        courseId: route.params.id,
      }),
      component: () => import('@/views/courses/course.vue'),
    },

    // workShop
    {
      path: '/user/:id/workShop',
      name: 'workShop',
      props: route => ({
        userId: route.params.id,
      }),
      component: () => import('../components/workShop/workShop.vue'),
    },
    {
      path: '/self/workShop',
      name: 'myWorkShop',
      component: () => import('../components/workShop/workShop.vue'),
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/error/ErrorPage.vue')
    },
  ],
})

export default router
