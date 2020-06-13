import axios from "axios";
import Qs from 'qs'

function truncate(q) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export default function (str, tolan = 'en') {
  var sha256 = require("js-sha256").sha256
  var appKey = '0c288916717d38d3';
  var key = 'ZgP4hyjwim2p33GgtO2O1LGW94DfYAz9';//注意：暴露appSecret，有被盗用造成损失的风险
  var salt = (new Date).getTime();
  var curTime = Math.round(new Date().getTime() / 1000);
  var query = str;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'auto';
  var to = tolan;

  var str1 = appKey + truncate(query) + salt + curTime + key;
  // console.log(str1);
  var sign = sha256(str1);

  var data = {
    q: query,
    appKey: appKey,
    salt: salt,
    from: from,
    to: to,
    sign: sign,
    signType: "v3",
    curtime: curTime,
  }
  const config = {
    url: "/youdao/api",
    method: "post",

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: Qs.stringify(data)
  };

  return new Promise(resolve => {
    axios(config).then(res => {
      console.log(res.data);

      resolve(res.data)
    });
  })

}