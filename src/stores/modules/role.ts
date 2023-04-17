import { getEntireDepartments, getEntireRoles } from '@/service/modules/main/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { RoleState } from '../interface'

const useRoleStore = defineStore('role', {
  state: (): RoleState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  getters: {},
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()

      if (!rolesResult.code && !departmentResult.code) {
        this.entireRoles = rolesResult.data.list
        this.entireDepartments = departmentResult.data.list
      } else {
        ElMessage.error('请求数据错误，请刷新重试！')
      }
    }
  }
})

export default useRoleStore
