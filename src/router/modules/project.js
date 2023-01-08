export default [
  {
    path: '/project',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: 'root' */ '@/views/home'),
    children: [
      {
        path: 'my',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: 'root' */ '@/views/project/my/index')
      },
      {
        path: 'template',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: 'root' */ '@/views/project/template/index')
      },
      {
        path: 'recycle',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: 'root' */ '@/views/project/recycle/index')
      }
    ]
  }
]
