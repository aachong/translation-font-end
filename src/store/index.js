import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import translator from './modules/translator'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsUsing: false,
    translatorIsUsing: false,
    isVip: false,
    timer: '1',
  },
  mutations: {
    Vip(state) {
      state.isVip = true
    },
    signOut(state) {
      state.userIsUsing = false
    },
    signIn(state) {
      state.userIsUsing = true
    },
    signInTranslator(state) {
      state.translatorIsUsing = true
    },
    signOutTranslator(state) {
      state.translatorIsUsing = false
    },
    changeTimer(state) {
      state.timer = new Date().getTime();
    }
  },
  actions: {
  },
  modules: {
    user, translator
  }
})
