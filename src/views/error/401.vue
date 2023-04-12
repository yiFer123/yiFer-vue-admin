<template>
  <div class="e401">
    <h2>e401</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const title: string = route.meta.title as string

document.title = title
</script>

<style lang="scss" scoped>
.e401 {
  color: #000;
}
</style>
