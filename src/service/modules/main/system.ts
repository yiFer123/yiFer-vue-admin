import http from '@/service'

/** mock data by coderwhy */
import roleList from '@/assets/mock/roleList.json'
import departmentList from '@/assets/mock/departmentList.json'

export function getEntireRoles() {
  return roleList

  return http.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return departmentList

  return http.post({
    url: '/department/list'
  })
}
