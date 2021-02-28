/**
 * @description 界面四 分餐
 */
<template>
	<view>
		<button type="primary" @tap="test">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},

		methods:{
			test(){
				const db = uniCloud.database();
				db.collection("table1").add({name:"Ben"});
			}
		}
	}
</script>

<style lang="scss">
</style>
