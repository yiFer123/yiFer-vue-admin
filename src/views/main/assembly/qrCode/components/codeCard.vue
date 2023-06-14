<template>
  <div class="card">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <slot name="content"></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.card {
  color: #000;
}
</style>
