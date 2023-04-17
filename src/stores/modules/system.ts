import { postPageListData, deletePageById, newPageData, editPageData } from '@/service/modules/main/system'
import { defineStore } from 'pinia'
import type { ISystemState } from '../interface'
import { ElMessage } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageList: [],
    pageTotalCount: 0
  }),
  getters: {},
  actions: {
    // 针对页面数据
    async postPageListAction(pageName: string, queryInfo: any) {
      const res = await postPageListData(pageName, queryInfo)

      const { totalCount, list } = res.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const { code, data } = await deletePageById(pageName, id)
      // 如果删除成功，code === 0
      if (code === 0) {
        ElMessage.success(data)
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      } else {
        ElMessage.error(data)
      }
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const { code, data } = await newPageData(pageName, pageInfo)
      if (code === 0) {
        ElMessage.success(data)
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      } else {
        ElMessage.error(data)
      }
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const { code, data } = await editPageData(pageName, id, userInfo)
      if (!code) {
        ElMessage.success(data)
      } else {
        ElMessage.error(data)
      }
      // 重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
