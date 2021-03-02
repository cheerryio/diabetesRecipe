<template>
	<view>
		<scale-form :data="data"></scale-form>
	</view>
</template>

<script>
	import scaleForm from "./components/scale-form"

	export default {
		components:{
			"scale-form":scaleForm
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">

</style>
