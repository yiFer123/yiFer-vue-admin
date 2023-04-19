import { createApp } from 'vue'
import App from './App.vue'
// reset style sheet / common style / theme style
import 'normalize.css'
import './assets/css/index.scss'
// font / iconfont
import '@/assets/iconfont/iconfont.scss'
import '@/assets/fonts/font.scss'
// router / store
import router from './routers'
import store from './stores'
// register element icons
import registerIcons from './global/register-icons'
// vue i18n
import I18n from '@/i18n/index'
// custom directives
import directives from './directives'
// 解决谷歌 Added non-passive event listener to a scroll-blocking 'mousewheel' event
import 'default-passive-events'

const app = createApp(App)
app.use(registerIcons).use(store).use(directives).use(router).use(I18n).mount('#app')
