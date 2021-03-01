/**
 * @description 界面四 分餐
 */
<template>
	<view>
		<button type="primary" @tap="loginh5">登录admin(h5)</button>
		<button type="primary" @tap="registerh5">注册(h5)</button>
		<button type="primary" @tap="username='user';password='user';loginh5()">登录user(h5)</button>
		<button type="primary" @tap="loginByWeixin">微信登录</button>
		<button type="primary" @tap="code2SessionWeixin">获取微信openid</button>
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
			// #ifdef H5
			loginh5(){
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
			registerh5(){
				const that=this;
				uniCloud.callFunction({
					name: "register",
					data:{
						username:this.username,
						password:this.password,
						needPermission: true,
						role: ["admin"]
					},
					success(res){
						if(res.result.code === 0) {
								// 2.8.0版本起调整为蛇形uni_id_token（调整后在一段时间内兼容驼峰uniIdToken）
								uni.setStorageSync('uni_id_token',res.result.token)
								uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)

								that.$refs.uToast.show({
										title: res.result.msg,
										type:"success",
								})
								uniCloud.callFunction({
									name:"bindRole",
									data:{
										uid:res.result.uid,
										roleList:["USER"]
									},
									success(res){
										that.$refs.uToast.show({
												title: res.result.msg,
												type:"success",
										})
									}
								})
						} else {
							that.$refs.uToast.show({
									title: res.result.msg,
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
			// #endif
			getWeixinCode() {
				return new Promise((resolve, reject) => {
					// #ifdef APP-PLUS
					weixinAuthService.authorize(function(res) {
						resolve(res.code)
					}, function(err) {
						console.log(err)
						reject(new Error('微信登录失败'))
					});
					// #endif
					// #ifdef MP-WEIXIN
					uni.login({
						provider: 'weixin',
						success(res) {
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('微信登录失败'))
						}
					})
					// #endif
				})
			},
			code2SessionWeixin() {
				this.getWeixinCode().then((code) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'code2SessionWeixin',
							params: {
								code,
							}
						}
					})
				}).then((res) => {
					uni.showModal({
						showCancel: false,
						content: JSON.stringify(res.result)
					})
				}).catch((e) => {
					console.error(e)
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			},
			unbindWeixin() {
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'unbindWeixin'
					},
					success(res) {
						uni.showModal({
							showCancel: false,
							content: JSON.stringify(res.result)
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '微信解绑失败，请稍后再试'
						})
					}
				})
			},
			bindWeixin() {
				this.getWeixinCode().then((code) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'bindWeixin',
							params: {
								code: code,
							}
						}
					})
				}).then((res) => {
					uni.showModal({
						showCancel: false,
						content: JSON.stringify(res.result)
					})
				}).catch(() => {
					uni.showModal({
						showCancel: false,
						content: '微信绑定失败，请稍后再试'
					})
				})
			},
			loginByWeixin() {
				this.getWeixinCode().then((code) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'loginByWeixin',
							params: {
								code,
							}
						}
					})
				}).then((res) => {
					uni.showModal({
						showCancel: false,
						content: JSON.stringify(res.result)
					})
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.setStorageSync("uid",res.result.uid)
					}
				}).catch((e) => {
					console.error(e)
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			},

		}
	}
</script>

<style lang="scss">
</style>
