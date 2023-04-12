<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      v-if="!hideToolBar"
    />
    <Editor
      :style="{ height }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { nextTick, computed, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'

// 定义父组件传参以及部分默认值
interface IEditorProps {
  value: string // 富文本值 ==> 必传
  toolbarConfig?: Partial<IToolbarConfig> // 工具栏配置 ==> 非必传（默认为空）
  editorConfig?: Partial<IEditorConfig> // 编辑器配置 ==> 非必传（默认为空）
  height?: string // 富文本高度 ==> 非必传（默认为 500px）
  mode?: 'default' | 'simple' // 富文本模式 ==> 非必传（默认为 default）
  hideToolBar?: boolean // 是否隐藏工具栏 ==> 非必传（默认为false）
  disabled?: boolean // 是否禁用编辑器 ==> 非必传（默认为false）
}
const props = withDefaults(defineProps<IEditorProps>(), {
  toolbarConfig: () => {
    return {
      excludeKeys: []
    }
  },
  editorConfig: () => {
    return {
      placeholder: '请输入文本内容...',
      MENU_CONF: {}
    }
  },
  height: '333px',
  mode: 'default',
  hideToolBar: false,
  disabled: false
})

// 判断当前富文本编辑器是否禁用
if (props.disabled) nextTick(() => editorRef.value.disable())

// 富文本的内容监听，触发父组件改变，实现双向数据绑定
type EmitProps = {
  (e: 'update:value', val: string): void
  (e: 'check-validate'): void
}
const emit = defineEmits<EmitProps>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 实例化编辑器
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 输入框失去焦点时触发
const handleBlur = () => {
  console.log('失去焦点')
  emit('check-validate')
}

// 内容 HTML
const valueHtml = computed({
  get() {
    return props.value
  },
  set(val: string) {
    // 防止富文本内容为空时，校验失败
    if (editorRef.value.isEmpty()) val = ''
    emit('update:value', val)
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (!editorRef.value) return
  editorRef.value.destroy()
})

// 暴露组件
defineExpose({
  editor: editorRef
})
</script>

<style lang="scss" scoped>
.home {
  color: #000;
}
</style>
