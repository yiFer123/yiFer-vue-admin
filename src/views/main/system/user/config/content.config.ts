const contentConfig = {
  pageName: 'users',
  header: {
    // title: '用户列表',
    btnTitle: '新建用户'
  },
  propsList: [
    // 普通类型
    { type: 'selection', label: '选择', width: '50', align: 'center' },
    { type: 'index', label: '序号', width: '80', align: 'center' },
    { type: 'normal', label: '用户名', prop: 'name', width: '150' },
    { type: 'normal', label: '真实姓名', prop: 'realname', width: '100' },
    { type: 'normal', label: '手机号码', prop: 'cellphone', width: '180' },

    // 状态
    { type: 'enable', label: '状态', prop: 'enable', width: '120', align: 'center' },

    // 使用作用域插槽的类型
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '200' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '200' },

    // 最后的操作栏
    { type: 'handler', label: '操作', width: '180' }
  ]
}

export default contentConfig
