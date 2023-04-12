<template>
  <div class="header-crumb hidden-xs-only">
    <el-breadcrumb separator-icon="ArrowRight">
      <TransitionGroup name="breadcrumbs">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item :to="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </template>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/modules/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="scss" scoped>
.breadcrumbs-move, /* 对移动中的元素应用的过渡 */
.breadcrumbs-enter-active,
.breadcrumbs-leave-active {
  transition: all 0.33s ease;
}

.breadcrumbs-enter-from,
.breadcrumbs-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.breadcrumbs-leave-active {
  position: absolute;
}
</style>
