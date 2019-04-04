'use strict'
const request = require('request').defaults({ jar: true })
// https://github.com/cheeriojs/cheerio
const cheerio = require('cheerio')

const api = {
  async index(ctx, next) {
    const body = ctx.request.body
    // 服务ip
    body.ip = '192.168.2.242'
    // 返回前端的数据
    const store = {}
    // 基础参数
    const options = {
      url: `http://${body.ip}/cgi-bin/luci/`,
      headers: ctx.headers,
      form: {
        luci_username: 'root',
        luci_password: 'abcde54321'
      }
    }
    // 登录成功后，获取cookie
    const cookie = await new Promise((resolve, reject) => {
      request(options, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          return resolve(res.request.headers.cookie)
        }
      })
    })
    // 如果无cookie，那么通知前端处理失败
    if (!cookie) {
      console.error('获取cookie失败')
      return ctx.body = { code: 1001, success: false, msg: '获取cookie失败' }
    } else {
      // 格式化cookie
      store.cookie = cookie.split('=')[1]
    }

    // 获取token
    const token = await new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `http://${body.ip}/cgi-bin/luci/admin/status/processes`,
        headers: Object.assign(ctx.headers, { Cookie: cookie })
      }, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          // 查找是否已经启动dropbear 服务
          if (body.indexOf('dropbear') !== -1) {
            return resolve(false)
          } else {
            // 格式化body内容，通过jq方式查找页面元素内容
            // https://github.com/cheeriojs/cheerio
            const $ = cheerio.load(body)
            const token = $('input[name="token"]').val()
            return resolve(token)
          }
        }
      })
    })
    // 校验token
    if (token) {
      store.token = token
    } else {
      console.error('服务已经存在')
      return ctx.body = { code: 1002, success: false, msg: '服务已经存在' }
    }

    // 添加 Dropbear
    const addKey = await new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `http://${body.ip}/cgi-bin/luci/admin/system/admin`,
        // headers: { Cookie: cookie },
        formData: {
          'token': store.token,
          'cbi.submit': 1,
          'cbi.cts.dropbear.dropbear.': 'Add'
        }
      }, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          // console.log(res.request.headers)
          // 格式化body内容，通过jq方式查找页面元素内容
          // https://github.com/cheeriojs/cheerio
          const $ = cheerio.load(body)
          const key = $('#cbi-dropbear input').eq(0).attr('name')
          const name = key.split('.')
          return resolve(name[name.length - 1])
        }
      })
    })
    // console.log(addKey)
    // Save & Apply
    const save = await new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `http://${body.ip}/cgi-bin/luci/admin/system/admin`,
        // headers: { Cookie: cookie },
        formData: {
          'token': store.token,
          'cbi.submit': 1,
          [`cbid.dropbear.${addKey}.Port`]: 22,
          [`cbi.cbe.dropbear.${addKey}.PasswordAuth`]: 1,
          [`cbid.dropbear.${addKey}.PasswordAuth`]: 'on',
          [`cbi.cbe.dropbear.${addKey}.RootPasswordAuth`]: 1,
          [`cbid.dropbear.${addKey}.RootPasswordAuth`]: 'on',
          [`cbi.cbe.dropbear.${addKey}.GatewayPorts`]: 1,
          'cbi.apply': 'Save & Apply'
        }
      }, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          // console.log(res.statusCode)
          return resolve(res.statusCode)
        }
      })
    })
    // 提交失败
    if (save !== 200) {
      console.error('Save Apply Error!')
      return ctx.body = { code: save, success: false, msg: 'Save Apply Error!' }
    }
    // apply_rollback
    const apply = await new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `http://${body.ip}/cgi-bin/luci/admin/uci/apply_rollback`,
        form: {
          sid: store.cookie,
          token: store.token
        }
      }, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          return resolve(res.statusCode)
        }
      })
    })
    // apply_rollback 失败
    if (apply !== 200) {
      return ctx.body = { code: apply, success: false, msg: 'apply_rollback Error!' }
    }
    // confirm
    const confirm = await new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `http://${body.ip}/cgi-bin/luci/admin/uci/confirm`,
        form: {
          sid: store.cookie,
          token: store.token
        }
      }, (error, res, body) => {
        if (error) {
          return reject(error)
        } else {
          return resolve(res.statusCode)
        }
      })
    })
    // confirm 失败
    if (confirm !== 200) {
      console.error('confirm Error!')
      return ctx.body = { code: confirm, success: false, msg: 'confirm Error!' }
    }
    console.info('执行成功~')
    ctx.body = { code: 200, success: true, body: store, msg: '执行成功~' }
  }
}

module.exports = api
