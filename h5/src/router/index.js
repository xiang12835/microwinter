import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store.js" // 引入store 对象
Vue.use(Router)
// 引入公共方法
import utils from '../utils/index.js'
const RouterView = {
	template: '<router-view></router-view>'
}
const router = new Router({
	//mode: 'history',
	routes: [{
			path: '/',
			name: 'index',
			component: function(resolve) {
				require(['@/page/index'], resolve)
			},
			meta: {
				title: '首页',
			}
		},
		{
			path: '/test',
			name: 'test',
			component: function(resolve) {
				require(['@/page/test'], resolve)
			},
			meta: {
				title: '测试',
			}
		},
		{
			path: '/mine',
			name: 'mine',
			component: RouterView,
			children: [{
				path: 'index',
				name: 'mineIndex',
				component: function(resolve) {
					require(['@/page/mine/mine'], resolve)
				},
				meta: {
					title: '个人中心'
				}
			}]
		},
		{
			path: '/login',
			name: 'login',
			component: function(resolve) {
				require(['@/page/mine/login'], resolve)
			},
			meta: {
				title: '登录'
			}
		},
		{
			path: '/news',
			name: 'news',
			component: function(resolve) {
				require(['@/page/news/list'], resolve)
			},
			meta: {
				title: '财经要闻',
			}
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: function(resolve) {
				require(['@/page/news/detail'], resolve)
			},
			meta: {
				title: '新闻详情',
			}
		}
	]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		let cookieUserId = utils.getCookie('mUserId')
		let cookieOpenId = utils.getCookie('mOpenId')
		if ((cookieUserId || cookieUserId == 0) && cookieOpenId) {
			next()
		} else { // 没登录则跳转到登录界面
			next({
				path: '/manager/index',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next()
	}
})

export default router
