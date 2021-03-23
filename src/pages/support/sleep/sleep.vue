<template>
	<view v-if="!loading">
		<view>
			<text>当前时间：{{date.getMonth() + 1}} - {{date.getDate()}}</text>
		</view>
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="时间" prop="sleepHour">
					<u-input
						v-model="form.sleepHour"
						type="select"
						placeholder="请选择睡眠时间"
						:select-open="show"
						@tap="show = true">
					</u-input>
					<text slot="right" class="unit">h</text>
				</u-form-item>
			</u-form>
			<u-select v-model="show" :list="sleepHourList" @confirm="sleepHourListCallback"></u-select>
			<button type="primary" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				show:false,
				date:'',
				form:{
					sleepHour:'',
				},
				rules:{
					sleepHour:[{
						required:true,
						message:"请输入睡眠时间",
						trigger:["change","blur"]
					}]
				},
				sleepHourList:[],

			}
		},

		onReady:function(){
			this.$refs.uForm.setRules(this.rules);
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
				Array.from(new Array(24 + 1).keys())
					.forEach(((value)=>{
						this.sleepHourList.push({
							value:Number(value),
							label:String(value)
						})
					}).bind(this))
			},
			sleepHourListCallback(e){
				this.form.sleepHour=e[0].label;
			},
			submit(){
				this.$refs["uForm"].validate((valid)=>{
					if(valid){
						// 验证通过
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.unit {
	    color: #000000;
	}
</style>
