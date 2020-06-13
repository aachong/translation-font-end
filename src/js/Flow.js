import axios from "axios";
import store from "../store/index"

function getUser() {
  const config = {
    url: "/api/flow/user",
    method: "post",
    data: {
      id:store.state.user.id
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function getTranslator() {
  const config = {
    url: "/api/flow/translator",
    method: "post",
    data: {
      id:store.state.translator.id
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

export {getUser,getTranslator}