<template>
    <view v-if="!loading">
        <view>
            <text>当前时间：{{ date.getMonth() + 1 }} - {{ date.getDate() }}</text>
        </view>
        <view>
					<u-form
						v-model="form"
						ref="uForm"
						:label-width="labelWidth"
						:label-position="labelPosition"
					>
						<u-form-item
							:label-position="labelPosition"
							:label-width="labelWidth"
							v-for="(sItem,sIndex) in moriskyQuestions"
							:key="sIndex"
							:label="`${sItem.id}. ${sItem.question}`"
							:necessary="sItem.necessary"
						>
							<u-radio-group
								radioCheckWidth="auto"
								:radioCheckWrap="false"
							>
								<u-radio
									shape="circle"
									v-for="(sItem2,sIndex2) in [{
										id:1,
										label:'是'
									},{
										id:2,
										label:'否'
									}]"
									:key="sIndex2"
									:name="`${sItem.id}-${sItem2.id}`"
									@change="radioChange($event,sItem)"
								>
									<text>{{sItem2.label}}</text>
								</u-radio>
							</u-radio-group>
						</u-form-item>
						<button type="primary" @tap="submit">提交</button>
					</u-form>
					<u-toast ref="uToast"></u-toast>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				date:new Date(),
				form:{},
				labelWidth:200,
				labelPosition:"top",
				answers:[],
				moriskyQuestions:[],
			}
		},

		onLoad(){
			this.init();
		},

		methods: {
			async init(){
				this.loading=true;
				uni.showLoading({
					title:"加载中"
				})

				this.moriskyQuestions=[{
					id:1,
					question:"你是否有忘记服药经历？",
					necessary:true,
				},{
					id:2,
					question:"你是否有时不注意服药？",
					necessary:true,
				},{
					id:3,
					question:" 当你自觉症状改善时，是否曾停药？",
					necessary:true,
				},{
					id:4,
					question:"当你服药自觉症状更坏时，是否曾停药？",
					necessary:true,
				}];

				this.answers=[0,0,0,0]

				uni.hideLoading();
				this.loading=false;
			},
			radioChange(name){
				const [questionID,radioID]=name.split("-");
				this.answers[questionID-1]=Number(radioID);
			},
			async submit(){
				await this.$db.collection("drug").add({
					uid:this.$store.state.user.uid,
					username:this.$store.state.user.username,
					answers:this.answers
				}).then((async (e)=>{
					this.$refs.uToast.show({
						title:"提交成功",
						type:"success",
						back:true,
					});
				}).bind(this)).catch((err)=>{
					this.$refs.uToast.show({
						title:err,
						type:"error"
					})
				})

			},
		}
	}
</script>

<style>

</style>
