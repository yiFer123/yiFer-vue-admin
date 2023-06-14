<template>
  <div class="content">
    <div class="header">
      <h3 class="title">
        {{ contentConfig.header?.title ?? '💖普通通用表格(可配置表格标题)' }}
      </h3>
      <div class="actions">
        <el-button-group class="hidden-sm-and-down">
          <el-button type="success" plain icon="Printer" />
          <el-button type="success" plain icon="DocumentAdd" />
          <el-button type="success" plain icon="Share" />
        </el-button-group>
        <el-button
          @click="hiddenSearchClick"
          class="hidden-sm-and-down"
          type="warning"
          plain
          icon="Search"
          style="margin-left: 20px"
        >
          {{ isShow ? '隐藏' : '显示' }}
        </el-button>
        <el-button v-if="isDelete" type="danger" plain icon="Close" style="margin-left: 20px">批量删除</el-button>
        <el-button
          v-auth="`${contentConfig.pageName}:create`"
          type="primary"
          plain
          icon="Plus"
          style="margin-left: 20px"
          @click="handleNewUserClick"
        >
          {{ contentConfig.header?.btnTitle ?? '新建数据' }}
        </el-button>
      </div>
    </div>

    <div class="table">
      <el-table v-bind="contentConfig.childrenTree" :data="pageList" border style="width: 100%" highlight-current-row>
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item" show-overflow-tooltip>
              <template #default="scope">
                {{ utcFormat(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'enable'">
            <el-table-column v-bind="item" show-overflow-tooltip>
              <template #default="scope">
                <el-button plain size="small" :type="scope.row.enable ? 'primary' : 'danger'">
                  {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" fixed="right" label="操作" :width="item.width">
              <template #default="scope">
                <el-popconfirm title="确定删除该数据?" @confirm="handleDeleteClick(scope.row.id)">
                  <template #reference>
                    <el-button v-if="isDelete" plain type="danger" icon="Delete" circle />
                  </template>
                </el-popconfirm>

                <el-divider direction="vertical" />
                <el-button
                  v-if="isUpdate"
                  plain
                  type="primary"
                  icon="Edit"
                  circle
                  @click="handleEditClick(scope.row)"
                />
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" show-overflow-tooltip>
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"> </slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" show-overflow-tooltip />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="pageTotalCount">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/modules/system'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { utcFormat } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

// 定义事件和属性
const emit = defineEmits(['newClick', 'editClick', 'hiddenSearch'])
const props = defineProps<IProps>()

// 获取增删改查权限
// const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

const systemStore = useSystemStore()
// 获取数据(因为上面发起请求是异步的，所以第一次执行这段代码是没有数据的，并且是非响应式的)
// storeToRefs 就是将该数据变成响应式，也可以用计算属性
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 分页相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)

systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'deletePageByIdAction' || name === 'editPageDataAction' || name === 'newPageDataAction') {
      currentPage.value = 1
    }
  })
})

onMounted(() => {
  fetchPageListData()
})

function handleSizeChange() {
  // 每页显数据个数改变时触发，重新调用请求函数
  fetchPageListData()
}
function handleCurrentChange() {
  // 当前页码改变时触发，重新调用请求函数
  fetchPageListData()
}

// 发起action请求数据,先封装函数再调用
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除操作
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新增操作
function handleNewUserClick() {
  emit('newClick')
}

// 编辑操作
function handleEditClick(itemData: any) {
  emit('editClick', itemData)
}

// 隐藏搜索框
const isShow = ref(true)
function hiddenSearchClick() {
  isShow.value = !isShow.value
  emit('hiddenSearch', isShow.value)
}

// 暴露网络请求函数
defineExpose({ fetchUserListData: fetchPageListData })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
