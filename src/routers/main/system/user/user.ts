const user = () => import('@/views/main/system/user/user.vue')
export default {
  path: '/system/user',
  name: 'user',
  component: user,
  children: []
}
