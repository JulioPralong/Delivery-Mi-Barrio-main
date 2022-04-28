import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isLogin: "",
    miBarrio: {}
  },
  getters: {
  },
  mutations: {
    setUser( state, user ){
      state.user = user
    },
    setIsLogin( state, status ){
      state.isLogin = status
    }
  },
  actions: {
  },
  modules: {
  }
})
