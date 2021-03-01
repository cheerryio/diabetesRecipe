/**
 * @description 界面二，能量、物质比例、食物比例展示
 */
<template>
    <view class="main-container">
        <uni-group class="title">
            <text
                >您一天所需总能量为:
                <text class="energe-highlight">{{ energe }}</text></text
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

export default {
    data() {
        return {
            data: "", // 页面一中 information form的数据

            nutrients: [
                {
                    name: "糖类",
                    data: 0.4,
                },
                {
                    name: "蛋白质",
                    data: 0.3,
                },
                {
                    name: "脂肪",
                    data: 0.3,
                },
            ],
            foods: [
                {
                    name: "奶类",
                    data: 0.1,
                },
                {
                    name: "蔬菜",
                    data: 0.2,
                },
                {
                    name: "水果",
                    data: 0.05,
                },
                {
                    name: "谷薯",
                    data: 0.15,
                },
                {
                    name: "肉蛋",
                    data: 0.3,
                },
                {
                    name: "油脂",
                    data: 0.1,
                },
            ],
            nutrientsPie: "",
            foodsPie: "",
            pixelRatio: 1,
        };
    },
    computed: {
        ...mapState(["diabetesType", "information"]),
        BMI: function () {
            //BMI
            switch (this.diabetesType) {
                case 1:
                case 3:
                    return (
                        Number(this.information["weight"]) /
                        Math.pow(Number(this.information["height"]) / 100, 2)
                    );
                case 2:
                    return (
                        Number(this.information["weightBeforePragnant"]) /
                        Math.pow(Number(this.information["height"]) / 100, 2)
                    );
                default:
                    return NaN;
            }
        },
        idealWeight: function () {
            //理想体重
            switch (this.diabetesType) {
                case 1:
                    return (
                        (Number(this.information["height"]) - 100) * 0.9 -
                        Number(this.information["gender"] == 2 ? 2.5 : 0)
                    );
                case 2:
                    let h = Number(this.information["height"]);
                    return h <= 150 ? h - 100 : h < 175 ? h - 105 : h - 110;
                case 3:
                    break;
                default:
                    return NaN;
            }
        },
        energyCoefficient: function () {
            //能量系数
            switch (this.diabetesType) {
                case 1:
                    return (
                        (this.BMI <= 18.5 ? 30 : this.BMI < 24 ? 25 : 20) +
                        Number(this.information.laborIntensity * 5)
                    );
                case 2:
                    return (
                        (this.BMI < 18.5 ? 30 : this.BMI < 25 ? 25 : 20) +
                        Number(this.information.laborIntensity * 5)
                    );
                case 3:
                    break;
                default:
                    return NaN;
            }
        },
        Z: function () {
            switch (this.diabetesType) {
                case 1:
                    return this.energyCoefficient * this.idealWeight;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    return NaN;
            }
        },
    },

    mounted: function (option) {
        console.log(this.diabetesType, this.information);
        this.showPie("nutrientsPie", this.nutrients);
        this.showPie("foodsPie", this.foods);
    },

    methods: {
        calcNutrients() {
            let Z = 0;
        },
        showPie(canvasId, series) {
            let pie = new uCharts({
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
