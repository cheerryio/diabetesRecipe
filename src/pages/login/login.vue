/**
 * @description 界面四 分餐
 */
<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="input-box">
				<view class="input-item">
						<view class="input-label">用户名</view>
		<view class="input-body">
			<input v-model="username" maxlength="11" type="text" placeholder="请输入用户名" class="input" >
		</view>
				</view>
				<view class="input-item">
		<view class="input-label">密码</view>
		<view class="input-body">
			<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" />
			<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
		</view>
				</view>
				<view class="select">
						<text @click="registerh5">注册</text>
						<text>忘记密码？</text>
				</view>
		</view>
		<button class="button" @click="loginh5">登录</button>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="loginByWeixin">微信登录</button>
		<!-- #endif -->
		<text>提交糖尿病表单数据需要先登录</text>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

	export default {
		data() {
			return {
				username:"admin",
				password:"admin",
				isHidePassword:false,
			}
		},

		computed:{
			...mapState(["user"])
		},

		methods:{
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
							that.$store.commit("update",["isLogin",true]);
							that.$store.commit("update",["user",{
								username,token,uid
							}]);
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
								// 在此页面注册的用户都绑定在角色USER上
								uniCloud.callFunction({
									name:"bindRole",
									data:{
										uid:res.result.uid,
										roleList:["USER"]
									},
									success(res){
										that.$refs.uToast.show({
												title: res.result.msg+" 请点击登录",
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
			// 微信端代码
			// #ifdef MP-WEIXIN
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
			loginByWeixin(res) {
				const {userInfo,signature,encryptedData}=res.detail;
				this.getWeixinCode().then((code) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'myLoginByWeixin',
							params: {
								username:userInfo.nickName,
								code,
							}
						}
					})
				}).then((res) => {
					this.$refs.uToast.show({
						title:"登陆成功",
						type:"success",
						url:"/pages/classify/classify",
						isTab:true,
					})
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.setStorageSync("uid",res.result.uid)
					}
				}).catch((e) => {
					console.error(e);
					this.$refs.uToast.show({
						title:"微信登录失败，请稍后再试",
						type:"error"
					})
				})
			},
			// #endif
		}
	}
</script>

<style lang="scss">
	button::after{
		border: none;
	}
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			.input-label {
				width: 150upx;
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}

		}
		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}
	.button{
		margin:0 30upx;
		background: #08B6F2;
		border-radius:50upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}
</style>
