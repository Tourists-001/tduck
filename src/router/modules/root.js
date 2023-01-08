export default [
  {
    path: '/redirect/:type',
    meta: { requireLogin: false },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/redirect.vue')
  },
  {
    path: '/login',
    meta: { requireLogin: false },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/index.vue')
  },
  {
    path: '/forget/password',
    meta: { requireLogin: false },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/account/ForgetPwd')
  },
  {
    path: '/',
    meta: { requireLogin: false },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/home/index')
  },
  {
    path: '/home',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/home'),
    children: [
      {
        path: '/',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: 'root' */ '@/views/project/my/index.vue')
      },
      {
        path: 'member',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/member')
      }
    ]
  }
]
