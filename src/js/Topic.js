import axios from "axios";
import store from "../store/index"

function getAllTopic() {
  const config = {
    url: "/api/topic/all",
    method: "get",
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function delTopic(i) {
  const config = {
    url: "/api/topic/del",
    method: "post",
    data: {
      id: i
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function addTopic(t) {
  const config = {
    url: "/api/topic/add",
    method: "post",
    data: {
      title: t.title,
      content: t.content,
      userInformation: {
        id: store.state.user.id
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

function getTopic(i) {
  const config = {
    url: "/api/topic/id",
    method: "post",
    data: {
      id: i
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function allContent(i) {
  const config = {
    url: "/api/topic/allcontent",
    method: "post",
    data: {
      "id": i
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function addContent(c) {
  const config = {
    url: "/api/topic/addcontent",
    method: "post",
    data: {
      content: c.content,
      userInformation: {
        id: store.state.user.id
      },
      topic: {
        id: c.id
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

function delContent(i) {
  const config = {
    url: "/api/topic/delcontent",
    method: "post",
    data: {
      id: i
    }
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function findByT(i) {
  let url = "/api/topic/find/" + i
  const config = {
    url: url,
    method: "get",
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}

function findByW(i) {
  let url = "/api/topic/findw/" + i
  const config = {
    url: url,
    method: "get",
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data.result
      resolve(ans)
    });
  })
}
export {getAllTopic, getTopic, delTopic, addTopic, allContent, addContent, delContent, findByT, findByW }