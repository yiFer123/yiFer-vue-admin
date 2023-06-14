<template>
  <div class="parallax-rolling">
    <div ref="scrollContainer" class="scroll-box"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import img1 from '../../../../assets/images/parallaxRolling/01.jpg'
import img2 from '../../../../assets/images/parallaxRolling/02.jpg'
import img3 from '../../../../assets/images/parallaxRolling/03.jpg'
import img4 from '../../../../assets/images/parallaxRolling/04.jpg'
import img5 from '../../../../assets/images/parallaxRolling/05.jpg'
const imgs = [img1, img2, img3, img4, img5]

const scrollContainer = ref<HTMLInputElement | null>(null) // dom节点

let currentIndex = 0

function createItem(index: number) {
  const imgUrl = imgs[index]
  const item = document.createElement('div')
  item.classList.add('item')
  item.innerHTML = `<img src="${imgUrl}" />`
  if (scrollContainer.value) {
    scrollContainer.value.appendChild(item)
  }

  return item
}

function resetElement() {
  if (scrollContainer.value) {
    scrollContainer.value.innerHTML = ''
  }

  const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
  const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1

  createItem(prevIndex).classList.add('prev')
  createItem(currentIndex).classList.add('cur')
  createItem(nextIndex).classList.add('next')
}

onMounted(() => {
  resetElement()
  let isAnimating = false
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('wheel', (e) => {
      // 往上滚负数往下滚正数
      if (!e.deltaY) return
      if (isAnimating) return

      isAnimating = true
      if (e.deltaY > 0) {
        scrollContainer.value?.classList.add('scroll-down')

        currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
      } else {
        scrollContainer.value?.classList.add('scroll-up')

        currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
      }
    })

    scrollContainer.value.addEventListener('transitionend', () => {
      isAnimating = false

      scrollContainer.value?.classList.remove('scroll-down')
      scrollContainer.value?.classList.remove('scroll-up')

      resetElement()
    })
  }
})
</script>

<style lang="scss">
.parallax-rolling {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .scroll-box {
    height: 100%;
    position: relative;

    .item {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      transition: 1s ease-in-out;

      img {
        position: absolute;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        transition: 1s;
      }
    }

    .item.prev,
    .item.next {
      z-index: 1;
      height: 0;
    }

    .item.next {
      bottom: 0;
    }

    .item.next img {
      transform: translateY(10%);
    }

    .item.prev img {
      transform: translateY(-10%);
    }
  }

  .scroll-up .item.prev {
    height: 100%;
  }
  .scroll-up .item.prev img {
    transform: translateY(0);
  }
  .scroll-up .item.cur img {
    transform: translateY(10%);
  }

  .scroll-down .item.next {
    height: 100%;
  }
  .scroll-down .item.next img {
    transform: translateY(0);
  }
  .scroll-down .item.cur img {
    transform: translateY(-10%);
  }
}
</style>
