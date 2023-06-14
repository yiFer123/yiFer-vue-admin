<template>
  <code-card :title="'🤡算数验证码'">
    <template #content>
      <div>count</div>
    </template>
  </code-card>
</template>

<script setup lang="ts">
import codeCard from './codeCard.vue'
</script>

<style lang="scss" scoped>
.nobg {
  color: #000;
}
</style>
