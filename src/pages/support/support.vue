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
		<button type="primary" @click="submit">点我</button>
	</view>
</template>

<script>
	export default {

		data(){
			return {
				items:[{
					title:"睡眠记录",
					icon:"../../static/icon/shuimian.png",
					link:"/pages/support/sleep/sleep"
				},{
					title:"运动记录",
					icon:"../../static/icon/yundong_1.png",
					link:"/pages/support/exercise/exercise"
				},{
					title:"血糖记录",
					icon:"../../static/icon/xietang.png",
					link:"/pages/support/bloodsugar/bloodsugar"
				},{
					title:"饮食记录",
					icon:"../../static/icon/yinshi.png",
					link:"/"
				},{
					title:"心情记录",
					icon:"../../static/icon/xinqingyiban-yuan.png",
					link:"/pages/support/mood/mood"
				},{
					title:"药物记录",
					icon:"../../static/icon/yao.png",
					link:"/pages/support/drug/drug"
				}]
			}
		},

		methods:{
			submit(){
				this.$dRouter.navigateTo({
					route:this.$routesConfig.energe,
					query:{a:1}
				})
			}
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
