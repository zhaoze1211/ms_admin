import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: {"isshow":false,"text":"拼命加载中"},
  user: ""
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.loading = status
    },
    UPDATE_USER (state, user) {
      state.user = user
    }
  }
})
