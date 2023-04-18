const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    // 普通类型
    { type: 'selection', label: '选择', width: '80' },
    { type: 'index', label: '序号', width: '80' },
    { type: 'normal', label: '角色名称', prop: 'name', width: '150' },
    { type: 'normal', label: '权限介绍', prop: 'intro', width: '180' },

    // 使用作用域插槽的类型
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    // 最后的操作栏
    { type: 'handler', label: '操作', width: '180' }
  ]
}

export default contentConfig
