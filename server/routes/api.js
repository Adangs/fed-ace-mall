const Router = require('koa-router')
const api = new Router({
  prefix: '/api'
})

const ctrl = require('../controller/api/index')

api
  .all('/', ctrl.index)

module.exports = api
