<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <div class="user-info">
        <el-avatar :size="36" :src="avatarImg"></el-avatar>
        <span class="name">yiFer</span>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleExitClick">
          <el-icon><CircleClose /></el-icon>
          <span>退出系统</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <el-icon><InfoFilled /></el-icon>
          <span>个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><Unlock /></el-icon>
          <span>修改密码</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/images/hello.jpg' // 图片地址
import { LOGIN_TOKEN } from '@/global/constant' // 全局常量
import router from '@/routers' // router
import { localCache } from '@/utils/cache' // 缓存工具
import { ElMessage } from 'element-plus'

// 退出系统
const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
  ElMessage.success('退出系统成功')
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .name {
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    font-family: DIN;
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 30px !important;
    padding: 5px 20px;
  }
}
</style>
