import Vue from 'vue'
import Router from 'vue-router'
import banner from '~/common/banner'
import  head  from '~/common/footer'
// import Rem from '../../static/rem'
Vue.use(Router)
const routes = [
	{path: '/:id', name: 'ind', components: {  // 命名视图
		default: banner,
		h: head
	}
		// children: [
		// 	{
		// 		path: '',
		// 		component: head
		// 	}
	 //  	]
	}, 
	{path: '/', component:banner},
	{path: '/index' , redirect: '/'}
]
// alias别名alias: '/index'  redirect// 重定向
export default new Router({
  mode: 'history',  // history html5模式无刷新就可以跳转页面
  routes
})
