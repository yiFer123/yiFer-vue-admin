import axios from 'axios'
import router from '@/routers'
import { ElMessage } from 'element-plus'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/serviceLoading'
import { ResultEnum } from '@/enums/httpEnum'
import { checkStatus } from '../helper/checkStatus'
import type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import type { CustomRequestConfig } from '../interface'
import { useLoginStore } from '@/stores/modules/login'

/**
 * 基于Axios二次封装的一个网络请求类，封装了全局拦截器、单个实例拦截器、单次请求拦截器
 * 添加了请求时的loading动画，会在相应成功后自动关闭
 */
class RequestHttp {
  instance: AxiosInstance
  constructor(config: CustomRequestConfig) {
    // 对axios进行实例化
    this.instance = axios.create(config)

    /**
     * @description 全局请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 如果当前请求不需要显示 loading需要在请求头中配置
        config.headers!.noLoading || showFullScreenLoading()
        // 返回配置
        return config
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )
    /**
     * @description 全局响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res
        const loginStore = useLoginStore()
        // * 在请求结束后，并关闭请求 loading
        tryHideFullScreenLoading()
        // * 登录失效，错误码401判断
        if (data.code == ResultEnum.OVERDUE) {
          ElMessage.error(data.msg) // 错误信息轻提示
          loginStore.setToken('') // 重置token
          router.replace('/login') // 跳转到login登录
          return Promise.reject(data)
        }

        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
        return data
      },
      (err: AxiosError) => {
        const { response } = err
        tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (err.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试')
        if (err.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误！请您稍后重试')
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace('/500')
        return Promise.reject(err)
      }
    )

    /**
     * @description 单个实例的请求与响应拦截器
     * 需要通过当前类 new 出新实例时传入对应的 interceptors 函数
     */
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  // 防止库突然不维护了，所以进行一层二次封装request
  request<T = any>(config: CustomRequestConfig<T>) {
    // 单次请求成功拦截处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: CustomRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: CustomRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: CustomRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: CustomRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default RequestHttp
