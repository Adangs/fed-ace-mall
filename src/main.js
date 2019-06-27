import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// global css
import './assets/style/index.scss'
// global request
import http from './utils/x-request'
// global filters
import * as filters from './utils/x-filters'
// global socket
import socket from './utils/x-socket'

// socket
Vue.use(socket)
// request
Vue.use(http)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI, { size: 'small' })

// 全局滚动事件
Vue.directive('xscroll', {
  bind(el, binding) {
    const container = el.attributes['x-scroll-container']
    const selectWrap = container ? el.querySelector(container.nodeValue) : el
    selectWrap.addEventListener('scroll', function() {
      const sign = el.attributes['xscroll-threshold'] ? el.attributes['xscroll-threshold'].nodeValue : 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        // console.log('滚动到底了')
        binding.value({ type: 'bottom', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      } else if (this.scrollTop <= 0) {
        // console.log('滚动到顶了')
        binding.value({ type: 'top', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      }
    })
  }
})

Vue.config.productionTip = false

// 开发环境添加性能检测工具
if (process.env.NODE_ENV !== 'production' && window.requestIdleCallback) {
  const FPS = require('./libs/fps-stats').Stats
  if (window.requestIdleCallback) {
    const stats = new FPS({
      top: 0,
      left: 0
    })
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom)
    const loop = () => {
      stats.update()
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
