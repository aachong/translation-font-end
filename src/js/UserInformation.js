import axios from "axios";
import store from "../store/index"

function signUp(d) {
  const config = {
    url: "/api/user/add",
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
    url: "/api/user/in",
    method: "post",
    data: {
      name:d.name,
      password:d.password,
      phone:d.phone
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
    url: "/api/user/save",
    method: "post",
    data: {
      id:store.state.user.id,
      name:d.name,
      password:d.password,
      phone:d.phone,
      email:d.email,
      money:store.state.user.money,
      numberOrder:store.state.user.numberOrder,
      numberTranslate:store.state.user.numberTranslate,
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
    url: "/api/user/money",
    method: "post",
    data: {
      id:store.state.user.id,
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
    url: "/api/user/get",
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