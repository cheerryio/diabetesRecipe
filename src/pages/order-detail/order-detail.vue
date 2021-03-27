<template>
	<view>
		<view>
			<text>熟食：</text>
			<view
				v-for="(sItem,sIndex) in cookedFood"
				:key="sIndex"
			>
				{{ sItem.name }} - {{( ["早餐","早加餐","中餐","中加餐","晚餐","晚加餐"][sItem.mealType-1] )}} {{ sItem.price}}{{sItem.unit}}
			</view>
		</view>
		<view>
			<text>生食：</text>
			<view
				v-for="(sItem,sIndex) in rawFood"
				:key="sIndex"
			>
				{{ sItem.name }} - {{( ["早餐","早加餐","中餐","中加餐","晚餐","晚加餐"][sItem.mealType-1] )}} {{ sItem.price}}{{sItem.unit}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cookedFood:[],
				rawFood:[]
			}
		},

		onLoad(params){
			this.cookedFood=JSON.parse(params.cookedFood);
			this.rawFood=JSON.parse(params.rawFood);
			this.init();
		},

		methods: {
			async init(){
				if(this.cookedFood.length === 0 && this.rawFood.length === 0){

				}
			},
		}
	}
</script>

<style>

</style>
