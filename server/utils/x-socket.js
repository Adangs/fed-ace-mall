'use strict'
/**
 * Serve socket.io
 */

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('客户端新建连接成功 socket.id-> ', socket.id)

    io.to(socket.id).emit('message', socket.id)

    socket.on('open', data => {
      console.info(data)
    })

    socket.on('disconnect', () => {
      console.warn('服务器已断开连接, socket.id为-> ' + socket.id)
    })
  })
}
