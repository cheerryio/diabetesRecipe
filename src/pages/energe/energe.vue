/**
 * @description 界面二，能量、物质比例、食物比例展示
 */
<template>
    <view class="main-container" v-if="!loading">
        <uni-group class="group" v-if="energe.Z">
            <text class="normal-font">您一天所需总能量为:</text>
            <text class="energe-highlight">{{ energe.Z.toFixed(2) }}</text>
        </uni-group>
        <uni-group class="group" v-if="energe.nutrientsEnerge">
            <template v-for="(item, index) in energe.nutrientsEnerge">
                <view :key="index" class="text-box">
                    <text class="normal-font">{{ item.name }}</text>
                    <text class="energe-highlight">{{ item.data }}</text>
                </view>
            </template>
        </uni-group>
				<button type="primary" @tap="$dRouter.navigateTo({
					route:$routesConfig.classify
				})">重填表单</button>
				<button type="primary" @click="uni.switchTab({
					url:$routesConfig.order.path
				})">点熟食</button>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { pregnantTimeToDay } from "@/utils/pragnant-time-convert";
import { isChildFat } from "./child-bmi-fat";

export default {
    data() {
        return {
						loading:false,
            data: {}, // 页面一中 information form的数据
						uni:uni,
        };
    },

		onLoad(){
			this.init();
		},

    computed: {
        ...mapState(["diabetesType", "information", "energe", "user"]),
        BMI: function () {
            // BMI
            switch (this.diabetesType) {
                case 1:
                case 3:
                    return (
                        this.information.weight /
                        Math.pow(this.information.height / 100, 2)
                    );
                case 2:
                    return (
                        this.information.weightBeforePragnant /
                        Math.pow(this.information.height / 100, 2)
                    );
                default:
                    return NaN;
            }
        },
        idealWeight: function () {
            // 理想体重
            switch (this.diabetesType) {
                case 1:
                    return (
                        (this.information.height - 100) * 0.9 -
                        (this.information.gender == 2 ? 2.5 : 0)
                    );
                case 2:
                    const h = this.information.height;
                    return h <= 150 ? h - 100 : h < 175 ? h - 105 : h - 110;
                case 3:
                    break;
                default:
                    return NaN;
            }
        },
        energyCoefficient: function () {
            // 能量系数
            switch (this.diabetesType) {
                case 1:
                    return (
                        (this.BMI <= 18.5 ? 30 : this.BMI < 24 ? 25 : 20) +
                        this.information.laborIntensity * 5
                    );
                case 2:
                    return (
                        (this.BMI < 18.5 ? 30 : this.BMI < 25 ? 25 : 20) +
                        this.information.laborIntensity * 5
                    );
                case 3:
                    return this.information.age < 3
                        ? 100
                        : this.information.age <= 6
                        ? 90
                        : this.information.age <= 10
                        ? 80
                        : 70;
                default:
                    return NaN;
            }
        },
        pregnancy: function () {
            // 1:早期 2:中期 3: 晚期
            const { pregnantWeek, pregnantDay } = pregnantTimeToDay(
                this.information.pregnantTime
            );
            if (pregnantWeek < 12 || (pregnantWeek == 12 && pregnantDay == 0)) {
                return 1;
            } else if (pregnantWeek < 28) {
                return 2;
            } else {
                return 3;
            }
        },
        // 仅仅会在information改变时自动计算
				Z: {
					get:function () {
            let X, Y, Z;
            switch (this.diabetesType) {
                case 1:
                    return this.energyCoefficient * this.idealWeight;
                case 2:
                    X =
                        this.BMI < 30
                            ? this.energyCoefficient * this.idealWeight
                            : 25 * this.information.weight;
                    Y =
                        this.information.babyNumber == 1
                            ? X
                            : this.information.babyNumber == 2
                            ? X + 200
                            : X + 300;
                    Z =
                        this.pregnancy == 1
                            ? Y
                            : this.pregnancy == 2
                            ? Y + 200
                            : Y + 400;
                    return this.pregnancy == 1
                        ? Z < 1500
                            ? 1500
                            : Z
                        : Z < 1800
                        ? 1800
                        : Z;
                case 3:
                    Y = 1000 + this.information.age * this.energyCoefficient;
                    return isChildFat(
                        this.information.gender,
                        this.information.age,
                        this.BMI
                    )
                        ? Y - 300
                        : Y;
                default:
                    return NaN;
            }
					},
					set:function(newVal){
					},
				},
        // 仅仅会在information改变时自动计算
				nutrientsEnerge: {
					get:function () {
            let A = this.Z * 0.55;
            if (this.diabetesType == 2) {
                if (this.pregnancy == 1 && A < 150) {
                    A = 150;
                } else if (A < 180) {
                    A = 180;
                }
            }
            return [
                {
                    name: "糖类",
                    data: Number(A.toFixed(2)),
                },
                {
                    name: "蛋白质",
                    data: Number((this.Z * 0.15).toFixed(2)),
                },
                {
                    name: "脂肪",
                    data: Number((this.Z * 0.3).toFixed(2)),
                },
            ];
					},
					set:function(){

					},
				},

        foods: function () {
            if (this.energe.foods) {
                return this.energe.foods;
            }
            if (
                this.diabetesType == 1 ||
                (this.diabetesType == 3 && this.information.age >= 6)
            ) {
                return [
                    {
                        name: "奶类",
                        data: 1.5,
                    },
                    {
                        name: "肉蛋",
                        data:
                            Math.round(((this.Z * 0.095 - 35.2) / 36) * 2) / 2,
                    },
                    {
                        name: "谷薯",
                        data: Math.floor(((this.Z * 0.55 - 188) / 80) * 2) / 2,
                    },
                    {
                        name: "蔬菜",
                        data: 1,
                    },
                    {
                        name: "油脂",
                        data:
                            Math.floor(((this.Z * 0.1575 - 14.7) / 90) * 2) / 2,
                    },
                    {
                        name: "水果",
                        data: 1,
                    },
                ];
            }
            return [
                {
                    name: "奶类",
                    data: 3,
                },
                {
                    name: "肉蛋",
                    data: Math.round(((this.Z * 0.095 - 61.6) / 36) * 2) / 2,
                },
                {
                    name: "谷薯",
                    data: Math.floor(((this.Z * 0.55 - 224) / 80) * 2) / 2,
                },
                {
                    name: "蔬菜",
                    data: 1,
                },
                {
                    name: "油脂",
                    data: Math.floor(((this.Z * 0.1575 - 42.6) / 90) * 2) / 2,
                },
                {
                    name: "水果",
                    data: 1,
                },
            ];
        },
    },

		watch:{
			// 监听vuex store中information变化，如果变化，需要更新store和数据中的energe
			"$store.state.information":async function(information){
				this.$store.commit("update",["energe",{
					Z:this.Z,
					nutrientsEnerge:this.nutrientsEnerge
				}]);

				await this.$db.collection("energe").add({
					uid:this.$store.state.user.uid,
					username:this.$store.state.user.username,
					...this.$store.state.energe
					})
					.catch((async (e)=>{
						await this.$db.collection("energe").where({
							uid:this.$store.state.user.uid
						}).update({
							...this.$store.state.energe
						})
					}).bind(this))
			},
		},

    methods: {
			async init(){
				this.loading=true;
				uni.showLoading({
					title:"加载中"
				})
				if(!this.$store.state.isLogin){
					this.$dRouter.redirectTo({
						route:this.$routesConfig.login,
						query:{
							redirectTab:this.$routesConfig.energe.path
						}
					})
					return;
				}
				let res;
				// 请求云端是否有营养物质总能量数据
				if(!Object.keys(this.$store.state.energe).length){
					res=await this.$db.collection("energe").where({
						uid:this.$store.state.user.uid
					}).get();

					if(!res.result.data.length){
						// 请求云端有无糖尿病表单数据
						if(!Object.keys(this.$store.state.information).length){
							res=await this.$db.collection("user-diabetes-info").where({
								uid:this.$store.state.user.uid
							}).get();
							if(!res.result.data.length){
								this.$dRouter.redirectTo({
									route:this.$routesConfig.classify,
									query:{
										redirectTab:this.$routesConfig.energe.path
									}
								})
								return;
							}else{
								console.log("get information success");
								this.$store.commit("update",["information",res.result.data[0].information]);
								this.$store.commit("update",["energe",{
									Z:this.Z,
									nutrientsEnerge:this.nutrientsEnerge
								}])
								await this.$db.collection("energe").add({
									uid:this.$store.state.user.uid,
									username:this.$store.state.user.username,
									...this.$store.state.energe
									});
							}
						}
					}else{
						console.log("get energe success");
						const {Z,nutrientsEnerge}=res.result.data[0];
						this.$store.commit("update",["energe",{
							Z,
							nutrientsEnerge
						}]);
					}
				}
				uni.hideLoading();
				this.loading=false;
			},
    },
};
</script>

<style lang="scss">
$show-duration: 0.5s;
page {
    background: #f2f2f2;
    width: 750upx;
    overflow-x: hidden;
}

.main-container {
}

.group {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin:20rpx;
}

.text-box {
    margin: 20rpx;
}

.normal-font {
    font: {
        size: 30rpx;
    }
}

.energe-highlight {
    color: #ff8000;
    font-size: 35rpx;
    margin-left: 10rpx;
}

.center {
	margin-left: 200rpx;
}

@keyframes scroll-down {
    0% {
        transform: rotate(-10deg);
    }

    50% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(0);
    }
}
</style>
