<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">简体中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import useThemeStore from '@/stores/modules/theme'
import { getBrowserLang } from '@/utils/common'

// 切换语言
const i18n = useI18n()
const themeStore = useThemeStore()
const language = computed((): string => themeStore.language)
const handleSetLanguage = (lang: string) => {
  i18n.locale.value = lang
  themeStore.updateLanguage(lang)
}
onMounted(() => {
  handleSetLanguage(language.value || getBrowserLang())
})
</script>

<style lang="scss" scoped></style>
