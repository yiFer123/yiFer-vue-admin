import http from '../..'
/** mock data by coderwhy */
import loginInfo from '@/assets/mock/loginInfo.json'
import userInfo from '@/assets/mock/userInfo.json'
import userMenus from '@/assets/mock/userMenus.json'

export function accountLoginRequest(account: any) {
  // return loginInfo

  return http.post({
    // 网络请求方式
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  // return userInfo

  return http.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return userMenus

  return http.get({
    url: `/role/${id}/menu`
  })
}
