<template>
  <div class="copy">
    <my-tips :title="'剪切板功能'" :description="'使用vue-clipboard3插件实现的页面复制功能'" />
    <el-input size="large" v-model="text">
      <template #append>
        <el-button @click="copy">Copy!</el-button>
      </template>
    </el-input>
    <el-input
      size="large"
      style="margin-top: 10px"
      v-model="text2"
      placeholder="点击copy按钮后可以在此输入框中通过ctrl+V来预览复制内容"
    ></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import MyTips from '@/components/myTips'
import { ElMessage } from 'element-plus'

const { toClipboard } = useClipboard()

const text = ref('请输入想复制的文本内容！')
const text2 = ref('')

const copy = async () => {
  if (!text.value) return ElMessage.error('请输入你想要复制的内容！！！')
  try {
    await toClipboard(text.value)
    ElMessage.success('Copied to clipboard，复制成功！！！')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped></style>
