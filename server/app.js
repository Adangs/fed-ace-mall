// node.js server
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const cacheControl = require('koa-cache-control')
const historyFallback = require('koa2-history-api-fallback')
const views = require('koa-views')
const IO = require('koa-socket-2')
const koaLogger = require('koa-log4js')

// node 配置文件
const config = require('./config/index')

const app = new Koa()

app.use(bodyParser())
// 日志
app.use(koaLogger())

// x-response-time
app.use(async(ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// views to pug
app.use(views(__dirname, { extension: 'pug' }))

// favicon
// const favicon = require('./utils/x-favicon')
// app.use(favicon())

// 添加格式化处理响应结果的中间件，在添加路由之前调用
const XFormatter = require('./utils/x-formatter')
app.use(XFormatter('^/api|^/socket')) // 仅对/api开头的url进行格式化处理

// 路由规则
require('./routes')(app)

// vue historyApiFallback 配置
app.use(historyFallback())

// 缓存
app.use(cacheControl({
  public: true,
  maxAge: 600
}))

// 错误异常处理
app.on('error', (err, ctx) => {
  err && console.error(err)
  ctx.status = err.status || 500
  ctx.body = err.message
})
// 创建socket服务
const io = new IO()
io.attach(app)
// 暂时存放在全局
global.io = io.socket
const XSocket = require('./utils/x-socket')
XSocket(io.socket)

// 设置静态服务器资源
app.use(staticCache(path.join(__dirname, '../static'), {
  gzip: true,
  usePrecompiledGzip: /text|application/ig
}))

// 创建WEB服务
const port = config.port || 3000
app.listen(port, () => {
  console.log('Koa is listening in http://127.0.0.1:' + port)
})
