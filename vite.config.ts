import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import transformEnv from './src/utils/transformEnv'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * 这个插件的使用过程：
 * 1- npm install -D vite-plugin-style-import consola
 * 2- 在vite.config.ts 中引入并在插件中进行配置
 * 3- 这样就能动态的引用你配置的组件库的样式文件了
 */
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// 查看打包后的分析文件
import { visualizer } from 'rollup-plugin-visualizer'
// 配置gzip压缩
import viteCompression from 'vite-plugin-compression'
// 配置浏览器兼容
import legacy from '@vitejs/plugin-legacy'
// 生产环境下配置CDN加速
import externalGlobals from 'rollup-plugin-external-globals'
const globals = externalGlobals({
  // vue: 'Vue',
  // vuex: 'Vuex',
  // vueRouter: 'VueRouter',
  // 'element-plus': 'element'
})

const plugins = process.env.NODE_ENV === 'production' ? [globals] : []

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd()) // 拿到的这个对象里面数据不能直接用
  const realEnv = transformEnv(env)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()]
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name: string) => {
              return `element-plus/theme-chalk/${name}.css`
            }
          }
        ]
      }),
      realEnv.VITE_REPORT && visualizer(),
      realEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 20000, // 对大于 200kb以上 的文件进行压缩
          algorithm: 'gzip',
          ext: '.gz'
        }),
      legacy({
        // targets: ['chrome 80'] // 需要兼容的目标列表，可以设置多个
        // additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      }),

      ...plugins
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      port: realEnv.VITE_PORT,
      open: realEnv.VITE_OPEN,
      cors: true
      // 跨域代理配置
      // proxy: {
      //   "/api": {
      //     target: "xxxxxx",
      //     changeOrigin: true,
      //     rewrite:path => path.replace(/^\/api/, "")
      //   }
      // }
    },
    build: {
      // 配置terser删除生产过程中的console.log防止内存泄漏
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: realEnv.VITE_DROP_CONSOLE,
          drop_debugger: realEnv.VITE_DROP_CONSOLE
        }
      }
    }
  }
})
