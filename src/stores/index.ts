import { createPinia } from 'pinia'
import { useLoginStore } from './modules/login'
import type { App } from 'vue'
// pinia数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

function registerStore(app: App<Element>) {
  // 使用pinia
  app.use(pinia)

  // 加载本地菜单数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
