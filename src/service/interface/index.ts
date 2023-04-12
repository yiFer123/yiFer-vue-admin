// v1.2.4 axios将原先的RawAxiosRequestConfig类型合并了AxiosRequestConfig
// 并且新增了InternalAxiosRequestConfig类型用于拦截器use的config类型

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface CustomInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 为原类型新增单个实例的请求/响应拦截器
export interface CustomRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CustomInterceptors<T>
}
