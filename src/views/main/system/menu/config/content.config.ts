const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表，树形子树',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '150' },
    { label: '级别', prop: 'type', width: '100' },
    { label: '菜单url', prop: 'url', width: '120' },
    { label: '菜单icon', prop: 'icon', width: '200' },
    { label: '排序', prop: 'sort', width: '120' },
    { label: '权限', prop: 'permission', width: '120' },

    // 使用作用域插槽的类型
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    // 最后的操作栏
    { type: 'handler', label: '操作', width: '120' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
