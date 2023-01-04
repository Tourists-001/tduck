// 存放全局配置

const state = {
  reLogin: false
}

const mutations = {
  setReLogin(state, data) {
    state.reLogin = data.status
  }
}

const actions = {
  loginExpired({ commit }, status) {
    return new Promise(resolve => {
      commit('setReLogin', {
        status
      })
      resolve()
    })
  }
}

const getters = {
  isReLogin: state => {
    return state.reLogin
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
