import axios from "axios";
import store from "../store/index"

function add(d) {
  const config = {
    url: "/api/evaluation/add",
    method: "post",
    data: {
      rankSatisfaction:d.rankSatisfaction,
      rankSpeed:d.rankSpeed,
      content:d.content,
      order:{
        id:d.id
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

function ulist(d) {
  const config = {
    url: "/api/evaluation/ulist",
    method: "post",
    data: {
      id:d
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function tlist(d) {
  const config = {
    url: "/api/evaluation/tlist",
    method: "post",
    data: {
      id:d
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}



export {add,ulist,tlist}