import Vue from 'vue';
import App from './App';
import store from './store';

import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false;
const db = uniCloud.database();

Vue.prototype.$store = store;
Vue.prototype.$db = db;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
