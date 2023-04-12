import RequestHttp from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'

const http = new RequestHttp({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 因为headers是可选类型不可以直接赋值，所以要进行类型缩小
      if (config.headers && token) {
        // 根据后端返回的token 配置，如果其返回的有Bearer就不用拼接
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default http
