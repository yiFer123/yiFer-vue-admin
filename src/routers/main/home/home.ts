const home = () => import('@/views/main/home/home.vue')
export default {
  path: '/home',
  name: 'home',
  component: home,
  children: [],
  meta: {
    only: true
  }
}
