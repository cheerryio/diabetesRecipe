<template>
	<view class="container">
		<uni-grid :column="3" :square="false">
			<uni-grid-item v-for="(sItem,sIndex) in items" :key="sIndex">
					<navigator :url="sItem.link">
						<view class="item-box">
							<image :src="sItem.icon"></image>
							<text>{{sItem.title}}</text>
						</view>
					</navigator>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {

		data(){
			return {
				items:[{
					title:"睡眠记录",
					icon:"../../static/icon/shuimian.png",
					link:this.$routesConfig.sleep.path,
				},{
					title:"运动记录",
					icon:"../../static/icon/yundong_1.png",
					link:this.$routesConfig.exercise.path,
				},{
					title:"血糖记录",
					icon:"../../static/icon/xietang.png",
					link:this.$routesConfig.bloodsugar.path,
				},{
					title:"饮食记录",
					icon:"../../static/icon/yinshi.png",
					link:"/"
				},{
					title:"心情记录",
					icon:"../../static/icon/xinqingyiban-yuan.png",
					link:this.$routesConfig.mood.path,
				},{
					title:"药物记录",
					icon:"../../static/icon/yao.png",
					link:this.$routesConfig.drug.path,
				}]
			}
		},

		methods:{
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		margin:20rpx;
	}

	.item-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding:20rpx;

		image {
			height:80rpx;
			width: 80rpx;
		}

		text {
			margin-top:20rpx;
			font-size:20rpx;
		}
	}
</style>
