<template>
  <div class="code">
    <el-row :gutter="20">
      <el-col :span="12">
        <nobg-code></nobg-code>
      </el-col>
      <el-col :span="12">
        <hasbg-code></hasbg-code>
      </el-col>
      <el-col :span="12">
        <figure-code></figure-code>
      </el-col>
      <el-col :span="12">
        <count-code></count-code>
      </el-col>
      <el-col :span="12">
        <chinese-code></chinese-code>
      </el-col>
      <el-col :span="12">
        <slider-code></slider-code>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import nobgCode from './components/nobgCode.vue'
import hasbgCode from './components/hasbgCode.vue'
import figureCode from './components/figureCode.vue'
import countCode from './components/countCode.vue'
import chineseCode from './components/chineseCode.vue'
import sliderCode from './components/sliderCode.vue'
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
