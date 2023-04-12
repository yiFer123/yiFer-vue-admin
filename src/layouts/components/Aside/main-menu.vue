<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/images/logo.png" alt="" />
      <h2 v-show="!isFold" class="title">yiFer-vue-admin</h2>
    </div>
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActive"
        :collapse="isFold"
        :collapse-transition="false"
        :unique-opened="true"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu v-if="item.children.length" :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item :index="item.id + ''" v-else @click="handleItemClick(item)">
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
import { useLoginStore } from '@/stores/modules/login'

// 获取登录store
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 折叠状态
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 监听菜单点击
const router = useRouter()
const handleItemClick = (item: any) => {
  router.push(item.url)
}

// ElMenu default menu
const route = useRoute()

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
