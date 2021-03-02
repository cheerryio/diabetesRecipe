/**
 * @description 界面二，能量、物质比例、食物比例展示
 */
<template>
    <view class="main-container">
        <uni-group class="group">
            <text class="normal-font">您一天所需总能量为:</text>
            <text class="energe-highlight">{{ Z }}</text>
        </uni-group>
        <uni-group class="group">
            <template v-for="(item, index) in nutrients">
                <view :key="index" class="text-box">
                    <text class="normal-font">{{ item.name }}</text>
                    <text class="energe-highlight">{{ item.data }}</text>
                </view>
            </template>
        </uni-group>
        <uni-group class="group">
            <template v-for="(item, index) in foods">
                <view :key="index" class="text-box">
                    <text class="normal-font">{{ item.name }}</text>
                    <text class="energe-highlight">{{ item.data }}</text>
                </view>
            </template>
        </uni-group>
    </view>
</template>

<script>
import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { pregnantTimeToDay } from "@/utils/pragnant-time-convert";
import { isChildFat } from "./child-bmi-fat";

export default {
    data() {
        return {
            data: "", // 页面一中 information form的数据

            nutrientsPie: "",
            foodsPie: "",
            pixelRatio: 1,
        };
    },
    computed: {
        ...mapState(["diabetesType", "information", "recipeLimit", "user"]),
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
        Z: function () {
            if (this.recipeLimit.energe) {
                return this.recipeLimit.energe;
            }
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
        nutrients: function () {
            if (this.recipeLimit.nutrients) {
                console.log("aaaa");
                return this.recipeLimit.nutrients;
            }
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

        foods: function () {
            if (this.recipeLimit.foods) {
                return this.recipeLimit.foods;
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
                        data: Math.round((this.Z * 0.095 - 35.2 / 36) * 2) / 2,
                    },
                    {
                        name: "谷薯",
                        data: Math.floor((this.Z * 0.55 - 188 / 80) * 2) / 2,
                    },
                    {
                        name: "蔬菜",
                        data: 1,
                    },
                    {
                        name: "油脂",
                        data: Math.floor((this.Z * 0.1575 - 14.7 / 90) * 2) / 2,
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
                    data: Math.round((this.Z * 0.095 - 61.6 / 36) * 2) / 2,
                },
                {
                    name: "谷薯",
                    data: Math.floor((this.Z * 0.55 - 224 / 80) * 2) / 2,
                },
                {
                    name: "蔬菜",
                    data: 1,
                },
                {
                    name: "油脂",
                    data: Math.floor((this.Z * 0.1575 - 42.6 / 90) * 2) / 2,
                },
                {
                    name: "水果",
                    data: 1,
                },
            ];
        },
    },

    mounted: function (option) {
        this.$nextTick(
            function () {
                const recipeLimit = {
                    energe: this.Z,
                    nutrients: this.nutrients,
                    foods: this.foods,
                };
                this.SET_RECIPELIMIT(recipeLimit);
                this.$db.collection("recipe-limit").add({
                    username: this.user.username,
                    uid: this.user.uid,
                    ...recipeLimit,
                });
            }.bind(this)
        );
    },

    methods: {
        ...mapMutations(["SET_RECIPELIMIT"]),
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

    animation: 0.2s ease-in-out 0s 1 scroll-down;
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
