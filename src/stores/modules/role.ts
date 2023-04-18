import { getEntireDepartments, getEntireRoles, getEntireMenus } from '@/service/modules/main/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { RoleState } from '../interface'

const useRoleStore = defineStore('role', {
  state: (): RoleState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  getters: {},
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      if (!rolesResult.code && !departmentResult.code) {
        this.entireRoles = rolesResult.data.list
        this.entireDepartments = departmentResult.data.list
        this.entireMenus = menuResult.data
      } else {
        ElMessage.error('请求数据错误，请刷新重试！')
      }
    }
  }
})

export default useRoleStore
