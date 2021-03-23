import Vue from 'vue';
import App from './App';
import store from '@/store';
import config from '@/config/index.config.js';
import routesConfig from '@/config/routes.config.js';
import helper from '@/utils/helper';
import router from '@/utils/router';

import uView from '@/components/uview-ui';
Vue.use(uView);

Vue.config.productionTip = false;
const db = uniCloud.database();

Vue.prototype.$store = store;
Vue.prototype.$db = db;
Vue.prototype.$config=config;
Vue.prototype.$routesConfig=routesConfig;
Vue.prototype.$helper=helper;
Vue.prototype.$dRouter=router;

// 路由导航
router.beforeEach((navType, to) => {
	if (to.route === undefined) {
		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
	}
	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.reLaunch({
			url: helper.objParseUrlAndParam(routesConfig.main.path)
		});
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: helper.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// 登录成功后的重定向地址和参数
			const query = {
				redirectUrl: to.route.path,
				...to.query
			};
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: helper.objParseUrlAndParam(routesConfig.login.path, query)
				});
			} else {
				uni.navigateTo({
					url: helper.objParseUrlAndParam(routesConfig.login.path, query)
				});
			}
		}
	} else {
		uni[navType]({
			url: helper.objParseUrlAndParam(to.route, to.query)
		});
	}
});

App.mpType = 'app'

// 保留小数点后两位
Vue.filter('keepTwoDecimal', value => {
  return (Math.floor((value || 0) * 100) / 100).toFixed(2);
});

const app = new Vue({
	store,
    ...App
})
app.$mount()
