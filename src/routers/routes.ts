import type { RouteRecordRaw } from 'vue-router'

/**
 * meta元信息可以控制该路由是否需要进一步处理，比如浏览器的title名等
 *  * title -: 当前浏览器网页title名
 */

// 公共页面路由，每个用户都会有的
export const commonRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页面'
    }
  }
]

// Not Found 页面路由
export const errorRouter: RouteRecordRaw[] = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401-当前用户没有访问权限 即将跳转到登录页面'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: '403-服务器资源错误 请刷新重试'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404-您访问的页面不存在 请刷新重试'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      title: '500-服务器内部错误 请稍后重试'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404-您访问的页面不存在 请刷新重试'
    }
  }
]
