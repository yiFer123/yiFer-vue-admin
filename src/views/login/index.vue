<template>
  <div class="login">
    <div class="login-panel">
      <img class="logo" src="@/assets/images/logo.svg" alt="" />
      <div class="title">Sign in</div>

      <el-form size="large" :model="account" :rules="rules" status-icon ref="formRef">
        <el-form-item prop="name">
          <el-input size="large" v-model="account.name" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" v-model="account.password" show-password placeholder="请输入您的密码" />
        </el-form-item>
      </el-form>

      <el-button :loading="isLoading" type="primary" size="large" @click="loginAction(isRemPwd)">Sign in</el-button>

      <div class="controls">
        <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
        <el-link :underline="false" type="primary" class="forgot">Forgot</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import { useLoginStore } from '@/stores/modules/login'
import { localCache } from '@/utils/cache'

// 定义常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 定义校验规则，因为校验规则唯一且不变，所以不需要接入响应式系统
const rules: FormRules = {
  name: [
    { required: true, message: '请填写你的帐号信息', trigger: 'blur' },
    { min: 6, max: 16, message: '请填写6~16位合理字符', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请填写你的密码信息',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '请填写6位以上合法字符',
      trigger: 'blur'
    }
  ]
}

// 登录数据
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false) // 是否记住密码
const isLoading = ref(false)
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
// 监听是否记住密码
watch(isRemPwd, (newVal) => {
  localCache.setCache('isRemPwd', newVal)
})

// 帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  isLoading.value = !isLoading.value
  setTimeout(() => {
    formRef.value?.validate((valid) => {
      if (valid) {
        const name = account.name
        const password = account.password
        // 向服务器发起登录请求
        loginStore.loginAccountAction({ name, password })
        // 记住账号密码，可加密
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      } else {
        isLoading.value = false
        ElMessage.error('登录信息错误，请重新输入！')
      }
    })
  }, 500) // 延时展示一下按钮loading效果，可以删除
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
