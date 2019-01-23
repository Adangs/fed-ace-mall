import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// iView ui
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// global css
import './assets/style/index.less'
// global request
import fetch from './utils/request'
// global filters
import * as filters from './utils/filters'

Vue.use(fetch) // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(iView)

// 全局滚动事件
Vue.directive('xscroll', {
  bind (el, binding) {
    const container = el.attributes['x-scroll-container']
    const selectWrap = container ? el.querySelector(container.nodeValue) : el
    selectWrap.addEventListener('scroll', function () {
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
