<template>
  <i
    :class="['iconfont', isDark ? 'icon-anhei' : 'icon-mingliang']"
    class="toolBar-icon"
    @click.stop="toggleDark()"
  ></i>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
