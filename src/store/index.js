import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
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
		}
	},
	actions:{
		
	}
})

export default store;