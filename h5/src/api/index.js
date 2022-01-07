// 配置API接口地址
import {apiBase} from './base.js';
const qs = require('qs');

// 引用axios
let axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  let that = this
  if (params) {
    params = filterNull(params)
  }
  let baseURL = (url.indexOf("http")>0) ?  "" : apiBase().root
  let config;
  config = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: baseURL,
    withCredentials: false
  }
  axios(config)
    .then(function (res) {
      if (res.status == 200 && res.data !=null) {
        if (success) {
          success(res.data)
        }
      } else {
      }
    })
    .catch(function (err) {
      if(failure){
        failure(err)
      }else{
        // window.location.href = apiBase().url;
        console.log("api error: "+err)
      }

    })
}
function apiAxiosPostWithQs (method, url, params, success, failure) {
  let that = this
  if (params) {
    params = filterNull(params)
  }
  let baseURL = (url.indexOf("http")>0) ?  "" : apiBase().root
  let config;
  config = {
    method: method,
    url: url,
    data: qs.stringify(params),
    baseURL: baseURL,
    withCredentials: false
  }
  axios(config)
      .then(function (res) {
        if (res.status == 200 && res.data !=null) {
          if (success) {
            success(res.data)
          }
        } else {
        }
      })
      .catch(function (err) {
        if(failure){
          failure(err)
        }else{
          // window.location.href = apiBase().url;
          console.log("api error: "+err)
        }

      })
}
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    // return true;
    return (arr[2]);
  } else {
    return false
  }
}
// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  post1: function (url, params, success, failure) {
    return apiAxiosPostWithQs('POST', url, params, success, failure)
  },
  postpay: function (url, params, success, failure) {
    return apiAxios('POST',apiBase().payroot+url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
