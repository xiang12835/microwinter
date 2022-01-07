<template>
	<div class="main">
		<!--<NavBar title="财经要闻"/>-->
		<div class="title">{{financialNewsTitle}}</div>
		<div class="desc flex-row"><span class="flex">{{createTime}}</span></div>
		<div class="content" v-html="financialNewsContent"></div>
		<GoBack />
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import GoBack from "../../components/GoBack";

	export default {
		name: "detail",
		components: {
			GoBack,
			NavBar,
		},
		data() {
			return {
				id: this.$route.params.id,
				financialNewsTitle: '',
				financialNewsContent: '',
				userInfo: null,
				userId: '',
				createTime:''
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
			this.userId=this.stateUserId;
			this.userInfo = this.stateUserInfo;
			this.getNewsDetail()
		},
		methods: {

			getNewsDetail() {
				let that = this
				that.isUpload = true
				that.$api.get('/product/v1/news_detail?newId=' + that.id, {}, r => {
					that.financialNewsTitle = r.financialNewsTitle
					that.financialNewsContent = r.financialNewsContent
					that.createTime=r.createTime
					that.isUpload = false
					that.getPerson(that);
				})
			},
			getPerson(that) {
				that.$api.get('/product/v1/getUserById?userId=' + that.userId, {}, r => {
					// 分享
					var shareLink = window.location.href;
					var shareTitle = that.financialNewsTitle;
					var shareImg = r.avatar
					that.$wxshare(that, shareTitle, shareLink, '', shareImg);
					// that.$myWxShare(shareTitle,shareLink,'',shareImg)

				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.main {
		width: 18.75rem;
		padding: .75rem;

		.title {
			/*margin-top: 50px;*/
			font-size: 20px;
			color: #000;
			text-align: left;
			margin-bottom: .5rem;
		}

		.desc {
			line-height: 1rem;
			font-size: 18px;
			color: #999;
		}

		.content {
			font-size: 14px;
			line-height: 22px;
			color: #333;
			margin-bottom: .5rem;

			img {
				width: 100%;
			}
		}
	}
</style>
