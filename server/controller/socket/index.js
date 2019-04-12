'use strict'

const socket = {
  async index(ctx, next) {
    // console.log(global.io)
    // const body = ctx.request.body
    // console.log(body)
    ctx.body = {
      'random': Math.random()
    }
  },
  // 扫码接口
  code(ctx, next) {
    const body = ctx.request.body
    const socket = global.io.to(body.id)
    console.log('扫码成功~')
    socket.emit('success', { status: Math.floor(Math.random() * 4 + 1) })
    ctx.body = true
  }
}

module.exports = socket
