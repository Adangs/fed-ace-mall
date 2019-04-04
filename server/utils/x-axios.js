const axios = require('axios')
// const qs = require('qs')

const http = options => {
  const params = Object.assign({
    timeout: 2000,
    method: 'POST'
  }, options)

  // create an axios instance
  const service = axios.create({
    timeout: params.timeout || 20000 // request timeout
  })
  // request interceptor
  service.interceptors.request.use(
    request => {
      return request
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
  // response interceptor
  service.interceptors.response.use(
    response => {
      return Promise.resolve(response)
    },
    err => {
      return Promise.reject(err)
    }
  )
  return service(options)
}

module.exports = http
