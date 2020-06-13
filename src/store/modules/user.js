export default {
  state: {
    id: -1,
    name: 'unknown',
    password: 'unknown',
    phone: 'unknown',
    email: 'unknown',
    money: 0,
    numberTranslate: 0,
    numberOrder: 0
  },
  mutations: {
    addUser(state, ans) {
      state.id = parseInt(ans.id)
      state.name = ans.name
      state.password = ans.password
      state.phone = ans.phone
      state.email = ans.email
      state.money = parseInt(ans.money)
      state.numberOrder = ans.numberOrder
      state.numberTranslate = ans.numberTranslate
    },
    delUser(state) {
      state.id = -1
      state.name = 'unknown'
      state.password = 'unknown'
      state.email = 'unknown'
      state.phone = 'unknown'
      state.money = 0
      state.numberOrder = 0
      state.numberTranslate = 0
    },
    saveMoney(state,c){
      state.money = c
    }
  },
  actions: {
  },
  modules: {
  }
}