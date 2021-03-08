<template>
	<view>
		<u-navbar :is-back="false" title="基本信息">
			<view class="slot-wrap">
			</view>
			<view class="navbar-right" slot="right">
					<u-icon name="reload" @tap="$emit('reload')" size="50"></u-icon>
			</view>
		</u-navbar>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
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
