<template>
  <div class="search">
    <div class="title flx-justify-between">
      <div class="t_left">{{ searchConfig.headers.left }}</div>
      <div class="t_right">
        <slot name="t_slot" :title="searchConfig.headers.right"> </slot>
      </div>
    </div>
    <el-form ref="formRef" :model="searchForm" :label-width="searchConfig.labelWidth">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col v-bind="searchConfig.layouts">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input :placeholder="item.placeholder" v-model="searchForm[item.prop]"></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
        <el-col :xs="24" :sm="12" :md="24" :lg="6" :xl="6">
          <div class="control">
            <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import type { IHeaders, ILayouts, IFormItems } from './interface'

// 定义自定义事件和属性
interface IProps {
  searchConfig: {
    headers: IHeaders
    labelWidth?: string
    layouts?: ILayouts
    formItems: IFormItems[]
  }
}

const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

// 表单搜索
const initialForm: any = {} // 配置生成表单数据
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置功能
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields() // elform自带重置功能
  emit('resetClick')
}
// 查询功能
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
