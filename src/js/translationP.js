import axios from "axios";
import md5 from "js-md5";
import Qs from 'qs'

function truncate(q) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}


export default function (str, tolan = 'en') {
  var type = 1
  var from = 'auto';
  var to = tolan;
  var appKey = '07390235aa1df182';
  var salt = (new Date).getTime();

  var query = str;
  var key = 'klFp6m8sfrQFhWBtI43ezXwI9lUNio8O';//注意：暴露appSecret，有被盗用造成损失的风险

  var curTime = Math.round(new Date().getTime() / 1000);

  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'


  var str1 = appKey + query + salt + key;
  var sign = md5(str1);
  var data = {
    type: type,
    from: from,
    to: to,
    appKey: appKey,
    salt: salt,
    sign: sign,
    q: query,
    render:1
  }
  // console.log(str1);
  
  const config = {
    url: "/youdao/ocrtransapi",
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: Qs.stringify(data)

  };

  return new Promise(resolve => {
    axios(config).then(res => {
      resolve(res.data)
    });
  })

}