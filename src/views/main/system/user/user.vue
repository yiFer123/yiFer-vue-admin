<template>
  <div class="user flx-column fill-parent">
    <transition name="plus-icon">
      <page-search
        v-show="isShow"
        :search-config="searchConfig"
        @query-click="handleQueryClick"
        @reset-click="handleResetClick"
      >
        <template #t_slot="info">
          <!-- 使用作用域插槽实现，默认不显示 -->
          <!-- <el-button>{{ info.title }}</el-button> -->
          <el-link type="primary" :underline="false" @click="slotClick">{{ info }}</el-link>
        </template>
      </page-search>
    </transition>

    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      @hidden-search="handleSearchHidden"
    />
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { computed, ref } from 'vue'
import useRoleStore from '@/stores/modules/role'

import PageSearch from '@/components/pageView/page-search'
import searchConfig from './config/search.config'

import PageContent from '@/components/pageView/page-content'
import contentConfig from './config/content.config'

import PageModal from '@/components/pageView/page-modal'
import modalConfig from './config/modal.config'

// 封装的hook
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// content操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal()

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const roleStore = useRoleStore()
  const departments = roleStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  const roles = roleStore.entireRoles.map((item) => {
    return { label: item.name, value: item.id }
  })

  // 类型有缺失的问题
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'departmentId') {
      item.options.push(...departments)
    } else if (item.prop === 'roleId') {
      item.options.push(...roles)
    }
  })

  return modalConfig
})

// 隐藏搜索框组件
const isShow = ref(true)
function handleSearchHidden(flag: boolean) {
  isShow.value = flag
}

// 作用于插槽点击触发
const slotClick = () => {
  console.log('点击了插槽')
}
</script>

<style lang="scss" scoped>
.plus-icon-enter-active {
  transition: all 0.1s;
}

.plus-icon-enter {
  opacity: 0;
}

.plus-icon-leave-active {
  transition: opacity 0.1s;
}

.plus-icon-leave-to {
  opacity: 0;
}
</style>
