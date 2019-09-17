export const state = () => ({
  isAuthenticated: false
})

export const mutations = {
  setAuthenticated (state, authenticated) {
    state.isAuthenticated = authenticated
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    const hasToken = !!app.$apolloHelpers.getToken()
    if (hasToken) {
      commit('setAuthenticated', hasToken)
    }
  }
}
