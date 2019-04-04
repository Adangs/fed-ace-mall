const api = require('./api')
const socket = require('./socket')

module.exports = (app) => {
  app.use(api.routes())
  app.use(socket.routes())
}
