<template>
	<view class="choice-container">
		<button type="primary" @tap="submit(1)">成人糖尿病</button>
		<button type="primary" @tap="submit(2)">妊娠糖尿病</button>
		<button type="primary" @tap="submit(3)">儿童糖尿病</button>
	</view>
</template>

<script>
	export default {
		methods:{
			submit(diabetesType){
				uni.$emit("diabetes-classify-finish",{diabetesType})
			}
		}
	}
</script>

<style lang="scss">
	$show-duration: .5s;
	$delay:.5s;
	.choice-container {
		@include a(600rpx,500rpx);
		button {
			margin:{
				top:50rpx;
			};
			animation:$show-duration cubic-bezier(.73,.12,.87,.47) 0s 1 bounce-in-bottom;
			animation-fill-mode: backwards;
			
			&:nth-child(1) {
				animation-delay: (0*$delay) !important;
			}
			&:nth-child(2) {
				animation-delay: (1*$delay) !important;
			}
			&:nth-child(3) {
				animation-delay: (2*$delay) !important;
			}
		}
	}
	
	@keyframes bounce-in-bottom {
		0% {
			transform: translate(0,600rpx);
			opacity: 0;
		}
		70% {
			transform: translate(0,-100rpx);
		}
		80% {
			transform: translate(0,0);
		}
		90% {
			transform: translate(0,50rpx);
		}
		100% {
			transform: translate(0,0);
		}
	}
	
	@keyframes bigger {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
