// 搜索框标题
export interface IHeaders {
  left: string
  right?: string
}
// 搜索框响应式布局
export interface ILayouts {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
// 搜索框form表单类型
export interface IFormItems {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: string | number
  options?: IOptions[]
}
// select
interface IOptions {
  label: string
  value: string | number
}
