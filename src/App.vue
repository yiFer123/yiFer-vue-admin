<template>
  <el-config-provider :locale="i18nLocale" :button="ButtonConfig" :message="MessageConfig" :size="SizeConfig">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { getBrowserLang } from '@/utils/common'
import useThemeStore from './stores/modules/theme'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

// theme store
const themeStore = useThemeStore()

// element language 用来控制element组件中的语言，页面使用i18n来进行控制
const i18nLocale = computed(() => {
  if (themeStore.language === 'zh') return zhCn
  if (themeStore.language === 'en') return en
  return getBrowserLang() === 'zh' ? zhCn : en
})

// element button
const ButtonConfig = reactive({
  autoInsertSpace: true // 中文字符中自动插入空格
})

// element message
const MessageConfig = reactive({
  max: 3 // 同时最大显示3条信息
})

// element component size
const SizeConfig = computed(() => themeStore.assemblySize)
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
