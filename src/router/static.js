// import Layout from '~/views/layout/index'

export default [
  {
    path: '/',
    redirect: '/login',
    name: 'home'
  }, {
    path: '/login',
    component: () => import(/* webpackChunkName: "common" */ '~/views/login/index'),
    meta: { title: '用户登录' }
  }
]
