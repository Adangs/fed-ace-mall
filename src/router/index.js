import Vue from 'vue'
import Router from 'vue-router'
import Layout from '~@/views/layout/index'

Vue.use(Router)

export const routerMap = [
  {
    path: '/',
    redirect: '/login',
    name: 'home'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "common" */ '~@/views/login/index'),
    meta: { title: '用户登录' }
  },
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'demo',
        component: () => import(/* webpackChunkName: "common" */ '~@/views/demo/index'),
        meta: { title: 'DEMO' }
      }]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerMap
})
