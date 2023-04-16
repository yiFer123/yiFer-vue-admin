<template>
  <div class="copy">
    <my-tips :title="'剪切板功能'" :description="'使用vue-clipboard3插件实现的页面复制功能'" />
    <el-input v-model="text" placeholder="请输入想复制的文本内容！">
      <template #append>
        <el-button @click="copy">Copy!</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import useClipboard from 'vue-clipboard3'
import MyTips from '@/components/myTips'
import { ref } from 'vue'

const { toClipboard } = useClipboard()

const text = ref('')

const copy = async () => {
  try {
    await toClipboard(text.value)
    console.log('Copied to clipboard')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped></style>
