const state = {
  token: localStorage.token || '',
  userInfo: localStorage.userInfo || ''
}

const mutations = {
  setData(state, data) {
    // 本地存储
    localStorage.setItem('token', data.token)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    // vuex存储
    state.token = data.token
    state.userInfo = JSON.stringify(data.userInfo)
  },
  delData(state) {
    state.token = null
    state.userInfo = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }
}

const actions = {
  // 登录
  login({ commit }, payload) {
    return new Promise(resolve => {
      // 登录成功，写入 token 信息
      commit('setData', {
        token: payload.token,
        userInfo: payload
      })
      resolve()
    })
  },
  update(context, payload) {
    return new Promise(resolve => {
      // 登录成功，写入 token 信息
      context.commit('setData', {
        token: state.token,
        userInfo: payload
      })
      resolve()
    })
  },
  logout(context) {
    context.commit('delData')
  }
}

const getters = {
  isLogin: state => {
    return state.token
  },
  userInfo: state => {
    return state.userInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
