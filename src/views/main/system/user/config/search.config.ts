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
      label: '用户名',
      placeholder: '请输入查询的用户名',
      initialValue: 'initial默认角色,可删除'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态查询',
      placeholder: '请选择查询的状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
