<template>
	<view>
		<view>
			<text>时间：{{date.getMonth() + 1}} - {{date.getDate()}}</text>
		</view>
		<view>
			<u-input v-model="value" type="select" :border="true" @click="show = true" />
			<u-action-sheet :list="sleepHoursList" v-model="show" @click="sleepHoursActionSheetCallback"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				show:false,
				value:'',
				date:'',
				sleepHoursList:[{
					text:"超过9小时"
				},{
					text:"6-9小时"
				},{
					text:"小于6小时"
				}]
			}
		},

		onLoad:function(){
			this.loading=true;
			uni.showLoading({
				title:"加载中"
			})

			this.init();

			uni.hideLoading();
			this.loading=false;
		},

		methods: {
			init(){
				this.date=new Date();

			},
			sleepHoursActionSheetCallback(index){
				this.value=this.sleepHoursList[index].text;
			},
		}
	}
</script>

<style>

</style>
