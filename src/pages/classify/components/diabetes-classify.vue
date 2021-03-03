<template>
    <view class="choice-container">
        <button type="primary" @tap="submit(1)">成人糖尿病</button>
        <button type="primary" @tap="submit(2)">妊娠糖尿病</button>
        <button type="primary" @tap="submit(3)">儿童糖尿病</button>
    </view>
</template>

<script>
export default {
    methods: {
        submit(diabetesType) {
            uni.$emit("diabetes-classify-finish", { diabetesType });
        },
    },
};
</script>

<style lang="scss">
$show-duration: 0.5s;
$delay: 0.5s;
.choice-container {
    @include a(600rpx, 500rpx);
    button {
        margin: {
            top: 50rpx;
        }
    }
}
</style>
