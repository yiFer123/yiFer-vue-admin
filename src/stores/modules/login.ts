import { defineStore } from 'pinia'
import router from '@/routers'
import type { LoginState } from '../interface'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constant'
import mapMenusToRoutes from '@/utils/map-menus'
import useRoleStore from './role'
import { ElNotification } from 'element-plus'
import { getTimeState } from '@/utils/common'

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    async loginAccountAction(account: any) {
      // 1- 登陆后获取token等信息,该接口返回有 id name token
      const loginResult = await accountLoginRequest(account)

      // 2- pinia和local都储存一下token
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3- 根据登录用户id获取对应role角色信息 code / data
      const id = loginResult.data.id
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 4- 根据role id 获取对应菜单权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 5- 请求所有role/department数据(如果有的话)
      const roleStore = useRoleStore()
      roleStore.fetchEntireDataAction()

      // 6- 本地缓存下用户信息和菜单
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENUS, userMenus)

      // 7- 动态路由映射
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 8- 进行页面跳转
      router.push('/main')
      const title = getTimeState()
      ElNotification({
        title,
        message: '欢迎使用本系统，祝您心情愉快！',
        type: 'success'
      })
    },
    /**
     * @description 刷新后重新加载部分数据和路由
     */
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const roleStore = useRoleStore()
        roleStore.fetchEntireDataAction()

        // 动态路由操作
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
