/**
 * @description 界面四 分餐
 */
<template>
	<view>
		<button type="primary" @tap="login">登录</button>
		<button type="primary" @tap="register">注册</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

	export default {
		data() {
			return {
				username:"admin",
				password:"admin"
			};
		},

		computed:{
			...mapState(["user"])
		},

		methods:{
			...mapMutations(["SET_USER"]),
			login(){
				const that=this;
				uniCloud.callFunction({
					name: "login",
					data:{
						username:this.username,
						password:this.password,
					},
					success(res){
						if(res.result.code === 0){
							// 成功提示
							that.$refs.uToast.show({
								title:"登录成功",
								type:"success",
								url:"pages/classify/classify",
								isTab:true
							})

							const {username,token,uid}=res.result;
							uni.setStorageSync('uni_id_token',token);
							that.SET_USER({
								username,
								token,
								uid,
							})
						}else{
							that.$refs.uToast.show({
								title:res.result.message,
								type:"error",
							})
						}
					},
					fail(){
						that.$refs.uToast.show({
								title: '注册失败，请稍后再试',
								type:"error",
						})
					}
				})
			},
			register(){
				uniCloud.callFunction({
					name: "register",
					data:{
						username:this.username,
						password:this.password,
						needPermission: true,
						role: ["admin"]
					}
				})
			},
		}
	}
</script>

<style lang="scss">
</style>
