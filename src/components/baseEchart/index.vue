<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hooks/useEchart'

// 定义props参数
interface IProps {
  width?: string
  height?: string
  option: echarts.EChartsOption
}
const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '100%'
})

// 获取echart容器
const divRef = ref<HTMLElement | null>(null)
let myChart: any = null

// 挂载时进行初始化
onMounted(() => {
  setupEchart()
})

// 初始化echart函数封装
function setupEchart() {
  if (!myChart && divRef.value) myChart = useEchart(divRef.value)
  myChart?.setOption(props.option)
}

// 监听数据发生变化
watch(
  () => props.option,
  () => {
    setupEchart()
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
