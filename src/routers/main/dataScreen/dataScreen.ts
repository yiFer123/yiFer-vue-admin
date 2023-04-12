const dataScreen = () => import('@/views/main/dataScreen/index.vue')
export default {
  path: '/dataScreen',
  name: 'dataScreen',
  component: dataScreen,
  children: [],
  meta: {
    only: true
  }
}
