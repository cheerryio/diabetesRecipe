<template>
    <view class="main-container">
        <!-- 成人糖尿病信息表单 -->
        <u-form
            v-if="diabetesType == 1"
            :model="form1"
            ref="uForm1"
            label-width="120"
            :label-position="labelPosition"
            :label-style="{}"
        >
            <u-form-item
                :label-position="labelPosition"
                label="性别"
                label-width="150"
                prop="gender"
            >
                <u-radio-group
                    @change="radioGroupChange1"
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                >
                    <u-radio
                        v-model="form1.gender"
                        shape="circle"
                        v-for="(sItem, sIndex) in genders"
                        :key="sIndex"
                        :name="sItem.id"
                    >
                        <image
                            :src="sItem.icon"
                            mode="aspectFit"
                            class="image-icon"
                        ></image>
                        <text>{{ sItem.name }}</text>
                    </u-radio>
                </u-radio-group>
            </u-form-item>
            <u-form-item label="身高">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form1.height"
                    :clearable="true"
                />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="体重">
                <u-input
                    type="number"
                    :border="border"
                    v-model="form1.weight"
                />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="劳动强度">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="laborIndensityText"
                    placeholder="请选择劳动强度"
                    @click="
                        actionSheet = true;
                        actionSheetType = 4;
                    "
                ></u-input>
            </u-form-item>
        </u-form>
        <!-- 妊娠糖尿病信息表单 -->
        <u-form
            v-if="diabetesType == 2"
            :model="form2"
            ref="uForm2"
            label-width="120"
            :label-position="labelPosition"
            :label-style="{}"
        >
            <u-form-item label="身高">
                <u-input type="text" :border="border" v-model="form2.height" />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="孕前体重">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form2.weightBeforePragnant"
                />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="孕期">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form2.pregnantWeek"
                    placeholder="请选择星期"
                    @click="
                        actionSheet = true;
                        actionSheetType = 1;
                    "
                ></u-input>
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form2.pregnantDay"
                    placeholder="请选择天数"
                    @click="
                        actionSheet = true;
                        actionSheetType = 2;
                    "
                ></u-input>
            </u-form-item>
            <u-form-item label="体重">
                <u-input type="text" :border="border" v-model="form2.weight" />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="胎儿个数">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form2.babyNumber"
                    placeholder="请选择胎儿个数"
                    @click="
                        actionSheet = true;
                        actionSheetType = 3;
                    "
                ></u-input>
            </u-form-item>
            <u-form-item label="劳动强度">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="laborIndensityText"
                    placeholder="请选择劳动强度"
                    @click="
                        actionSheet = true;
                        actionSheetType = 4;
                    "
                ></u-input>
            </u-form-item>
        </u-form>
        <!-- 儿童糖尿病信息表单 -->
        <u-form
            v-if="diabetesType == 3"
            :model="form3"
            ref="uForm3"
            label-width="120"
            :label-position="labelPosition"
            :label-style="{}"
        >
            <u-form-item label="身高">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form3.height"
                    :clearable="true"
                />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="体重">
                <u-input
                    type="number"
                    :border="border"
                    v-model="form3.weight"
                />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="年龄">
                <u-input type="number" :border="border" v-model="form3.age" />
            </u-form-item>
            <u-form-item label="体型">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="bodyShapeText"
                    placeholder="请选择体型"
                    @click="
                        actionSheet = true;
                        actionSheetType = 5;
                    "
                ></u-input>
            </u-form-item>
        </u-form>
        <u-action-sheet
            :list="
                actionSheetType == 1
                    ? pregnantWeekList
                    : actionSheetType == 2
                    ? pregnantDayList
                    : actionSheetType == 3
                    ? babyNumberList
                    : actionSheetType == 4
                    ? laborIndensityList
                    : actionSheetType == 5
                    ? bodyShapeList
                    : []
            "
            v-model="actionSheet"
            @click="actionSheetCallback"
        >
        </u-action-sheet>
        <button type="primary" @tap="submit">提交</button>
    </view>
</template>

<script>
/**
 * @description 根据用户属于三种糖尿病的类型，呈现不同的表单，让用户填写相应数据
 *
 */
