<template>
	<view>
		<text>当前时间：{{date.getMonth() + 1}} - {{date.getDate()}}</text>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				date:new Date(),
				
			}
		}
	}
</script>

<style>
	
</style>