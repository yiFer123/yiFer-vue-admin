<template>
  <div class="tips">
    <el-alert :title="title" :type="type" :description="description" show-icon :closable="false" />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  description: string
  type: 'success' | 'warning' | 'info' | 'error'
}

withDefaults(defineProps<IProps>(), {
  title: '默认标题',
  description: '默认描述文字',
  type: 'info'
})
</script>

<style lang="scss" scoped>
.tips {
  margin-bottom: 10px;

  .el-alert {
    background-color: #dce1e8;
  }
}
</style>
