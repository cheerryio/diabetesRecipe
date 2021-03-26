<template>
    <view v-if="!loading">
        <view>
            <text>
                当前时间：{{ date.getMonth() + 1 }} - {{ date.getDate() }}
            </text>
        </view>
        <u-form ref="uForm" :form="form">
            <u-form-item>
                <text>心情指数</text>
            </u-form-item>
            <u-subsection
                :list="moodList"
                :current="curNow"
                @change="moodSectionChange"
            ></u-subsection>
            <button type="primary" @tap="submit">提交</button>
        </u-form>
    </view>
</template>

<script>
export default {
    data() {
        return {
            date: "",
            curNow: 0,
            moodList: [
                { name: "0", value: 0 },
                { name: "2", value: 2 },
                { name: "4", value: 4 },
                { name: "6", value: 6 },
                { name: "8", value: 8 },
                { name: "10", value: 10 },
            ],
            loading: true,
            form: {
                mood: 0,
            },
        };
    },
    onReady() {},
    onLoad() {
        this.loading = true;
        uni.showLoading({
            title: "加载中",
        });

        this.init();

        uni.hideLoading();
        this.loading = false;
    },
    methods: {
        init() {
            this.date = new Date();
        },
        moodSectionChange(index) {
            this.curNow = index;
            this.form.mood = this.moodList[index].value;
        },
        submit() {},
    },
};
</script>

<style>
</style>
