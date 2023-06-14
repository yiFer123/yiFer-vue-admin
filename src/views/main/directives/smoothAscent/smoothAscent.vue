<template>
  <div class="smoothAscent">
    <div v-slide-in class="item">1</div>
    <div v-slide-in class="item">2</div>
    <div v-slide-in class="item">3</div>
    <div v-slide-in class="item">4</div>
    <div v-slide-in class="item">5</div>
    <div v-slide-in class="item">6</div>
    <div v-slide-in class="item">7</div>
    <div v-slide-in class="item">8</div>
    <div v-slide-in class="item">9</div>
    <div v-slide-in class="item">0</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'

onMounted(() => {
  ElNotification({
    title: '注意',
    message: '该页面是通过v-slide-in指令实现的平滑上升效果,详情见directives目录！',
    type: 'info',
    offset: 80
  })
})
</script>

<style lang="scss" scoped>
.smoothAscent {
  margin: 1em auto;
  width: 80%;

  .item {
    height: 400px;
    line-height: 300px;
    margin-bottom: 30px;
    background-color: #bfa;
    text-align: center;
    font-size: 80px;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
