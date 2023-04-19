/**
 * v-auth
 * 按钮权限指令
 */
import { useLoginStore } from '@/stores/modules/login'
import type { Directive, DirectiveBinding } from 'vue'

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const loginStore = useLoginStore()
    const { permissions } = loginStore

    if (value instanceof Array && value.length) {
      console.log('如果是数组就进行这里的操作')
      for (const itemx of value) {
        if (!permissions.find((item) => item.includes(itemx))) el.remove()
      }
    } else {
      // 判断是否有权限 没有就删除
      const hasPermission = !!permissions.find((item) => item.includes(value))
      if (!hasPermission) el.remove()
    }
  }
}

export default auth
