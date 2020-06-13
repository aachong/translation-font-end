import axios from "axios";
import store from "../store/index"

export default function (str) {
  const config = {
    url: "/demo/"+str,
    method: "get",
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      let ans = res.data
      resolve(ans)
    });
  })
}

