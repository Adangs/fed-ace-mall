/**
 * 在app.use(router)之前调用
 */
const formatter = (ctx) => {
  ctx.body = {
    success: ctx.success === undefined ? true : ctx.success,
    msg: ctx.msg === undefined ? 'ok' : ctx.msg,
    body: ctx.body || {}
  }
}

module.exports = (pattern) => {
  return async(ctx, next) => {
    try {
      await next() // 先去执行路由
    } catch (err) {
      throw err // 继续抛，让外层中间件处理日志
    }

    // 通过正则的url进行格式化处理
    const reg = new RegExp(pattern)
    if (reg.test(ctx.originalUrl)) {
      formatter(ctx)
    }
  }
}

