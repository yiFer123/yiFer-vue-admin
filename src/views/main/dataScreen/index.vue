<template>
  <div class="dataScreen" ref="dataScreenRef">
    <main class="screen-bg">
      <div class="header"></div>

      <div class="left-top">
        <pie-charts :echart-datas="chargingPile.data"></pie-charts>
      </div>
      <div class="left-bottom">
        <line-echarts :echart-datas="processMonitoring.data"></line-echarts>
      </div>

      <div class="right-top"></div>
      <div class="right-center">
        <bar-echarts :echart-datas="chargingStatistics.data"></bar-echarts>
      </div>
      <div class="right-bottom"></div>

      <div class="center"></div>
      <div class="bottom"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useScalePage from '@/hooks/useScalePage'
import PieCharts from './components/pie-echarts.vue'
import LineEcharts from './components/line-echarts.vue'
import BarEcharts from './components/bar-echarts.vue'
import { chargingPileData, processMonitoringData, chargingStatisticsData } from './config/home-data.json'
const chargingPile = ref(chargingPileData)
const processMonitoring = ref(processMonitoringData)
const chargingStatistics = ref(chargingStatisticsData)

const dataScreenRef = ref<HTMLElement | null>(null)
onMounted(() => {
  if (dataScreenRef.value) {
    const trigger = useScalePage(dataScreenRef.value)
    trigger.triggerScale()
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
