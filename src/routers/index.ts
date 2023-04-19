import { createRouter, createWebHashHistory } from 'vue-router'
import { commonRouter, errorRouter } from './routes'
import { firstMenu } from '@/utils/map-menus'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...commonRouter, ...errorRouter]
})

/**
 * @description 路由拦截器
 * * 用于判断token是否存在
 */
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  // if (to.path.startsWith('/main') && !token) {  以父路由为开头就可以用这种
  if (to.path !== '/login' && !token) {
    return '/login'
  }
  // 拿到通过菜单映射的动态路由的第一个url并跳转，免除了重定向
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
