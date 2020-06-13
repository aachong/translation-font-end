import axios from "axios";
import store from "../store/index"

function addHistory(d) {
  const config = {
    url: "/api/hc/add/history",
    method: "post",
    data: {
      query:d.query,
      translation:d.translation,
      info:d.info,
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

function addCollection(d) {
  const config = {
    url: "/api/hc/add/collection",
    method: "post",
    data: {
      query:d.query,
      translation:d.translation,
      info:d.info,
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

function delCollection(d) {
  const config = {
    url: "/api/hc/del/collection",
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

function delAllCollection(d) {
  const config = {
    url: "/api/hc/del/allcollection",
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

function delAllHistory(d) {
  const config = {
    url: "/api/hc/del/history",
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

function getHistory() {
  const config = {
    url: "/api/hc/getuser/history",
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

function getCollection() {
  const config = {
    url: "/api/hc/getuser/collection",
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


export {addHistory,addCollection,delCollection,delAllHistory,delAllCollection,getHistory,getCollection}