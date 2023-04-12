<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="nreadcrumb">
        <header-crumb />
      </div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

const emit = defineEmits(['flodChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  // 记录折叠状态
  isFold.value = !isFold.value
  // 传递事件给父组件
  emit('flodChange', isFold.value)
}

defineExpose({ handleMenuIconClick })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
