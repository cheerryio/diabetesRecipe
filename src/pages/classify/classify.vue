/**
 * @description 界面一 初始类别用户选择糖尿病类型
 * 	三类：妊娠糖尿病，儿童青少年糖尿病，老年糖尿病
 *  三个选项分别对应三个数据输入类别
 */
<template>
    <view class="main-container">
				<navbar @reload="reload"></navbar>
        <uni-steps
            class="c-steps"
            :options="steps"
            direction="row"
            :active="step"
        ></uni-steps>
        <diabetes-classify class="c-classify" v-if="step === 0"></diabetes-classify>
        <information-form
            v-else-if="step === 1"
            :diabetesType="diabetesType"
        ></information-form>
        <view v-else><text>数据错误</text></view>
    </view>
</template>

<script>
import InformationForm from "./components/information-form";
import diabetesClassify from "./components/diabetes-classify";
import navbar from "./components/navbar"
import energe from "@/pages/energe/energe";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
    components: {
        "information-form": InformationForm,
        "diabetes-classify": diabetesClassify,
        energe,
				navbar,
    },
    data() {
        return {
            step: 1,
            steps: [
                {
                    title: "选择类型",
                    desc: "",
                },
                {
                    title: "填写信息",
                    desc: "",
                }
            ],
        };
    },
    computed: {
        ...mapState(["diabetesType","recipeLimit"]),
    },
    onLoad(params) {
				this.params=params;
				this.init();
        let that = this;
        uni.$on("diabetes-classify-finish", function ({ diabetesType }) {
            that.step += 1;
            this.$store.commit("update",["diabitesType",diabitesType])
        });
        // 接受用户填好的表单数据
        uni.$on("information-form-finish", async function ({ information }) {
            this.$store.commit("update",["information",information]);
						await this.$db.collection("user-diabetes-info").add({
							uid:this.$store.state.user.uid,
							username:this.$store.state.user.username,
							diabitesType:information.diabitesType,
							information,
						});
						uni.switchTab({
							url:this.params.redirectTab ? this.params.redirectTab : "/pages/energe/energe"
						})
        });
    },
    methods: {
			async init(){
			},
			// 回到最初步骤，store中数据清空
			reload(){
				uni.showModal({
					title:"数据重填",
					content:"您确定要重新填写您的数据吗？",
					success:(function(){
						this.step=0;
					}).bind(this),

				})

			}
		},
};
</script>

<style lang="scss">
$background-color: #f5f5f5;

page {
    background-color: $background-color;
}

.main-container {
	.c-steps {
		margin: {
		    top: 20rpx;
		}
	}

	.c-steps,.c-classify,.c-energe {
		animation: 1.5s ease-in-out 0s 1 fade-in;
	}
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
