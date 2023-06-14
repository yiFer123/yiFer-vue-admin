<template>
  <my-tips :title="'数字滚动功能'" :description="'使用countup.js插件实现的数字滚动功能'" />
  <div class="countup flx-center">
    <div ref="countRef" @click="refreshCountUp" title="点击刷新再看一遍！"></div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'
import { onMounted, nextTick, ref } from 'vue'
import MyTips from '@/components/myTips'
import { throttle } from 'lodash-es'

let option: CountUpOptions = {
  startVal: 0, // 开始的数字  一般设置0开始
  decimalPlaces: 2, // number类型 小数位，整数自动添.00
  duration: 2, // number类型 动画延迟秒数，默认值是2
  useGrouping: true, // boolean类型  是否开启逗号，默认true(1,000)false(1000)
  useEasing: true, // booleanl类型 动画缓动效果(ease),默认true
  smartEasingThreshold: 500, // numberl类型 大于这个数值的值开启平滑缓动
  smartEasingAmount: 300, // numberl类型
  separator: ',', // string 类型 分割用的符号
  decimal: '.', // string 类型  小数分割符合
  prefix: '￥', // sttring 类型  数字开头添加固定字符
  suffix: '元', // sttring类型 数字末尾添加固定字符
  numerals: [] // Array类型 替换从0到9对应的字，也就是自定数字字符了,数组存储
}

// 定义数量级
const countRef = ref()

// 定义初始化数字滚动函数
const initCountUp = () => {
  // 在dom更新后触发
  nextTick(() => {
    new CountUp(countRef.value as HTMLDivElement, Math.random() * 10000, option).start()
  })
}

// 刷新按钮
const refreshCountUp = throttle(() => {
  initCountUp()
  console.log(123)
}, 1000)

// 页面加载时
onMounted(() => {
  initCountUp()
})
</script>

<style lang="scss" scoped>
.countup {
  width: 100%;
  background-color: #fff;
  line-height: 300px;

  font-size: 80px;
}
</style>
