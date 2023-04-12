<template>
  <i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="toolBar-icon" @click="toggle"></i>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

// 全屏
const { toggle, isFullscreen } = useFullscreen()
</script>

<style lang="scss" scoped></style>
