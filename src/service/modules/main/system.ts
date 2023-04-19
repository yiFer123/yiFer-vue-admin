import http from '@/service'

/** mock data by coderwhy */
import roleList from '@/assets/mock/roleList.json'
import departmentList from '@/assets/mock/departmentList.json'
import userMenus from '@/assets/mock/userMenus.json'

export function getEntireRoles() {
  // return roleList

  return http.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  // return departmentList

  return http.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return userMenus

  return http.post({
    url: '/menu/list'
  })
}

// 针对页面的增删改查
export function postPageListData(pageName: string, queryInfo: any) {
  return http.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return http.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return http.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return http.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
