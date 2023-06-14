<template>
  <div class="role flx-column fill-parent">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" :other-infos="otherInfos" ref="modalRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          @check="handleElTreeCheck"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import useRoleStore from '@/stores/modules/role'
import { ref, nextTick } from 'vue'
import { mapMenuListToIds } from '@/utils/map-menus'

import PageSearch from '@/components/pageView/page-search'
import searchConfig from './config/search.config'

import PageContent from '@/components/pageView/page-content'
import contentConfig from './config/content.config'

import PageModal from '@/components/pageView/page-modal'
import modalConfig from './config/modal.config'

// 封装的hook
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'

// content操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)

// 获取完整菜单
const treeRef = ref<InstanceType<typeof ElTree>>()
const roleStore = useRoleStore()
const { entireMenus } = storeToRefs(roleStore)
const otherInfos = ref({}) // 其他需要传递数据
// 获取所有选中子tree的id
function handleElTreeCheck(d1: any, d2: any) {
  const menuList = [...d2.checkedKeys, ...d2.halfCheckedKeys]
  otherInfos.value = { menuList }
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menusIds = mapMenuListToIds(itemData.menuList)

    treeRef.value?.setCheckedKeys(menusIds)
  })
}
</script>

<style scoped></style>
