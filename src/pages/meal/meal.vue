/**
 * @description 界面四 分餐
 */
<template>
	<view>
		<canvas type="webgl" id="webgl" style="width: 100%; height: 450px;"></canvas>
	</view>
</template>

<script>
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

	export default {
		data() {
			return{

			};
		},

		onLoad(){
			uni.createSelectorQuery()
				.select('#webgl')
				.node()
				.exec((res) => {
					const canvas = res[0].node
					const THREE = createScopedThreejs(canvas)

					renderSphere(canvas, THREE)
				})
			},

		methods:{

		}
	}
</script>

<style lang="scss">
</style>
