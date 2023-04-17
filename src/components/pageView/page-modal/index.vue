<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-if="item.type !== 'password' || (item.type === 'password' && isNewRef)"
            >
              <template v-if="item.type === 'input'">
                <el-input :placeholder="item.placeholder" v-model="formData[item.prop]"></el-input>
              </template>
              <template v-if="item.type === 'password'">
                <el-input :placeholder="item.placeholder" v-model="formData[item.prop]"></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            {{ $t('common.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/modules/system'
import { ref, reactive } from 'vue'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: IItems[]
  }
}
interface IItems {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: any
  options?: any[]
}

const props = defineProps<IProps>()

const editData: any = ref(null)

const systemStore = useSystemStore()

// 控制dialog 可见性
const isNewRef = ref(true)
const centerDialogVisible = ref(false)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  // 如果是编辑的话,数据回显
  if (!isNew && itemData) {
    editData.value = itemData // 保存备份编辑数据

    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    editData.value = null // 清空编辑数据
    // 新建数据
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
  }
}

// form表单
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

// 点击确定
function handleConfirmClick() {
  centerDialogVisible.value = false

  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
  } else {
    // 将formData发送到后台
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
  }
}

defineExpose({
  setModalVisible
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
