import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    guestId:'1',
    userId:'',
    openId: '',
    wx:{
      appId:"",
      timestamp:"",
      nonceStr:"",
      signature:""
    },
    userInfo:{
	  userId: '',
	  loginName: '',
	  avatar: '',
	  userName: '',
	  phonenumber: '',
	  remark: '我是一名程序员',
	  deptId: '',
	  dept: '',
	  role: '',
	  qrcode: '',
	  title: '',
	  postName: ''
    }
  },
  mutations : {
    // 账号登录
    changeLogin(state, datas) {
      for (let key in datas) {
        if (state.userInfo.hasOwnProperty(key)) {
          state.userInfo[key] = datas[key]
        }
        // localStorage.setItem(key, state.userInfo[key])

      }
      return state.userInfo
    },
  }
})

export default store
