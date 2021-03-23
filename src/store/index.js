import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const username=uni.getStorageSync("username") || "";
const uid=uni.getStorageSync("uid") || ""

const store = new Vuex.Store({
	state:{
		isLogin:false,
		user:{
			username,
			nickname:"",
			token:"",
			uid,
		},
		recipeLimit:{
			energe:"",
			nutrients:null,
			foods:null,
		},
		diabetesType:1,
		information:{},

	},
	getters:{

	},
	mutations:{
		update(state,[key,value]){
			state[key]=value;
		},
		SET_DIABETES_TYPE(state,diabetesType){
			state.diabetesType=diabetesType;
		},
		SET_INFORMATION(state,information){
			state.information=information;
		},
		SET_USER(state,user){
			state.user=user;
			const {username,token,uid} = user;
			uni.setStorageSync('uni_id_token',token);
			uni.setStorageSync("username",username);
			uni.setStorageSync("uid",uid);
		},
		SET_RECIPELIMIT(state,recipeLimit){
			state.recipeLimit=recipeLimit;
		}
	},
	actions:{

	}
})

export default store;
