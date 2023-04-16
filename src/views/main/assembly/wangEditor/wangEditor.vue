<template>
  <div class="wangEditor">
    <my-tips :title="'富文本编辑器'" :description="'为用户提供可以实现所见即所得的文本编辑器的功能'" />

    <wang-editor v-model:value="editorValue"></wang-editor>

    <el-button type="primary" @click="dialogVisible = true">内容预览</el-button>
    <p>基于wangEditor实现的富文本编辑器，文档地址 <a target="_blank" href="https://www.wangeditor.com/">在这</a></p>
    <el-dialog fullscreen v-model="dialogVisible" title="富文本内容预览">
      <div class="view" v-html="editorValue"></div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="wangEditor">
import WangEditor from '@/components/wangEditor'
import MyTips from '@/components/myTips'
import { ref } from 'vue'

const editorValue = ref('')
const dialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.wangEditor {
  padding: 20px;
  background-color: #fff;

  .el-button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
  }
}
</style>
