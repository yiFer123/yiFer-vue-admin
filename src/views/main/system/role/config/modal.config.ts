const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色描述',
      placeholder: '请输入查询的角色描述'
    },
    {
      type: 'custom',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
