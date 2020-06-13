export default {
  state: {
    id: -1,
    name: 'unknown',
    password: 'unknown',
    email: 'unknown',
    phone: 'unknown',
    money: 0,
    numberOrder:0,
    rankSpeed:0.0,
    rankSatisfaction:0.0,
    rankPerson:0,
    
  },
  mutations: {
    addTranslator(state, ans) {
      state.id = parseInt(ans.id)
      state.name = ans.name 
      state.password = ans.password
      state.email = ans.email
      state.phone = ans.phone
      state.money = parseInt(ans.money)
      state.numberOrder = parseInt(ans.numberOrder)
      state.rankSpeed = parseFloat(ans.rankSpeed)
      state.rankSatisfaction = parseFloat(ans.rankSatisfaction)
      state.rankPerson = parseFloat(ans.rankPerson)

    },
    delTranslator(state) {
      state.id = -1
      state.name = 'unknown'
      state.password = 'unknown'
      state.email = 'unknown'
      state.phone = 'unknown'
      state.money = 0
      state.numberOrder = 0
      state.rankSpeed = 0
      state.rankSatisfaction = 0
      state.rankPerson = 0
    },
    saveMoneyT(state,c){
      state.money = c
    }
  },
  actions: {
  },
  modules: {
  }
}