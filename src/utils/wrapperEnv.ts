// * Vite
type Recordable<T = any> = Record<string, T>

interface ViteEnv {
  VITE_API_URL: string // API地址: http://xxx.com:4567
  VITE_PORT: number // serve端口号
  VITE_OPEN: boolean // 是否自动打开浏览器
  VITE_GLOB_APP_TITLE: string // 标题title
  VITE_DROP_CONSOLE: boolean // 生产环境是否删除log
  VITE_PROXY_URL: string // proxy代理地址
  VITE_BUILD_GZIP: boolean // 打包后是否开始gzip
  VITE_REPORT: boolean // 是否生成包分析文件
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        console.log('err')
      }
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}
