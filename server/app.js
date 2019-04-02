// node.js server
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const staticCache = require('koa-static-cache')
const cacheControl = require('koa-cache-control')
const historyFallback = require('koa2-history-api-fallback')
const views = require('koa-views')
const IO = require('koa-socket-2')

// node 配置文件
const config = require('./config/index')

const app = new Koa()

app.use(bodyParser())
app.use(logger())

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

// 路由规则
// require('./server/routes')(app)

// vue historyApiFallback 配置
app.use(historyFallback())

// 设置静态服务器资源
app.use(staticCache(path.join(__dirname, '../static'), {
  gzip: true,
  usePrecompiledGzip: /text|application/ig
}))

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
const XSocket = require('./utils/x-socket')
const io = new IO()
io.attach(app)
XSocket(io)

// 创建WEB服务
const port = config.port || 3000
app.listen(port, () => {
  console.log('Koa is listening in http://172.0.0.1:' + port)
})
