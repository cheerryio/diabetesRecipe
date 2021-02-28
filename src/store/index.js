import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		user:{
			username:"",
			nickname:"",
			token:"",
			uid:"",
		},
		diabetesType:1,
		information:{},

	},
	getters:{

	},
	mutations:{
		SET_DIABETES_TYPE(state,diabetesType){
			state.diabetesType=diabetesType;
		},
		SET_INFORMATION(state,information){
			state.information=information;
		},
		SET_USER(state,user){
			state.user=user;
		}
	},
	actions:{

	}
})

export default store;
