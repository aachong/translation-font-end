import axios from "axios";
import store from "../store/index"

function signUp(d) {
  const config = {
    url: "/api/translator/add",
    method: "post",
    data: {
      name:d.name,
      password:d.password,
      phone:d.phone,
      email:d.email
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function signIn(d) {
  const config = {
    url: "/api/translator/in",
    method: "post",
    data: {
      name:d.name,
      password:d.password,
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function save(d) {
  const config = {
    url: "/api/translator/save",
    method: "post",
    data: {
      id:store.state.translator.id,
      name:d.name,
      password:d.password,
      phone:d.phone,
      email:d.email,
      money:store.state.translator.money,
      numberOrder:store.state.translator.numberOrder,
      rankSpeed:store.state.translator.rankSpeed,
      rankSatisfaction:store.state.translator.rankSatisfaction,
      rankPerson:store.state.translator.rankPerson
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function money(d) {
  const config = {
    url: "/api/translator/money",
    method: "post",
    data: {
      id:store.state.translator.id,
      money:d
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}
function get(i) {
  const config = {
    url: "/api/translator/get",
    method: "post",
    data: {
      id:i
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

export {signUp,signIn,save,money,get}