// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import store from "./store/store.js"  // 引入共同变量
Vue.prototype.$store = store

// 引入api
import api from './api/index.js'
Vue.prototype.$api = api

// 引入分享
import wxshare from './libs/share.js'
Vue.prototype.$wxshare = wxshare

// 引入公共方法
import utils from './utils/index.js'
Vue.prototype.$utils = utils

// 引入rem设置
// import '../static/js/bq-flexible.js'

// 引入共同提示弹窗
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, {})

// 引用axios
let axios = require('axios')
import wx from 'weixin-js-sdk'

// 分享
Vue.prototype.$myWxShare = function (shareTitle,shareLink,shareDesc,shareImg) {
  var that = this

  if (!shareTitle) {
    shareTitle = "xxx"
  }
  if (!shareLink) {
    shareLink = 'https://xx.yy.com'
  }
  if (!shareImg) {
    shareImg = ''
  }
  if (!shareDesc) {
    shareDesc = "xxx"
  }


  const fromurl = window.location.href.split('#')[0];

  // 获得签名配置
  var base_url = "https://www.xxx.club/api/wx/share_page/signature?appId=youropenid&pageUrl="+encodeURIComponent(fromurl)

  axios.get(base_url).then((res) => {
    var Data = res.data.result;

    console.log('Data==>', Data)
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId:'youropenid',  // 必填，公众号的唯一标识
      timestamp: Data.timestamp, // 必填，生成签名的时间戳
      nonceStr: Data.nonceStr,   // 必填，生成签名的随机串
      signature: Data.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  });
  wx.ready(() => {
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    // 则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: shareTitle, // 分享标题
      desc: shareDesc,   // 分享描述
      link: shareLink,   // 分享链接 默认以当前链接
      imgUrl: shareImg,// 分享图标
      // 用户确认分享后执行的回调函数
      success: function () {
        console.log('分享成功！');
        that.$toast('分享成功！');
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('取消分享！');
        that.$toast('取消分享！');
      }
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      desc: shareDesc,
      link: shareLink,
      imgUrl: shareImg,
      // 用户确认分享后执行的回调函数
      success: function () {
        console.log('分享成功！');
        that.$toast('分享成功！');
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('取消分享！');
        that.$toast('取消分享！');
      }
    });
  });
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

/*
 *  Created by cy on 2016/9/21
 *  please don't make any updates unless you know what you are doing
 *  the following codes will flexible all kind of devices whose width are between 320px and 750px
 */
//mobile width and meta settings
var settingREM = function(){
  //var dpr, rem, scale;
  var docEl = document.documentElement;
  var fontEl = document.createElement('style');
  //var metaEl = document.querySelector('meta[name="viewport"]');
  //dpr = window.devicePixelRatio || 1;
  //scale = 1 / dpr;
  //rem = docEl.clientWidth * dpr / 10;
  docEl.firstElementChild.appendChild(fontEl);
  if(docEl.clientWidth<=750){
    fontEl.innerHTML = 'html{font-size:' + docEl.clientWidth/375*20 + 'px!important;}';
  }else{
    fontEl.innerHTML = 'html{font-size:' + 40 + 'px!important;}';
  }
};
settingREM();
window.onresize=function(){
  setTimeout(settingREM,100);
};
