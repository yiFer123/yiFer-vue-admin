<template>
  <el-container class="main-content">
    <el-aside :width="isFold ? '60px' : '210px'">
      <main-menu :is-fold="isFold" />
    </el-aside>
    <el-container>
      <el-header>
        <main-header ref="headerRef" @flod-change="handleFlodChange" />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
      <el-footer>
        <main-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import MainHeader from './components/Header'
import MainFooter from './components/Footer'
import MainMenu from './components/Aside'
import _ from 'lodash'

const isFold = ref(false)
const handleFlodChange = (flag: boolean) => {
  isFold.value = flag
}

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)
const headerRef = ref()
const listeningWindow = _.debounce(() => {
  screenWidth.value = document.body.clientWidth
  if ((!isFold.value && screenWidth.value < 1200) || (isFold.value && screenWidth.value > 1200))
    headerRef.value.handleMenuIconClick()
}, 150)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
