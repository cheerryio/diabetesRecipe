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
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                    v-model="form1.gender"
                >
                    <u-radio
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
            <u-form-item label="身高" prop="height">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form1.height"
                    :clearable="true"
                />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="体重" prop="weight">
                <u-input :border="border" v-model="form1.weight" />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="劳动强度" prop="laborIntensity">
                <u-radio-group
                    v-model="form1.laborIntensity"
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                >
                    <u-radio
                        shape="circle"
                        v-for="(sItem, sIndex) in laborIntensityList"
                        :key="sIndex"
                        :name="sItem.id"
                    >
                        <text>{{ sItem.name }}</text>
                    </u-radio>
                </u-radio-group>
                <u-icon name="question-circle-fill"></u-icon>
            </u-form-item>
        </u-form>
        <!-- 妊娠糖尿病信息表单 -->
        <u-form
            v-else-if="diabetesType == 2"
            :model="form2"
            ref="uForm2"
            label-width="120"
            :label-position="labelPosition"
            :label-style="{}"
        >
            <u-form-item label="身高" prop="height">
                <u-input type="text" :border="border" v-model="form2.height" />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="孕前体重" prop="weightBeforePragnant">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form2.weightBeforePragnant"
                />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="孕期" prop="pregnantWeek">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form2.pregnantWeek"
                    placeholder="请选择星期"
                    @click="
                        actionSheet = true;
                        selectType = 1;
                    "
                ></u-input
            ></u-form-item>
            <u-form-item label="  " prop="pregnantDay">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form2.pregnantDay"
                    placeholder="请选择天数"
                    @click="
                        actionSheet = true;
                        selectType = 2;
                    "
                ></u-input>
            </u-form-item>
            <u-form-item label="体重" prop="weight">
                <u-input type="text" :border="border" v-model="form2.weight" />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="胎儿个数" prop="babyNumber">
                <u-radio-group
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                    v-model="form2.babyNumber"
                >
                    <u-radio
                        shape="circle"
                        v-for="(sItem, sIndex) in babyNumberList"
                        :key="sIndex"
                        :name="sItem.value"
                    >
                        <text>{{ sItem.label }}</text>
                    </u-radio>
                </u-radio-group>
            </u-form-item>
            <u-form-item label="劳动强度" prop="laborIntensity">
                <u-radio-group
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                    v-model="form2.laborIntensity"
                >
                    <u-radio
                        shape="circle"
                        v-for="(sItem, sIndex) in laborIntensityList.slice(
                            0,
                            2
                        )"
                        :key="sIndex"
                        :name="sItem.id"
                    >
                        <text>{{ sItem.name }}</text>
                    </u-radio>
                </u-radio-group>
            </u-form-item>
        </u-form>
        <!-- 儿童糖尿病信息表单 -->
        <u-form
            v-else-if="diabetesType == 3"
            :model="form3"
            ref="uForm3"
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
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                    v-model="form3.gender"
                >
                    <u-radio
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
            <u-form-item label="身高" prop="height">
                <u-input
                    type="text"
                    :border="border"
                    v-model="form3.height"
                    :clearable="true"
                />
                <text slot="right" class="unit">cm</text>
            </u-form-item>
            <u-form-item label="体重" prop="weight">
                <u-input :border="border" v-model="form3.weight" />
                <text slot="right" class="unit">kg</text>
            </u-form-item>
            <u-form-item label="年龄" prop="age">
                <u-input
                    :border="border"
                    type="select"
                    :select-open="actionSheet"
                    v-model="form3.age"
                    placeholder="请选择年龄"
                    @click="
                        actionSheet = true;
                        selectType = 3;
                    "
                ></u-input>
            </u-form-item>
            <u-form-item label="体型" prop="bodyShape">
                <u-radio-group
                    :width="radioCheckWidth"
                    :wrap="radioCheckWrap"
                    v-model="form3.bodyShape"
                >
                    <u-radio
                        shape="circle"
                        v-for="(sItem, sIndex) in bodyShapeList"
                        :key="sIndex"
                        :name="sItem.id"
                    >
                        <text>{{ sItem.name }}</text>
                    </u-radio>
                </u-radio-group>
            </u-form-item>
        </u-form>
        <view v-else><text>diabetesType数据无效</text></view>
        <button type="primary" @tap="submit">提交</button>
        <u-select
            :list="
                selectType == 1
                    ? pregnantWeekList
                    : selectType == 2
                    ? pregnantDayList
                    : selectType == 3
                    ? childAgeList
                    : []
            "
            v-model="actionSheet"
            @confirm="selectCallback"
        >
        </u-select>
				<button @tap="explanationShow=!explanationShow">转换</button>
				<u-popup v-model="explanationShow" mode="bottom" border-radius="14" height="500rpx">
					<ul title="劳动强度对照">
						<li v-for="(sItem,sIndex) in laborIntensityList" :key="sIndex">
							<text>{{sItem.name}}: {{sItem.description}}</text>
						</li>
					</ul>
				</u-popup>
        <u-toast ref="uToast"></u-toast>

    </view>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { pregnantDayToTime } from "@/utils/pragnant-time-convert";
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
        let childAgeList = [];

        Array.from(new Array(18 + 1).keys())
            .slice(1)
            .forEach((value) => {
                childAgeList.push({
                    value: value,
                    label: String(value),
                });
                childAgeList.push({
                    value: value + 0.5,
                    label: String(value + 0.5),
                });
            });

        Array.from(new Array(40 + 1).keys()).forEach((value, index) => {
            pregnantWeekList.push({
                value: value,
                label: String(value),
            });
        });

        Array.from(new Array(7).keys()).forEach((value, index) => {
            pregnantDayList.push({
                value: value,
                label: String(value),
            });
        });

        Array.from(new Array(3 + 1).keys())
            .slice(1)
            .forEach((value, index) => {
                babyNumberList.push({
                    value: value,
                    label: String(value),
                });
            });

        return {
            isMounted: false,
						explanationShow:false,
            labelStyle: {
                fontSize: "20rpx",
            },
            border: false,
            labelPosition: "left",
            radioCheckWidth: "auto",
            radioCheckWrap: false,
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
            selectType: 1,
            pregnantWeekList,
            pregnantDayList,
            babyNumberList,
            childAgeList,
            laborIntensityList: [
                {
                    id: 1,
                    name: "轻",
                    checked: false,
                    disabled: false,
										description:"以站着或少量走动为主的工作，如店员售货、教师讲课、办公室职员、修钟表工等"
                },
                {
                    id: 2,
                    name: "中",
                    checked: false,
                    disabled: false,
										description:"以轻度活动为主的工作，如学生日常活动、机动车驾驶、电工、外科医生等"
                },
                {
                    id: 3,
                    name: "高",
                    checked: false,
                    disabled: false,
										description:"农名、建筑工、搬运工、伐木工等"
                },
            ],
            bodyShapeList: [
                {
                    id: 1,
                    name: "消瘦",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 2,
                    name: "正常",
                    checked: false,
                    disabled: false,
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
                gender: "", // 1 for male, 2 for femail
            },
            rules: {
                gender: [
                    {
                        required: true,
                        message: "请填写性别",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                height: [
                    {
                        required: true,
                        message: "请填写身高",
                        trigger: ["change", "blur"],
                    },
                    {
                        message: "请使用数字",
                        type: "number",
                        trigger: ["change", "blur"],
                    },
                    {
                        validator: (_, value, callback) => {
                            let n = Number(value);
                            return !(isNaN(n) || n <= 0 || n >= 300);
                        },
                        message: "请输入正确的身高",
                        trigger: ["change", "blur"],
                    },
                ],
                weight: [
                    {
                        required: true,
                        message: "请填写体重",
                        trigger: ["change", "blur"],
                    },
                    {
                        message: "请使用数字",
                        type: "number",
                        trigger: ["change", "blur"],
                    },
                    {
                        validator: (_, value, callback) => {
                            let n = Number(value);
                            return !(isNaN(n) || n <= 0 || n >= 300);
                        },
                        message: "请输入正确的体重",
                        trigger: ["change", "blur"],
                    },
                ],
                laborIntensity: [
                    {
                        required: true,
                        message: "请填写劳动强度",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                weightBeforePragnant: [
                    {
                        required: true,
                        message: "请填写妊娠前体重",
                        trigger: ["change", "blur"],
                    },
                    {
                        message: "请使用数字",
                        type: "number",
                        trigger: ["change", "blur"],
                    },
                ],
                pregnantWeek: [
                    {
                        required: true,
                        message: "请填写孕期",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                pregnantDay: [
                    {
                        required: true,
                        message: "请填写孕期",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                babyNumber: [
                    {
                        required: true,
                        message: "请填写胎儿个数",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
                age: [
                    {
                        required: true,
                        message: "请填写年龄",
                        trigger: ["change", "blur"],
                    },
                    {
                        message: "请使用数字",
                        type: "number",
                        trigger: ["change", "blur"],
                    },
                    {
                        validator: (_, value, callback) => {
                            let n = Number(value);
                            return !(isNaN(n) || n <= 0 || n >= 18);
                        },
                        message: "请输入正确的年龄",
                        trigger: ["change", "blur"],
                    },
                ],
                bodyShape: [
                    {
                        required: true,
                        message: "请填写体型",
                        trigger: ["change", "blur"],
                        type: "number",
                    },
                ],
            },
        };
    },

    computed: {
        ...mapState(["user"]),
        form() {
            if (!this.isMounted) return;
            // this.$refs is available now
            return this.$refs[`uForm${this.diabetesType}`].model;
        },
    },

    methods: {
        radioGroupChangeGender(e) {
            this.form.gender = e;
        },
        radioGroupChangeLaborIntensity(e) {
            this.form.laborIntensity = e;
        },
        radioGroupChangeBabyNumber(e) {
            this.form.babyNumber = e;
        },
        radioGroupChangeBodyShape(e) {
            this.form.bodyShape = e;
        },
        selectCallback(e) {
            e = e[0];
            switch (this.selectType) {
                case 1:
                    this.form.pregnantWeek = e.label;
                    break;
                case 2:
                    this.form.pregnantDay = e.label;
                    break;
                case 3:
                    this.form.age = e.label;
                    break;
                default:
                    break;
            }
        },
        submit() {
            console.log(this.form);
            const that = this;
            this.$refs[`uForm${this.diabetesType}`].validate((valid) => {
                if (valid) {
                    // 验证通过
                    let diabetesType = that.diabetesType;
                    let information = {};
                    let { username } = that.user;

                    Object.keys(that.form).forEach((key) => {
                        let num = Number(that.form[key]);
                        if (isNaN(num)) {
                            information[key] = that.form[key];
                        } else {
                            information[key] = num;
                        }
                    });

                    if (diabetesType == 2) {
                        information.pregnantTime = pregnantDayToTime(
                            information.pregnantWeek,
                            information.pregnantDay
                        );
                        delete information.pregnantWeek;
                        delete information.pregnantDay;
                    }
                    // 提交form表单到数据库 是不是要做token有效性验证？
                    that.$db
                        .collection("user-diabetes-info")
                        .add({
                            username,
                            diabetesType,
                            information,
                        })
                        .then((res) => {
                            that.$refs.uToast.show({
                                title: "上传成功",
                                type: "success",
                            });
                            uni.$emit("information-form-finish", {
                                information,
                            });
                        })
                        .catch((err) => {
                            that.$refs.uToast.show({
                                title: err,
                                type: "error",
                            });
                        });
                } else {
                    // 验证失败
                }
            });
        },
    },
    mounted: function () {
        //  debugger;
        this.isMounted = true;
        this.$refs[`uForm${this.diabetesType}`].setRules(this.rules);
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
}

.unit {
    color: #000000;
}

.image-icon {
    height: 40rpx;
    width: 40rpx;
}

ul {
	margin:{
		top:50rpx;
	}
	&:before {
		content:attr(title);
		font-size:120%;
		font-weight:bold;
		margin-left:-15px;
	}
}
</style>
