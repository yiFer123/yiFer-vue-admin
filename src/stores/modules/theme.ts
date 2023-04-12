import { defineStore } from 'pinia'
import type { ThemeState, AssemblySizeType } from '../interface'

const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    // 全局语言环境
    language: '',
    // element组件大小(默认large)
    assemblySize: 'large'
  }),
  getters: {},
  actions: {
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language
    },
    // setAssemblySize
    setAssemblySize(assemblySize: AssemblySizeType) {
      this.assemblySize = assemblySize
    }
  }
})

export default useThemeStore
