/**
 * v-slide-in
 * 平滑上升指令
 */
import type { Directive, DirectiveBinding } from 'vue'
const DISTANCE = 150
const DURATION = 1000
const EASING = 'ease'

const animationMap = new WeakMap()
const ob = new IntersectionObserver((entries) => {
  console.log(entries)
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target)
      animation.play()
      ob.unobserve(entry.target)
    }
  }
})

const slideIn: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!isBelowViewPort(el)) return
    const animation: Animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5
        },
        {
          transform: `translateY(0)`,
          opacity: 1
        }
      ],
      {
        duration: DURATION,
        easing: EASING
      }
    )
    // 进入视口前先暂停
    animation.pause()
    // 设置动画映射
    animationMap.set(el, animation)
    // 监听是否跟视口重叠
    ob.observe(el)
  },
  unmounted(el) {
    ob.unobserve(el)
  }
}

// 判断是否在视口之下，因为刷新页面后浏览器会记录当前滚动到的位置
function isBelowViewPort(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
export default slideIn
