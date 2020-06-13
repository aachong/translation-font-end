import axios from "axios";
import store from "../store/index"

function add(d) {
  const config = {
    url: "/api/order/add",
    method: "post",
    data: {
      fromLanguage:d.fromLanguage,
      toLanguage:d.toLanguage,
      demand:d.demand,
      demandContent:d.demandContent,
      numberWord:d.numberWord,
      cost:d.cost,
      query:d.query,
      userInformation:{
        id:store.state.user.id
      }
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function accept(d) {
  const config = {
    url: "/api/order/modify",
    method: "post",
    data: {
      id: d,
      translator:{
        id:store.state.translator.id
      }
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function complete(d) {
  const config = {
    url: "/api/order/complete",
    method: "post",
    data: {
      id: d.id,
      translation:d.translation
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function get(d) {
  const config = {
    url: "/api/order/get",
    method: "post",
    data: {
      id: d
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function getUser() {
  const config = {
    url: "/api/order/user",
    method: "post",
    data: {
      id: store.state.user.id
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
    url: "/api/order/translator",
    method: "post",
    data: {
      id: store.state.translator.id
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function getIng() {
  const config = {
    url: "/api/order/ing",
    method: "post",
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

export {add,accept,complete,get,getUser,getIng,getTranslator}