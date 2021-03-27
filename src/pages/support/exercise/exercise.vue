<template>
	<view v-if="!loading">
		<u-form
			v-model="form"
			ref="uForm"
			:label-width="labelWidth"
			:label-position="labelPosition"
			:label-style="{}"
		>
			<u-form-item
				:label-position="labelPosition"
				label="运动开始时间"
				:label-width="labelWidth"
				prop="startTime"
			>
				<u-input
					type="select"
					:select-open="startTimeShow"
					placeholder="请选择运动开始时间"
					v-model="startTimeText"
					@click="startTimeShow=true"
				></u-input>
				<u-picker
					mode="time"
					v-model="startTimeShow"
					:params="{
						year:true,
						month:true,
						day: true,
						hour: true,
						minute: true,
					}"
					@confirm="form.startTime=$event;
										const {year,month,day,hour,minute}=form.startTime;
										startTimeText=`${year}-${month}-${day}-${hour}-${minute}`"
				>
				</u-picker>
			</u-form-item>
			<u-form-item
				:label-position="labelPosition"
				label="运动时长"
				:label-width="labelWidth"
				prop="duration"
			>
				<u-input
					type="select"
					v-model="form.duration"
					@click="durationShow=true"
				></u-input>
				<u-select
					v-model="durationShow"
					:list="Array.from(new Array(300+1).keys()).slice(1).map(x=>{
						return {
							value:String(x),
							label:String(x)
						}
					})"
					@confirm="form.duration=$event[0].value"
					title="运动时间(分钟)"
				></u-select>
			</u-form-item>
			<u-form-item
				:label-position="labelPosition"
				label="运动强度"
				:label-width="labelWidth"
				prop="intensity"
			>
				<u-radio-group
					v-model="form.intensity"
					radioCheckWidth="auto"
					:radioCheckWrap="false"
				>
					<u-radio
						shape="circle"
						v-for="(sItem,sIndex) in intensityList"
						:key="sIndex"
						:name="sItem.id"
					>
						<text>{{sItem.label}}</text>
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item
				:label-position="labelPosition"
				label="运动后心率"
				:label-width="labelWidth"
				:necessary="false"
				prop="heartRate"
			>
				<u-radio-group
					v-model="form.heartRate"
					radioCheckWidth="auto"
					:radioCheckWrap="false"
				>
					<u-radio
						shape="circle"
						v-for="(sItem,sIndex) in heartRateList"
						:key="sIndex"
						:name="sItem.id"
					>
						<text>{{sItem.label}}</text>
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<button type="primary" @tap="submit">提交</button>
		</u-form>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				form:{},
				startTimeText:"",
				labelPosition:"left",
				labelWidth:200,
				startTimeShow:false,	// 控制时间Picker显示
				durationShow:false,
				intensityList:[],
				heartRateList:[],
				rules:{
					startTime:[
						{
							required:true,
							message:"请填写运动开始时间",
							trigger:["change","blur"],
						},
					],
					duration:[
						{
							required:true,
							message:"请填写运动时间",
							trigger:["change","blur"]
						},
					],
					intensity:[
						{
							required:true,
							message:"请填写运动强度",
							trigger:["change","blur"]
						},
					],
					heartRate:[]
				},
			}
		},

		onLoad(){
			this.init();
		},

		computed:{},

		methods: {
			async init(){
				this.loading=true;
				uni.showLoading({
					title:"加载中"
				});

				this.intensityList=[{
					id:1,
					label:"轻松",
					checked:false,
					disabled:false,
				},{
					id:2,
					label:"有点吃力",
					checked:false,
					disabled:false,
				},{
					id:3,
					label:"吃力",
					checked:false,
					disabled:false,
				},{
					id:4,
					label:"很吃力",
					checked:false,
					disabled:false,
				},{
					id:5,
					label:"非常吃力",
					checked:false,
					disabled:false,
				}];

				this.heartRateList=[{
					id:1,
					label:"<120",
					checked:false,
					disabled:false
				},{
					id:2,
					label:"120-150",
					checked:false,
					disabled:false
				},{
					id:3,
					label:"150-180",
					checked:false,
					disabled:false
				},{
					id:4,
					label:">180",
					checked:false,
					disabled:false
				}]

				uni.hideLoading();
				this.loading=false;
			},

			startTimeConfirm(e){
			},

			submit(){
					this.$refs.uForm.validate((async (valid)=>{
						if(valid){
							const {duration,...form}=this.form;
							await this.$db.collection("exercise").add({
								uid:this.$store.state.user.uid,
								username:this.$store.state.user.username,
								duration:Number(duration),
								...form
							}).catch(((err)=>{
								this.$refs.uToast.show({
									title:err,
									type:"error"
								})
							}).bind(this))
							
							this.$refs.uToast.show({
								title:"提交成功",
								type:"success",
								back:true,
							})
							
						}
					}).bind(this))
			},
		}
	}
</script>

<style>

</style>
