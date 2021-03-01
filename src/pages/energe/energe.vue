/**
 * @description 界面二，能量、物质比例、食物比例展示
 */
<template>
    <view class="main-container">
        <uni-group class="title">
            <text
                >您一天所需总能量为:
                <text class="energe-highlight">{{ Z }}</text></text
            >
        </uni-group>
        <uni-group>
            <view class="qiun-charts">
                <canvas
                    canvas-id="nutrientsPie"
                    id="nutrientsPie"
                    class="charts"
                    @touchstart="touchPie"
                ></canvas>
            </view>
        </uni-group>
        <uni-group>
            <view class="qiun-charts">
                <canvas
                    canvas-id="foodsPie"
                    id="foodsPie"
                    class="charts"
                    @touchstart="touchPie"
                ></canvas>
            </view>
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
        ...mapState(["diabetesType", "information"]),
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
                        name: "蔬菜",
                        data: 1,
                    },
                    {
                        name: "水果",
                        data: 1,
                    },
                    {
                        name: "谷薯",
                        data: Math.floor((this.Z * 0.55 - 188 / 80) * 2) / 2,
                    },
                    {
                        name: "肉蛋",
                        data: Math.round((this.Z * 0.095 - 35.2 / 36) * 2) / 2,
                    },
                    {
                        name: "油脂",
                        data: Math.floor((this.Z * 0.1575 - 14.7 / 90) * 2) / 2,
                    },
                ];
            }
            return [
                {
                    name: "奶类",
                    data: 3,
                },
                {
                    name: "蔬菜",
                    data: 1,
                },
                {
                    name: "水果",
                    data: 1,
                },
                {
                    name: "谷薯",
                    data: Math.floor((this.Z * 0.55 - 224 / 80) * 2) / 2,
                },
                {
                    name: "肉蛋",
                    data: Math.round((this.Z * 0.095 - 61.6 / 36) * 2) / 2,
                },
                {
                    name: "油脂",
                    data: Math.floor((this.Z * 0.1575 - 42.6 / 90) * 2) / 2,
                },
            ];
        },
    },

    mounted: function (option) {
        this.showPie("nutrientsPie", this.nutrients);
        this.showPie("foodsPie", this.foods);
    },

    methods: {
        showPie(canvasId, series) {
            const pie = new uCharts({
                $this: this,
                canvasId: canvasId,
                type: "pie",
                fontSize: 11,
                legend: { show: true },
                background: "#FFFFFF",
                pixelRatio: this.pixelRatio,
                series: series,
                animation: true,
                width: uni.upx2px(750) * this.pixelRatio,
                height: uni.upx2px(500) * this.pixelRatio,
                dataLabel: true,
                extra: {
                    pie: {
                        lableWidth: 15,
                    },
                },
            });

            switch (canvasId) {
                case "nutrientsPie":
                    this.nutrientsPie = pie;
                    break;
                case "foodsPie":
                    this.foodsPie = pie;
                    break;
                default:
                    break;
            }
        },
        touchPie(e) {
            switch (e.currentTarget.id) {
                case "nutrientsPie":
                    this.nutrientsPie.showToolTip(e, {
                        format: function (item) {
                            return item.name + ":" + item.data;
                        },
                    });
                    break;
                case "foodsPie":
                    this.foodsPie.showToolTip(e, {
                        format: function (item) {
                            return item.name + ":" + item.data;
                        },
                    });
                    break;
                default:
                    break;
            }
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
.qiun-charts {
    width: 750upx;
    height: 500upx;
    background-color: #ffffff;
}
.charts {
    width: 750upx;
    height: 500upx;
    background-color: #ffffff;
}

.main-container {
    animation: $show-duration linear 0s 1 scale-in-small;
}

.title {
}

.energe-highlight {
    color: #ff8000;
    font-size: 35rpx;
    margin-left: 10rpx;
}

@keyframes scale-in-small {
    0% {
        transform: scale(0) rotate(-180deg);
    }

    100% {
        transform: scale(1) rotate(0);
    }
}
</style>
