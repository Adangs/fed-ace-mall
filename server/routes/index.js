const socket = require('./socket')

module.exports = (app) => {
  app.use(socket.routes())
}
