import { throttle } from 'lodash-es'
import { onBeforeUnmount } from 'vue'

export default function (el: HTMLElement) {
  // 1- 定义监听浏览器 resize 事件
  const resize = throttle(() => {
    triggerScale()
  }, 150)

  // 2- 定义屏幕缩放函数
  const triggerScale = () => {
    // 根据浏览器大小推断缩放比例
    const getScale = (width = 1920, height = 1080, targetRatio = 16 / 9) => {
      // 拿到当前设备宽高
      const currentX = document.documentElement.clientWidth || document.body.clientWidth
      const currentY = document.documentElement.clientHeight || document.body.clientHeight

      // 计算缩放比例
      const scaleRatioW = currentX / width // 参照宽度进行缩放
      const scaleRatioY = currentY / height // 参照宽度进行缩放
      const currentRatio = currentX / currentY // 当前屏幕宽高比

      return currentRatio > targetRatio ? scaleRatioY : scaleRatioW
    }
    if (el) {
      el.style.transform = `scale(${getScale()}) translateX(-50%)`
      el.style.width = `1920px`
      el.style.height = `1080px`
      el.style.left = `50%`
    }
  }

  // 3- 窗口变化时触发
  window.addEventListener('resize', resize)

  // 4- 退出时销毁
  onBeforeUnmount(() => {
    window.addEventListener('resize', resize)
  })

  return {
    triggerScale
  }
}
