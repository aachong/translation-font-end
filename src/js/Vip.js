import axios from "axios";
import store from "../store/index"

function add(d) {
  const config = {
    url: "/api/vip/add",
    method: "post",
    data: {
      endTime:d.endTime,
      status:1,
      cost:d.cost,
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
function renew(d) {
  const config = {
    url: "/api/vip/add",
    method: "post",
    data: {
      id:d.id,
      endTime:d.endTime,
      status:1,
      cost:d.cost,
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
function isVip() {
  const config = {
    url: "/api/vip/is",
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

function getUVip() {
  const config = {
    url: "/api/vip/get",
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


export {add,renew,isVip,getUVip}