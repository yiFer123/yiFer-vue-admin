<template>
  <div class="guide">
    <my-tips :title="'用户引导页'" :description="'使用driver.js插件实现的页面引导功能'" />

    <div class="guide_content">
      <div id="box1" class="box1">盒子1</div>
      <div id="box2" class="box2">盒子2</div>
      <div id="box3" class="box3">盒子3</div>
      <div id="box4" class="box4">盒子4</div>
    </div>
    <div>
      <el-button type="primary" @click.prevent.stop="guide">开始引导💥</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="guide">
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import MyTips from '@/components/myTips'

const guide = () => {
  const driver: Driver = new Driver({
    allowClose: false,
    doneBtnText: '结束',
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
  driver.defineSteps(steps)
  driver.start()
}

const steps = [
  {
    element: '#box1',
    popover: {
      title: '第一步',
      description: '这里是巴拉巴拉巴拉....',
      position: 'right'
    }
  },
  {
    element: '#box2',
    popover: {
      title: '第二步',
      description: '这里是哈拉哈拉哈拉....',
      position: 'right'
    }
  },
  {
    element: '#guide_info',
    popover: {
      title: '第三步',
      description: '这是别的组件，也能通过选择器找到',
      position: 'left'
    }
  },
  {
    element: '#box3',
    popover: {
      title: '第四步',
      description: '这里是哈喽哈喽哈喽....',
      position: 'left'
    }
  },
  {
    element: '#box4',
    popover: {
      title: '第五步',
      description: '这里是喵咪喵咪喵咪....',
      position: 'left'
    }
  }
]
</script>

<style lang="scss" scoped>
.guide_content {
  display: flex;
  justify-content: space-between;
  padding: 50px;
  div {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }

  .box1 {
    background-color: #bfa;
  }

  .box2 {
    background-color: red;
  }
  .box3 {
    background-color: purple;
  }
  .box4 {
    background-color: pink;
  }
}
</style>
