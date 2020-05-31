import Jsonp from "jsonp";

function joinParams(url, params) {
  let str = "";
  // 拼接发送的数据
  for (const key in params) {
    str += `${key}=${params[key]}&`;
  }
  // 去除str最后的&字符 substring(第几个字符开始，要提取几个字符);
  str = str.substring(0, str.length - 1);

  // 判断url是否本来已有参数 有参数的情况下是已经有？字符
  str = url.indexOf("?") == -1 ? `?${str}` : `&${str}`;
  return `${url}${str}`;
}

/**
 *
 * @param {String} url
 * @param {Object} params
 */
export function get(url, params) {
  // 拼接url
  // url没有参数：url?callback=callBackFun
  // url有参数：url+&callback=callBackFun
  const options = {
    param: "callback",
    timeout: "10000",
    name: "callbackFun",
    prefix: "",
  };

  // 如果有数据发送
  if (params) {
    url = joinParams(url, params);
  }

  return new Promise((resolve, reject) => {
    Jsonp(url, options, (err, res) => {
      // if (err) {
      //   // alert(err);
      // } else {
      //   // alert(res);
      // }
      // console.log(res);
      // console.log(res);
      resolve(res);
      // if (res.data.code == 200) {
      //   resolve(res);
      // } else {
      //   reject(arr);
      // }
    });
  });
}
