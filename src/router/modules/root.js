export default [
  {
    path: '/login',
    meta: { requireLogin: false },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/index.vue')
  }
]