export default {
    props: {
        diabetesType: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    data() {
        let pregnantWeekList = [];
        let pregnantDayList = [];
        let babyNumberList = [];
        Array.from(new Array(40 + 1).keys())
            .slice(1)
            .forEach((value, index) => {
                pregnantWeekList.push({
                    value: parseInt(value),
                    text: value,
                });
            });

        Array.from(new Array(7 + 1).keys())
            .slice(1)
            .forEach((value, index) => {
                pregnantDayList.push({
                    value: parseInt(value),
                    text: value,
                });
            });

        Array.from(new Array(3 + 1).keys())
            .slice(1)
            .forEach((value, index) => {
                babyNumberList.push({
                    value: parseInt(value),
                    text: value,
                });
            });

        return {
            labelStyle: {
                fontSize: "20rpx",
            },
            border: false,
            labelPosition: "left",
            radioCheckWidth: "auto",
            radioCheckWrap: false,
            laborIndensityText: "",
            bodyShapeText: "",
            genders: [
                {
                    id: 1,
                    name: "男",
                    icon: "/static/icon/man.png",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 2,
                    name: "女",
                    icon: "/static/icon/woman.png",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 3,
                    name: "跨性别",
                    icon: "/static/icon/transgender.png",
                    checked: false,
                    disabled: false,
                },
            ],
            actionSheet: false,
            actionSheetType: 1,
            pregnantWeekList,
            pregnantDayList,
            babyNumberList,
            laborIndensityList: [
                {
                    value: 1,
                    text: "轻",
                },
                {
                    value: 2,
                    text: "中",
                },
                {
                    value: 3,
                    text: "高",
                },
            ],
            bodyShapeList: [
                {
                    value: 1,
                    text: "消瘦",
                },
                {
                    value: 2,
                    text: "超重",
                },
            ],
            form1: {
                gender: "", // 1 for male, 2 for femail
                height: "", // unit cm
                weight: "", // unit KG
                laborIntensity: "", // 1 for 轻, 2 for 中, 3 for 高
            },
            form2: {
                height: "",
                weightBeforePragnant: "",
                pregnantWeek: "",
                pregnantDay: "",
                weight: "",
                babyNumber: "",
                laborIntensity: "",
            },
            form3: {
                height: "",
                weight: "",
                age: "",
                bodyShape: "", // 1 for 消瘦 and 2 for 超重
            },
            rules: {
                gender: [
                    {
                        required: true,
                        message: "请填写性别",
                        trigger: ["change"],
                    },
                ],
                height: [
                    {
                        required: true,
                        message: "请填写身高",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                weight: [
                    {
                        required: true,
                        message: "请填写体重",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                laborIntensity: [
                    {
                        required: true,
                        message: "请填写劳动强度",
                    },
                ],
                weightBeforePragnant: [
                    {
                        required: true,
                        message: "请填写妊娠前体重",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
            },
        };
    },
    methods: {
        radioGroupChange1(e) {
            console.log(e);
            this.form1.gender = e;
        },
        actionSheetCallback(index) {
            switch (this.actionSheetType) {
                case 1:
                    this.form2.pregnantWeek = this.pregnantWeekList[
                        index
                    ].value;
                    break;
                case 2:
                    this.form2.pregnantDay = this.pregnantWeekList[index].value;
                    break;
                case 3:
                    this.form2.babyNumber = this.babyNumberList[index].value;
                    break;
                case 4:
                    this.laborIndensityText = this.laborIndensityList[
                        index
                    ].text;
                    this.form2.laborIntensity = this.laborIndensityList[
                        index
                    ].value;
                    break;
                case 5:
                    this.bodyShapeText = this.bodyShapeList[index].text;
                    this.form3.bodyShape = this.bodyShapeList[index].value;
                    break;
                default:
                    break;
            }
        },
        submit() {
            // 提交数据到数据库逻辑(或者提交逻辑写在组件里面好还是page里面好？)

            // 在上面提交数据成功的回调函数中调用以下代码
            let diabetesType = this.diabetesType;
            let information = {};
            switch (this.diabetesType) {
                case 1:
                    information = this.form1;
                    break;
                case 2:
                    information = this.form2;
                    break;
                case 3:
                    information = this.form3;
                    break;
                default:
                    break;
            }
            uni.$emit("information-form-finish", { information });
        },
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
    },
};
</script>

<style lang="scss">
$show-duration: 0.5s;
.main-container {
    margin: {
        top: 30rpx;
        left: 50rpx;
        right: 50rpx;
    }
    animation: $show-duration ease-in-out 0s 1 bounce-in-right;
}

.unit {
    color: #000000;
}

.image-icon {
    height: 40rpx;
    width: 40rpx;
}

@keyframes bounce-in-right {
    0% {
        transform: translate(600rpx, 0);
    }
    100% {
        transform: translate(0, 0);
    }
}
</style>
