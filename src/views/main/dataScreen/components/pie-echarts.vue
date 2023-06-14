<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { IPie } from '../interface'
import useEchart from '@/hooks/useEchart'

interface IProps {
  width?: string
  height?: string
  echartDatas: IPie[]
}

const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '100%'
})

const divRef = ref<HTMLElement | null>(null)
let myChart: any = null
onMounted(() => {
  setupEchart(props.echartDatas)
})
function setupEchart(data: IPie[]) {
  if (!myChart && divRef.value) myChart = useEchart(divRef.value)
  const option = getOption(data)
  myChart?.setOption(option)
}
function getOption(pieDatas: IPie[]) {
  let colors = pieDatas.map((item) => {
    return item.color
  })

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  let option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: '50%',
      left: '30%',
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: 'white',
            padding: [10, 0]
          },
          number: {
            fontSize: 24,
            color: 'white',
            padding: [4, 0, 0, 20]
          }
        }
      }
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '18%',
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: 'rect',
      formatter: function (name: any) {
        let currentItem = pieDatas.find((item) => item.name === name)
        if (currentItem)
          return (
            '{nameSty|' +
            currentItem.name +
            '}\n' +
            '{numberSty|' +
            currentItem.value +
            '个 }' +
            '{preSty|' +
            currentItem.percentage +
            '}'
          )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: '#FFFFFF',
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff'
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        center: ['40%', '57%'],
        radius: ['30%', '75%'],
        label: {
          show: false
        },
        data: data,
        roseType: 'area'
      }
    ]
  }
  return option
}
// 监听echart图表数据的变化
watch(
  () => props.echartDatas,
  (newV) => {
    setupEchart(newV)
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
