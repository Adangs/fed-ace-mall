export default {
  loading: state => state.app.loading,

  token: state => state.user.token,
  roles: state => state.user.roles,

  socketId: state => state.socket.id
}
