<template>
	<view>
		<u-navbar :is-back="false">
			<view class="navbar-left" slot="left">
				<u-tag :text="`${selectYear}-${selectMonth}-${selectDate}`" mode="plain" shape="circle" @tap="dateSelectShow=!dateSelectShow" />
			</view>
			<view class="slot-wrap">
				<u-dropdown>
					<u-dropdown-item refs="mealTypeDropdownItem" v-model="mealType" :options="mealTypeOptions" :title="mealTypeDropdownTitle" @change="mealTypeChange"></u-dropdown-item>
				</u-dropdown>
			</view>
		</u-navbar>
		<u-select
			v-model="dateSelectShow"
			mode="mutil-column-auto"
			:list="dateList"
			title="选择点餐日期"
			:default-value="[0,0,defaultDate]"
			@confirm="dateSelectConfirm">aaa</u-select>
	</view>
</template>

<script>
	export default {
		props:{
			dateRange:{
				type:Number,
				default:14,
			}
		},
		data(){
			return {
				dateSelectShow: false,
				selectYear:0,
				selectMonth:0,
				selectDate:0,
				defaultDate:0,
				dateList:[],
				mealType:1,
				mealTypeOptions:[],
				mealTypeDropdownTitle:"选择餐点类型"
			}
		},

		mounted(){
			this.init();
		},

		methods:{
			init(){
				let d=new Date();
				this.selectYear=d.getFullYear();
				this.selectMonth=d.getMonth()+1;
				this.selectDate=d.getDate();
				let start=new Date(d);
				start.setDate(start.getDate()-Math.ceil(this.dateRange/2));
				let end=new Date(start.getTime());

				let dateItem={
					value:Number(start.getDate()),
					label:String(start.getDate())
				}
				let monthItem={
					value:Number(start.getMonth()+1),
					label:String(start.getMonth()+1),
					children:[]
				}
				let yearItem={
					value:Number(start.getFullYear()),
					label:String(start.getFullYear()),
					children:[]
				}
				// 生成连续dateRange天多列联动数组
				for(let i=0;i<this.dateRange;i++){
					if(end.getTime() == d.getTime()){
						this.defaultDate=monthItem.children.length;
					}
					end.setDate(end.getDate()+1);
					if(yearItem.value !== end.getFullYear()){
						// 年份变换，月份，日期一定变换
						monthItem.children.push({...dateItem});
						yearItem.children.push({...monthItem});
						this.dateList.push({...yearItem});
						yearItem={
							value:Number(end.getFullYear()),
							label:String(end.getFullYear()),
							children:[],
						}
						monthItem={
							value:Number(end.getMonth()+1),
							label:String(end.getMonth()+1),
							children:[]
						}
						dateItem={
							value:Number(end.getDate()),
							label:String(end.getDate()),
						}

					}else if(monthItem.value !== end.getMonth()+1){
						// 年份不变，月份变换，日期一定变换
						monthItem.children.push({...dateItem});
						yearItem.children.push({...monthItem});
						monthItem={
							value:Number(end.getMonth()+1),
							label:String(end.getMonth()+1),
							children:[]
						}
						dateItem={
							value:Number(end.getDate()),
							label:String(end.getDate()),
						}

					}else{
						// 年份，月份不变，日期一定变换
						monthItem.children.push({...dateItem});
						dateItem={
							value:Number(end.getDate()),
							label:String(end.getDate()),
						}
					}
				}
				yearItem.children.push({...monthItem});
				this.dateList.push({...yearItem});

				this.mealTypeOptions=[{
					value:1,
					label:"早餐",
					time:"7:00-8:00"
				},{
					value:2,
					label:"早加餐",
					time:"7:00-8:00"
				},{
					value:3,
					label:"中餐",
					time:"7:00-8:00"
				},{
					value:4,
					label:"中加餐",
					time:"7:00-8:00"
				},{
					value:5,
					label:"晚餐",
					time:"7:00-8:00"
				},{
					value:6,
					label:"晚加餐",
					time:"7:00-8:00"
				}]
			},
			mealTypeChange(e){
				this.mealTypeDropdownTitle=`${this.mealTypeOptions[e-1].label} - ${this.mealTypeOptions[e-1].time}`;
				this.$emit("mealTypeChange",this.mealType);
			},
			dateSelectConfirm(e){
				this.selectYear=e[0].value;
				this.selectMonth=e[1].value;
				this.selectDate=e[2].value;
				this.$emit("selectDateChange",{
					year:this.selectYear,
					month:this.selectMonth,
					date:this.selectDate
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex:1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}

	.navbar-left {
		margin-left: 24rpx;
		display: flex;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>
