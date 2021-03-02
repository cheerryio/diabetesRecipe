<template>
	<view>
		<canvas type="webgl" id="webgl" style="width: 100%; height: 450px;"></canvas>
	</view>
</template>

<script>
	/**
	 * @description 界面四 分餐
	 * 微信端可以尝试3d吗？
	 */
	// #ifdef MP-WEIXIN
	import {
	    createScopedThreejs
	} from '@/common/threejs'

	import {
		renderCube
	} from '@/common/test-cases/cube'

	import {
		renderModel
	} from '@/common/test-cases/model'

	import {
		renderCubes
	} from '@/common/test-cases/cubes'
	import {
		renderSphere
	} from '@/common/test-cases/sphere'
	// #endif

	export default {
		data() {
			return{

			};
		},

		onLoad(){
			// #ifdef MP-WEIXIN
			uni.createSelectorQuery()
				.select('#webgl')
				.node()
				.exec((res) => {
					const canvas = res[0].node
					const THREE = createScopedThreejs(canvas)

					renderSphere(canvas, THREE)
				})
			// #endif
			},

		methods:{

		}
	}
</script>

<style lang="scss">
</style>
