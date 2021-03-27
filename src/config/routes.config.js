/*
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// 权限路由 在main.js可实现路由拦截 所以路由都需要注册 待完善
	classify: {
		name: '类型',
		path: '/pages/classify/classify',
		requiresAuth:true
	},
	order:{
		name:"点餐",
		path:'/pages/order/order',
		requiresAuth:true
	},
	sleep:{
		name:"睡眠",
		path:'/pages/support/sleep/sleep',
		requiresAuth:true
	},
	exercise:{
		name:"运动",
		path:'/pages/support/exercise/exercise',
		requiresAuth:true
	},
	bloodsugar:{
		name:"血糖",
		path:'/pages/support/bloodsugar/bloodsugar',
		requiresAuth:true
	},
	mood:{
		name:"心情",
		path:'/pages/support/mood/mood',
		requiresAuth:true
	},
	drug:{
		name:"药物",
		path:'/pages/support/drug/drug',
		requiresAuth:true
	},
	// 非权限路由
	energe: {
		name: '能量',
		path: '/pages/energe/energe',
	},
	order_detail:{
		name:"点餐详情",
		path:'/pages/order-detail/order-detail'
	},

	login: {
		name: '登录',
		path: '/pages/login/login'
	},

};
