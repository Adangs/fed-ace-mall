import Layout from '~/views/layout/index'

export default [
  {
    path: '/',
    redirect: '/login',
    name: 'home'
  }, {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'demo',
        component: () => import(/* webpackChunkName: "demo" */ '~/views/demo/index'),
        meta: { title: 'DEMO' }
      }]
  }, {
    path: '/login',
    name: '扫码登录',
    component: () => import(/* webpackChunkName: "demo" */ '~/views/login/index'),
    meta: { title: '扫码登录' }
  }, {
    path: '/mobile',
    name: '用户登录',
    component: () => import(/* webpackChunkName: "demo" */ '~/views/login/mobile'),
    meta: { title: '用户登录' }
  }
]
