'use strict'

/**
 * Module dependencies.
 */
const request = require('request')
const resolve = require('path').resolve
const fs = require('fs')

/**
 * Serve favicon.ico
 *
 * @param {String} path
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

module.exports = function(options) {
  const path = resolve(process.cwd() + '/static/favicon/alibaba.ico')
  // const path = resolve(process.cwd() + '/static/favicon/okminer.ico')
  let icon

  // 下载远程文件到本地
  const createWriteStream = (path) => {
    return new Promise(async(resolve, reject) => {
      try {
        // 请求API接口获取到用户ico地址然后下载到本地
        await request('https://www.alibaba.com/favicon.ico').pipe(
          fs.createWriteStream(path).on('finish', () => {
            // 文件下载好后回调
            return resolve()
          })
        )
      } catch (e) {
        reject()
      }
    })
  }

  // 获取本地文件
  const readFile = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, async(err, data) => {
        if (err) {
          // 未获取到本地图片，去远程进行下载
          await createWriteStream(path)
          // 再次获取本地文件返回
          return resolve(await readFile(path))
        }
        // 首次获取成功直接返回
        resolve(data)
      })
    })
  }

  return async(ctx, next) => {
    if (ctx.path !== '/favicon.ico') {
      return next()
    }
    icon = await readFile(path)
    ctx.type = 'image/x-icon'
    ctx.body = icon
  }
}
