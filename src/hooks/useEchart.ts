import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEchart(divEl: HTMLElement) {
  const echartInstance: echarts.ECharts = echarts.init(divEl as HTMLElement, undefined, { renderer: 'svg' })

  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }

  const resizeEchart = () => {
    echartInstance.resize()
  }

  // 统一销毁
  onUnmounted(() => {
    echartInstance.dispose()
  })

  return {
    echartInstance,
    setOption,
    resizeEchart
  }
}
