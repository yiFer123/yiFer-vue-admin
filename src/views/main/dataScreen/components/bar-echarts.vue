<template>
  <base-echart :option="option" :width="width" :height="height"></base-echart>
</template>

<script setup lang="ts">
import BaseEchart from '@/components/baseEchart'
import type { IBar } from '../interface'

interface IProps {
  width?: string
  height?: string
  echartDatas: IBar[]
}

const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '100%'
})

const category = props.echartDatas.map((item) => {
  return item.name
})
const categoryData = props.echartDatas.map((item) => {
  return item.value
})

const option: echarts.EChartsOption = {
  // backgroundColor: 'rbg(40,46,72)',
  grid: {
    left: '5%',
    right: '5%',
    top: '30%',
    bottom: '5%',
    containLabel: true // grid 区域是否包含坐标轴的刻度标签
  },
  tooltip: {},
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#42A4FF'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'white'
    },

    data: category
  },
  yAxis: {
    name: '个',
    nameTextStyle: {
      color: 'white',
      fontSize: 13
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#42A4FF'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#42A4FF'
      }
    },
    axisLabel: {
      color: 'white'
    }
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      barWidth: 17,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#01B1FF' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#033BFF' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: categoryData
    }
  ]
}
</script>

<style lang="scss" scoped></style>
