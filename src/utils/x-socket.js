import IO from 'socket.io-client'
import store from '~/store'

export default {
  install(Vue) {
    const socket = options => {
      Object.assign({
        'reconnectionAttempts': 60,
        'transports': ['websocket']
      }, options)

      // const keyPathname = window.location.pathname
      const io = IO(process.env.VUE_APP_WS, {
        'reconnectionAttempts': 60,
        'transports': ['websocket']
      })

      // 连接成功
      io.on('connect', () => {
        console.log('连接成功-> ', io.id)
        // socket.id缓存在vuex
        store.dispatch('socket/setId', io.id)
      })

      // 成功重连
      io.on('reconnect', () => {
        console.log('成功重连-->', io.id)
        // socket.id缓存在vuex
        store.dispatch('socket/setId', io.id)
      })

      // 断开连接
      io.on('disconnect', () => {
        console.log('断开连接-->', io.id)
        // 断开链接时清除掉socket.id
        store.dispatch('socket/setId', null)
      })

      return io
    }

    Vue.prototype.$socket = socket
  }
}
