/**
 * @description 界面一 初始类别用户选择糖尿病类型
 * 	三类：妊娠糖尿病，儿童青少年糖尿病，老年糖尿病
 *  三个选项分别对应三个数据输入类别
 */
<template>
	<view>
		<uni-steps class="steps" :options="steps" direction="row" :active="step"></uni-steps>
		<diabetes-classify v-if="step === 0"></diabetes-classify>
		<information-form v-else-if="step === 1" :diabetesType="diabetesType"></information-form>
		<energe v-else-if="step === 2"></energe>
		<view v-else><text>数据错误</text></view>
	</view>
</template>

<script>
	import InformationForm from "./components/information-form"
	import diabetesClassify from "./components/diabetes-classify"
	import energe from "@/pages/energe/energe"
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	
	export default {
		components:{
			"information-form":InformationForm,
			"diabetes-classify":diabetesClassify,
			energe
		},
		data() {
			return {
				step:0,
				steps:[
					{
						title:"选择类型",
						desc:"",
					},
					{
						title:"填写信息",
						desc:"",
					},
					{
						title:"物质分配",
						desc:"",
					}
				]
			};
		},
		computed:{
			...mapState(["diabetesType"])
		},
		onLoad(){
			let that=this;
			uni.$on("diabetes-classify-finish",function({diabetesType}){
				that.step+=1;
				this.$store.commit("SET_DIABETES_TYPE",diabetesType);
			})
			// 接受用户填好的表单数据
			uni.$on("information-form-finish",function({information}){
				// 跳转到页面二（能量页面）
				that.step+=1;
				this.$store.commit("SET_INFORMATION",information);
			})
			
		},
		methods:{
			
			
		}
	}
</script>

<style lang="scss">
	$background-color:#f5f5f5;
	
	page {
		background-color: $background-color;
	}
	
	.steps {
		margin:{
			top:20rpx;
		};
		animation: 1.5s ease-in-out 0s 1 fade-in;
	}
	
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

</style>
