'use strict'

const socket = {
  async index(ctx, next) {
    // console.log(global.io)
    const body = ctx.request.body
    console.log(body)
    ctx.body = {
      'code': 200,
      'success': true,
      'body': {
        'name': '@name'
      }
    }
  },
  code(ctx, next) {
    const body = ctx.request.body
    const socket = global.io.to(body.id)
    console.log('扫码成功~')
    socket.emit('message', { a: +new Date() })
    ctx.body = {
      'code': 200,
      'success': true,
      'body': {}
    }
  }
}

module.exports = socket
