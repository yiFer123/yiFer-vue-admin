<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <span class="dot"></span>
        <messages />
      </span>
      <span>
        <search />
      </span>
      <span>
        <fullscreen />
      </span>
      <span>
        <dark-style />
      </span>
      <span>
        <language />
      </span>
    </div>
    <div class="info">
      <information />
    </div>
  </div>
</template>

<script setup lang="ts">
import Language from './Language.vue' // 多语言支持
import Information from './Information.vue' // 当前用户信息
import Fullscreen from './Fullscreen.vue' // 全屏
import DarkStyle from './DarkStyle.vue'
import Search from './Search.vue' // 搜索
import Messages from './Messages.vue' // 信息推送
</script>

<style lang="scss" scoped>
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
</style>
