const modalConfig = {
  pageName: 'users',
  header: {
    newTitle: '新建用户',
    editTitle: '编辑用户'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名称',
      placeholder: '请输入您喜欢的用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入您的真实姓名'
    },
    {
      type: 'password',
      prop: 'password',
      label: '密码',
      placeholder: '请输入您的密码'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '电话号码',
      placeholder: '请输入您的电话号码'
    },
    {
      type: 'select',
      prop: 'roleId',
      label: '选择角色',
      placeholder: '请选择您的角色',
      options: []
    },
    {
      type: 'select',
      prop: 'departmentId',
      label: '选择部门',
      placeholder: '请选择您的部门',
      options: []
    }
  ]
}

export default modalConfig
