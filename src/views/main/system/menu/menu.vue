<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/pageView/page-content'
import contentConfig from './config/content.config'
</script>

<style lang="scss" scoped>
.menu {
  color: #000;
}
</style>
