const Router = require('koa-router')
const socket = new Router({
  prefix: '/socket'
})

const ctrl = require('../controller/socket/index')

socket
  .all('/', ctrl.index)
  .post('/code', ctrl.code)

module.exports = socket
