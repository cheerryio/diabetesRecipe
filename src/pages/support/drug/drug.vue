<template>
    <view v-if="!loading">
        <view>
            <text
                >当前时间：{{ date.getMonth() + 1 }} -
                {{ date.getDate() }}</text
            >
        </view>
        <view>
            <u-form :model="form" ref="uForm"> </u-form>
            <button type="primary" @tap="submit">提交</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            show: false,
            date: "",
            form: {
                sleepHour: "",
            },
        };
    },
    methods: {},
};
</script>

<style>
</style>
