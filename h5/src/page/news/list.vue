<template>
	<div class="main">
		<!--<NavBar title="财经要闻" />-->

		财经要闻内容

		<GoBack />
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import GoBack from "../../components/GoBack";

	export default {
		name: "nlist",
		components: {
			GoBack,
			NavBar
		},
		data: function() {
			return {
				newsList: [],
				checkList: [],
				showCheckBox: false,
				newsIds: "",
				cate: "",
				topic: "",
				time: "",
				cateFilter: [],
				topicFilter: [],
				timeFilter: []
			}
		},
		created() {
			this.getNews()
			this.getNewsFilterData()
		},
		methods: {
			start () {
				clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
				this.loop = setTimeout(() => {
					console.log("长按了");
					this.toEdit();
				}, 1000);

			},
			end () {
				clearTimeout(this.loop); //清空定时器，防止重复注册定时器
			},
			handleCateChange(value) {
				console.log(value)
				this.cate = value
				this.getNews()
			},
			handleTopicChange(value) {
				this.topic = value
				this.getNews()
			},
			handleTimeChange(value) {
				this.time = value
				this.getNews()
			},

			handleCheckedListChange(value) {
				console.log('value==>', value)
			},

			toEdit() {
				this.showCheckBox = !this.showCheckBox
			},

			getNewsFilterData() {
				let that = this
				that.$api.get('/product/v1/news/filter_list', {}, r => {
					that.cateFilter = r.cateFilter
					that.topicFilter = r.topicFilter
					that.timeFilter = r.timeFilter
				})
			},

			getNews() {
				let that = this
				// 获取财经要闻列表
				that.$api.get('/product/v1/news_list/by_filter', {
					pageNum: 1,
					pageSize: 10,
					cate: that.cate,
					topic: that.topic,
					time: that.time,
				}, r => {
					that.newsList = r
				})
			},
			goNewsDetail(id) {
				this.$router.push('/detail/' + id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		width: 18.75rem;
		overflow-x: hidden;
		overflow-y: auto;
		margin: 0 auto;
		background: #f8f8f8;
	}

	.preview-btn {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.13);
		bottom: 3rem;
		bottom: calc(3rem + constant(safe-area-inset-bottom));
		bottom: calc(3rem + env(safe-area-inset-bottom));
		right: .75rem;
		width: 40px;
		height: 40px;
		border-radius: 15px;
		z-index: 99;
	}

	.el-row {
		/*margin-top: 40px;*/
	}

	.checkbox-related {
		position:absolute;
		z-index: 99;
	}

	.newsbox {
		padding: .75rem;
		margin-top: 10px;
		margin-bottom: 30px;

		.title {
			font-size: 18px;
			color: #333;
			padding-bottom: 1rem;
		}

		.news {
			height: 4.75rem;
			position: relative;
			padding-bottom: .75rem;

			&:after {
				content: "";
				border-bottom: 1px solid #EEEEEE;
				width: 100%;
				bottom: 0;
				left: 0;
				position: absolute;
			}

			img {
				width: 6rem;
				height: 4rem;
				margin-left: .75rem;
				border-radius: 4px;
			}

			.name {
				height: 3rem;
				line-height: 1rem;
				overflow: hidden;
				font-size: 18px;
				color: #3E3D40;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-break: break-all;
			}

			.desc {
				line-height: 1rem;
				font-size: 14px;
				color: #999;

				.flex {
					+.flex {
						/*text-align: right;*/
						/*padding-right: rem;*/
					}
				}
			}

			+.news {
				margin-top: .75rem;
			}
		}

	}
</style>
