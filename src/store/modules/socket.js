// 全局socket状态
const socket = {
  namespaced: true,
  state: {
    id: null
  },
  mutations: {
    SET_ID: (state, data) => {
      state.id = data
    }
  },
  actions: {
    setId({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ID', data)
        resolve()
      })
    }
  }
}

export default socket
