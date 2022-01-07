<template>
	<div class="main">
		<NavBar title="首页" />
		<p style="margin: 50px 10px">Hello World!</p>
	</div>
</template>

<script>
	import {
		apiBase
	} from "../api/base"
	import wx from 'weixin-js-sdk'

	import NavBar from '../components/NavBar.vue'

	export default {
		name: "index",
		components: {
			NavBar
		},
		data: function() {
			return {
				userId: '',
				openId: '',
				userInfo: null
			}
		},
		computed: {
			stateUserId() {
				return this.$store.state.userId;
			},
			stateUserInfo() {
				return this.$store.state.userInfo;
			}
		},
		created() {
			this.userId = this.stateUserId;
			this.userInfo = this.stateUserInfo;

			if (!this.userId) {
				if (this.checkLoginStatus()) { // 理财经理
					let cookieUserId = this.$utils.getCookie('mUserId');
					this.userId = cookieUserId;
					this.$store.state.userId = cookieUserId;
				} else { // 游客模式
					this.userId = this.$store.state.guestId;
				}
			}
		},
		methods: {
			checkLoginStatus() {
				let cookieUserId = this.$utils.getCookie('mUserId');
				let cookieOpenId = this.$utils.getCookie('mOpenId');

				return !!cookieUserId && !!cookieOpenId;
			},
			getQS(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let result = this.$route.fullPath.replace('/speedloan', '').substr(1).match(reg);
				return result ? decodeURIComponent(result[2]) : null;
			},
			getHotNewsList(that) {
				// 获取最热新闻
				that.$api.get('product/v1/news_hot_list',{}, r => {
					that.hotNewsList = r
				})
			},
			toNewsList(){
				this.$router.push('/news')
			},
			toNewsDetail(id){
				this.$router.push('/detail/' + id)
			},
		}
	}
</script>

<style lang="less" scoped>

</style>