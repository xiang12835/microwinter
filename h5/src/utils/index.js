/**
 * Created by Chelsea on 2020/04/08.
 */
function GetCookieDomain() {
  let host = location.hostname;
  // let ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  // if (ip.test(host) === true || host === 'localhost') return host;
  // let regex = /([^]*).*/;
  // let match = host.match(regex);
  // if (typeof match !== "undefined" && null !== match) host = match[1];
  // if (typeof host !== "undefined" && null !== host) {
  //   let strAry = host.split(".");
  //   if (strAry.length > 1) {
  //     host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
  //   }
  // }
  // return '.' + host;
  return host
}
export default {
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      // return true;
      return (arr[2]);
    } else {
      return ""
    }
  },
  delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  setCookie (name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+ "; domain=" + GetCookieDomain() + "; path=/";
  },
  //判断是否为空
  isNull(arg1) {
    return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
  },
  // 判断数值
  checkNum(data) {
    let regNum = /^[0-9]*$/;
    return regNum.test(data);
  },
  //判断数值
  checkMoney(data){
    let regNum = /^\d+(\.\d{1,2})?$/;
    return regNum.test(data);
  },
  // 判断手机号码
  checkPhoneNum(data) {
    let regNum = /^1\d{10}$/;
    return regNum.test(data);
  },
  contains(arr,id){
    for (let i in arr) {
      if (arr[i] == id) return true;
    }
    return false;
  },
  getQueryString(name){
    let reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    let result = window.location.href.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  },
  getUrlKey:function(name){
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  },
  setUploadFileName:function (fileName) {
    let timestamp = new Date().getTime();
    let pos = fileName.lastIndexOf(".");
    let lastname = fileName.substring(pos, fileName.length);
    return timestamp + lastname;
  },
  convertBase64UrlToBlob:function (urlData){
    let bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
  },
  timestampToTime:function (timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '/';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    let D = (date.getDate()<10 ? '0'+date.getDate():date.getDate()) + ' ';
    let h = (date.getHours()>9?date.getHours():('0'+date.getHours())) + ':';//date.getHours() + ':';
    let m = (date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes())) + ':';
    let s = (date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds()));//date.getSeconds();
    return Y+M+D+h+m+s;
  },
  checkUrl:function(){
    //let paths = window.location.href.split('#')
    //paths[1] = paths[1] || '/'
    //// 老式的#!分隔跳转
    //if (paths[0].charAt(paths[0].length - 1) !== '?') {
    //  paths[0] = `${paths[0]}?`
    //}
    //if (paths[1].charAt(0) === '!') {
    //  paths[1] = paths[1].substr(1)
    //}
    //let url = `${paths[0]}#${paths[1]}`
    //localStorage.setItem("rurl",url)
    //if (window.location.href !== url) {
    //  window.location.href = url
    //}
  },
  getNaturalWH:function(src){
    // 获取图片比例系数
    let img = new Image();
    img.src = src;
    if(img.complete){
      return img.width/img.height
    }else{
      img.onload = function(){
        return img.width/img.height
      };
    }
  },
  dateFormat:function (date, fmt) {
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate()
    };
    if(/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(let k in o)
      if(new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}
