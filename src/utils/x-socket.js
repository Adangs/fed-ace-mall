import IO from 'socket.io-client'

export default {
  install(Vue) {
    Vue.prototype.$socket = IO(process.env.VUE_APP_WS, {
      'reconnectionAttempts': 60,
      'transports': ['websocket']
    })
  }
}
