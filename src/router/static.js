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
    component: () => import(/* webpackChunkName: "common" */ '~/views/login/index'),
    meta: { title: '用户登录' }
  }
]
