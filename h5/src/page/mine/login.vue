<template>
<div class="main login">
	<img class="logo" src="../../assets/login/logo.png"/>
	<div class="input-div">
		<img class="img-top" src="../../assets/login/border.png" />
		<input class="account" id="account" placeholder="请输入帐号" v-model="loginName"/>
		<img class="img-bottom" src="../../assets/login/border.png" />
	</div>
	<div class="input-div">
		<img class="img-top" src="../../assets/login/border.png" />
		<input class="password" id="password" placeholder="请输入密码" v-model="password" />
		<img class="img-bottom" src="../../assets/login/border.png" />
	</div>
	
	<button class="login-btn" @click="doLogin"> 登录 </button>
</div>
</template>

<script>
	import {apiBase} from "../../api/base"
	export default {
		name: "login",
		data(){
			return{
				code:'',
				openId:'',
				loginName:'',
				password:''
			}
		},
		created() {
			// this.doWxAuth()
		},
		methods:{
			doWxAuth(){
				//判断当前用户是否微信登录授权，如果没有需要授权
				let that = this
				let url = window.location.href
				let cookieUserId = that.$utils.getCookie('mUserId')
				let cookieOpenId = that.$utils.getCookie('mOpenId')
				if(that.$utils.isNull(cookieUserId)||that.$utils.isNull(cookieOpenId)||cookieUserId=="undefined"||cookieOpenId=="undefined"){
					// 微信登录授权
					if(localStorage.getItem('goWXAuth')=='0'){
						// 获取openId
						let s1='',s2=''
						if(url.indexOf("?")>0){
							s1 = url.split("?")[1]
							if(s1.indexOf("&")>0){
								let arr = s1.split('&')
								for(let i=0;i<arr.length;i++){
									if(arr[i].indexOf('code=')>=0){
										s2 = arr[i].replace("code=","")
										break
									}
								}
							}
						}
						if(s2==''){
							localStorage.setItem('goWXAuth','0')
							let thisUrl = window.location.href.split('?')[0];
							window.location.href = apiBase().auth +"?client_id="+apiBase().appid+"&response_type=code&redirect_uri="+escape(apiBase().url+"/#/login")+"&appid="+apiBase().appid+"&scope=snsapi_base"
							return
						}
						that.code = s2
						that.$api.get('/h5/studio/v1/getOpenId',{code:s2},r7=>{
							if(r7.code==0){
								console.log("getUserInfoByOpenId0");
								localStorage.removeItem('goWXAuth')
								that.openId = r7.data;
							}else{
								that.$toast(r7.msg)
							}
						})

					}else{
						localStorage.setItem('goWXAuth','0')
						let thisUrl = window.location.href.split('?')[0];
						window.location.href = apiBase().auth +"?client_id="+apiBase().appid+"&response_type=code&redirect_uri="+escape(apiBase().url+"/#/login")+"&appid="+apiBase().appid+"&scope=snsapi_base"
						return
					}
				}
			},
			doLogin(){
				let that = this
				that.$api.get('/h5/studio/v1/doLogin',{"loginName":that.loginName,"password":that.password,"openId":that.openId},r1=>{
					console.log(r1);
					if (r1.code=="0") {
						that.$toast('登录成功');
						const mUserId = r1.data;
						const mOpenId = that.openId;
						that.$utils.setCookie('mUserId',mUserId,365)
						that.$utils.setCookie('mOpenId',mOpenId,365)
						that.$store.state.userId = mUserId
						that.$store.state.openId = mOpenId
						this.getUserInfoById(mUserId)
						this.$router.replace('/')
					}else{
						that.$toast('该账号有问题，请联系管理员');
						return;
					}
				})
			},
			getUserInfoById(mUserId) {
				let that = this;
				that.$api.get('/product/v1/getUserById?userId=' + mUserId, {}, r => {
					this.$store.commit('changeLogin', r);
				})
			}


		}
	}
</script>

<style>
	.login.main{
	  width: 18.75rem;
	  height: 100%;
	  background: url(../../assets/login/back.png) no-repeat;
	  background-size:100% 100%;
	  display: flex;
	  align-items: center;
	  flex-direction:column;
	}
	.login .logo{width: 6.6rem;height: 2.6rem;margin:5rem auto;}
	.login .input-div{
		text-align: center;
		margin-bottom: 0.8rem;
		height: 2.6rem;
		display: flex;
		align-items: center;
		flex-direction:column;
	}
	.login .input-div img{width:10rem;}
	.login .input-div .img-top{vertical-align: bottom}
	.login .input-div .img-bottom{vertical-align: top}
	.login .input-div input{
		width: 15rem;
		height: 2.5rem;
		background-color:rgba(67,191,177,0.2);
		border-radius: 1.25rem;
		border:none;
		color: #FFFFFF;
		font-size: 0.8rem;
		padding: 0 1rem;
	}
	.login .input-div input::-webkit-input-placeholder{
		color: #b4fff6;
		text-align: center;
		font-size: 0.7rem;
		
	}
	.login .login-btn{
		width: 15rem;
		height: 2.5rem;
		background-color: #ffffff;
		border-radius: 1.25rem;
		font-size: 0.8rem;
		color: #00744c;
	}
	.login .desc{
		width: 10.8rem;
		height: 1.6rem;
		font-family: Microsoft YaHei;
		font-size: 0.6rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.8rem;
		letter-spacing: 0rem;
		color: #b4fff6;
		margin-top: 0.8rem;
		text-align: center;
		
	}
</style>
