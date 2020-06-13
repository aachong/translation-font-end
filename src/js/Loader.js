import store from "../store/index"
import * as User from "./UserInformation"
import * as Translator from "./Translator"

function UserUpLoader() {
  localStorage.userIsUsing = store.state.userIsUsing
  localStorage.id = store.state.user.id
}

function TranslatorUpLoader() {
  localStorage.translatorIsUsing = store.state.translatorIsUsing
  localStorage.id = store.state.translator.id
}

function ReLoader() {
  if (localStorage.userIsUsing) {
    User.get(localStorage.id).then(res => {
      userSignIn(res)
  
      
    })
  } else if (localStorage.translatorIsUsing) {
    Translator.get(localStorage.id).then(res=>{
      translatorSignIn(res)
    })
  }
}

function UserSave(res) {
  store.commit("addUser", {
    id: res.id,
    name: res.name,
    password: res.password,
    phone: res.phone,
    email: res.email,
    money: res.money,
    numberTranslate: res.numberTranslate,
    numberOrder: res.numberOrder
  })
}

function TranslatorSave(res) {
  store.commit("addTranslator", {
    id: res.id,
    name: res.name,
    password: res.password,
    phone: res.phone,
    email: res.email,
    money: res.money,
    numberOrder: res.numberOrder,
    rankSpeed: res.rankSpeed,
    rankSatisfaction: res.rankSatisfaction,
    rankPerson: res.rankPerson
  })
}

function userSignIn(res) {
  store.commit("addUser", res);
  store.commit("signIn")
  UserUpLoader();
}
function translatorSignIn(res) {
  store.commit("addTranslator", res);
  store.commit("signInTranslator")
  TranslatorUpLoader();
}
function SignOut() {
  store.commit("signOut")
  store.commit("delUser")
  store.commit("signOutTranslator");
  store.commit("delTranslator");
  localStorage.clear();
}
export { UserUpLoader, UserSave, ReLoader, TranslatorUpLoader, userSignIn,SignOut,translatorSignIn }