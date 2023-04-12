import { ResultEnum } from '@/enums/httpEnum'

// 默认地址请求地址，可在 .env.*** 文件中修改
export const BASE_URL = import.meta.env.VITE_API_URL as string
// 设置超时时间（10s）
export const TIME_OUT = ResultEnum.TIMEOUT as number
// 跨域时候允许携带凭证
export const WITH_CREDENTIALS = true
