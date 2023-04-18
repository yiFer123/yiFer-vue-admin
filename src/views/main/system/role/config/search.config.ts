const searchConfig = {
  headers: {
    left: '数据筛选',
    right: '作用域插槽'
  },
  labelWidth: '80px',
  layouts: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称',
      initialValue: '默认角色'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入查询的权限介绍'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
