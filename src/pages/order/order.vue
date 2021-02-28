/**
 * @description 界面三，模仿商城界面选择一天的食材
 */
<template>
    <view class="container" v-if="!loading">
        <view class="main" v-if="goods.length">
            <view class="content">
                <scroll-view
                    class="menus"
                    :scroll-into-view="menuScrollIntoView"
                    scroll-with-animation
                    scroll-y
                >
                    <view class="wrapper">
                        <view
                            class="menu"
                            :id="`menu-${item.id}`"
                            :class="{ current: item.id === currentCateId }"
                            v-for="(item, index) in goods"
                            :key="index"
                            @tap="handleMenuTap(item.id)"
                        >
                            <text>{{ item.name }}</text>
                            <view class="dot" v-show="menuCartNum(item.id)">{{
                                menuCartNum(item.id)
                            }}</view>
                        </view>
                    </view>
                </scroll-view>
                <!-- 右侧商品列表 begin -->
                <scroll-view
                    class="goods"
                    scroll-with-animation
                    scroll-y
                    :scroll-top="cateScrollTop"
                >
                    <view class="wrapper">
                        <view class="list">
                            <!-- category begin -->
                            <view
                                class="category"
                                v-for="(item, index) in goods"
                                :key="index"
                                :id="`cate-${item.id}`"
                            >
                                <view
                                    class="title"
                                    v-if="item.id == currentCateId"
                                >
                                    <text>{{ item.name }}</text>
                                    <image
                                        :src="item.icon"
                                        class="icon"
                                    ></image>
                                </view>
                                <view
                                    class="items"
                                    v-if="item.id == currentCateId"
                                >
                                    <!-- 商品 begin -->
                                    <view
                                        class="good"
                                        v-for="(good, key) in item.goods_list"
                                        :key="key"
                                        @tap="showGoodDetailModal(item, good)"
                                    >
                                        <image
                                            :src="good.images"
                                            class="image"
                                        ></image>
                                        <view class="right">
                                            <text class="name">{{
                                                good.name
                                            }}</text>
                                            <text class="tips">{{
                                                good.content
                                            }}</text>
                                            <view class="price_and_action">
                                                <text class="price">{{
                                                    good.price + good.unit
                                                }}</text>
                                                <!-- 呈现选规则按钮 -->

                                                <!-- 呈现加号，加一份到购物车按钮 -->
                                                <view class="btn-group">
                                                    <button
                                                        type="default"
                                                        v-show="
                                                            goodCartNum(good.id)
                                                        "
                                                        plain
                                                        class="btn reduce_btn"
                                                        size="mini"
                                                        hover-class="none"
                                                        @tap.stop="
                                                            handleReduceFromCart(
                                                                item,
                                                                good,
                                                                0.5
                                                            )
                                                        "
                                                    >
                                                        <view
                                                            class="iconfont iconsami-select"
                                                        ></view>
                                                    </button>
                                                    <view
                                                        class="number"
                                                        v-show="
                                                            goodCartNum(good.id)
                                                        "
                                                        @tap.stop=""
                                                        >{{
                                                            goodCartNum(good.id)
                                                        }}</view
                                                    >
                                                    <button
                                                        type="primary"
                                                        class="btn add_btn"
                                                        size="min"
                                                        hover-class="none"
                                                        @tap.stop="
                                                            handleAddToCart(
                                                                item,
                                                                good,
                                                                0.5
                                                            )
                                                        "
                                                    >
                                                        <view
                                                            class="iconfont iconadd-select"
                                                        ></view>
                                                    </button>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                    <!-- 商品 end -->
                                </view>
                            </view>
                            <!-- category end -->
                        </view>
                    </view>
                </scroll-view>
                <!-- 右侧商品列表 end -->
            </view>
            <!-- content end -->
            <!-- 购物车栏 begin -->
            <view class="cart-box" v-if="cart.length > 0">
                <view class="mark">
                    <image
                        src="/static/images/menu/cart.png"
                        class="cart-img"
                        @tap="openCartPopup"
                    ></image>
                    <view class="tag">{{ getCartGoodsNumber }}</view>
                </view>
                <view class="price">￥{{ getCartGoodsPrice }}</view>
                <button
                    type="primary"
                    class="pay-btn"
                    @tap="toPay"
                    :disabled="disabledPay"
                >
                    {{ disabledPay ? `差${spread}元起送` : "去结算" }}
                </button>
            </view>
            <!-- 购物车栏 end -->
        </view>
        <!-- 商品详情模态框 begin -->
        <modal
            :show="goodDetailModalVisible"
            class="good-detail-modal"
            color="#5A5B5C"
            width="90%"
            custom
            padding="0rpx"
            radius="12rpx"
						@cancel="goodDetailModalVisible=false"
        >
            <scroll-view class="detail" scroll-y>
                <view class="wrapper">
                    <view class="basic">
                        <view class="name">{{ good.name }}</view>
                        <view class="tips">{{ good.content }}</view>
                    </view>
                    <view class="properties" v-if="good.use_property">
                        <view
                            class="property"
                            v-for="(item, index) in good.property"
                            :key="index"
                        >
                            <view class="title">
                                <text class="name">{{ item.name }}</text>
                                <view class="desc" v-if="item.desc"
                                    >({{ item.desc }})</view
                                >
                            </view>
                            <view class="values">
                                <view
                                    class="value"
                                    v-for="(value, key) in item.values"
                                    :key="key"
                                    :class="{ default: value.is_default }"
                                    @tap="changePropertyDefault(index, key)"
                                >
                                    {{ value.value }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <view class="action">
                <view class="left">
                    <view class="price">{{ good.price + good.unit }}</view>
                </view>
                <view class="btn-group">
                    <button
                        type="default"
                        plain
                        class="btn"
                        size="mini"
                        hover-class="none"
                        @tap="handlePropertyReduce"
                    >
                        <view class="iconfont iconsami-select"></view>
                    </button>
                    <view class="number">{{ good.number }}</view>
                    <button
                        type="primary"
                        class="btn"
                        size="min"
                        hover-class="none"
                        @tap="handlePropertyAdd"
                    >
                        <view class="iconfont iconadd-select"></view>
                    </button>
                </view>
            </view>
            <view class="add-to-cart-btn" @tap="handleAddToCartInModal">
                <view>加入购物车</view>
            </view>
        </modal>
        <!-- 商品详情模态框 end -->
        <!-- 购物车详情popup -->
        <popup-layer
            direction="top"
            :show-pop="cartPopupVisible"
            class="cart-popup"
        >
            <template slot="content">
                <view class="top">
                    <text @tap="handleCartClear">清空</text>
                </view>
                <scroll-view class="cart-list" scroll-y>
                    <view class="wrapper">
                        <view
                            class="item"
                            v-for="(item, index) in cart"
                            :key="index"
                        >
                            <view class="left">
                                <view class="name">{{ item.name }}</view>
                                <view class="props">{{ item.props_text }}</view>
                            </view>
                            <view class="center">
                                <text>￥{{ item.price }}</text>
                            </view>
                            <view class="right">
                                <button
                                    type="default"
                                    plain
                                    size="mini"
                                    class="btn"
                                    hover-class="none"
                                    @tap="handleCartItemReduce(index)"
                                >
                                    <view
                                        class="iconfont iconsami-select"
                                    ></view>
                                </button>
                                <view class="number">{{ item.number }}</view>
                                <button
                                    type="primary"
                                    class="btn"
                                    size="min"
                                    hover-class="none"
                                    @tap="handleCartItemAdd(index)"
                                >
                                    <view
                                        class="iconfont iconadd-select"
                                    ></view>
                                </button>
                            </view>
                        </view>
                        <view
                            class="item"
                            v-if="orderType == 'takeout' && store.packing_fee"
                        >
                            <view class="left">
                                <view class="name">包装费</view>
                            </view>
                            <view class="center">
                                <text
                                    >￥{{ parseFloat(store.packing_fee) }}</text
                                >
                            </view>
                            <view class="right invisible">
                                <button
                                    type="default"
                                    plain
                                    size="mini"
                                    class="btn"
                                    hover-class="none"
                                >
                                    <view
                                        class="iconfont iconsami-select"
                                    ></view>
                                </button>
                                <view class="number">1</view>
                                <button
                                    type="primary"
                                    class="btn"
                                    size="min"
                                    hover-class="none"
                                >
                                    <view
                                        class="iconfont iconadd-select"
                                    ></view>
                                </button>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </template>
        </popup-layer>
        <!-- 购物车详情popup -->
    </view>
    <view class="loading" v-else>
        <image src="/static/images/loading.gif"></image>
    </view>
</template>

<script>
import modal from "@/components/modal/modal";
import popupLayer from "@/components/popup-layer/popup-layer";
import goods from "./goods";
import store from "./store";
import recipes from "./recipes";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
    components: {
        modal,
        popupLayer,
    },
    data() {
        return {
            goods: [], //所有商品
            loading: true,
            currentCateId: 1, //默认分类
            cateScrollTop: 0,
            menuScrollIntoView: "",
            cart: [], //购物车
            goodDetailModalVisible: false, //是否饮品详情模态框
            good: {}, //当前饮品
            category: {}, //当前饮品所在分类
            cartPopupVisible: false,
            sizeCalcState: false,
            orderType: "takein",
            isLogin: true,
            store,
        };
    },
    async onLoad() {
        await this.init();
    },
    computed: {
        // ...mapState(['orderType', 'address', 'store']),
        // ...mapGetters(['isLogin']),
        goodCartNum() {
            //计算单个饮品添加到购物车的数量
            return (id) =>
                this.cart.reduce((acc, cur) => {
                    if (cur.id === id) {
                        return (acc += cur.number);
                    }
                    return acc;
                }, 0);
        },
        menuCartNum() {
            return (id) =>
                this.cart.reduce((acc, cur) => {
                    if (cur.cate_id === id) {
                        return (acc += cur.number);
                    }
                    return acc;
                }, 0);
        },
        getCartGoodsNumber() {
            //计算购物车总数
            return this.cart.reduce((acc, cur) => acc + cur.number, 0);
        },
        getCartGoodsPrice() {
            //计算购物车总价
            return this.cart.reduce(
                (acc, cur) => acc + cur.number * cur.price,
                0
            );
        },
        disabledPay() {
            //是否达到起送价
            return this.orderType == "takeout" &&
                this.getCartGoodsPrice < this.store.min_price
                ? true
                : false;
        },
        spread() {
            //差多少元起送
            if (this.orderType != "takeout") return;
            return parseFloat(
                (this.store.min_price - this.getCartGoodsPrice).toFixed(2)
            );
        },
    },
    methods: {
        // ...mapMutations(['SET_ORDER_TYPE']),
        // ...mapActions(['getStore']),
        async init() {
            //页面初始化
            this.loading = true;
            // await this.getStore()
            this.goods = recipes;
            this.loading = false;
            this.cart = uni.getStorageSync("cart") || [];
        },
        takout() {
            if (this.orderType == "takeout") return;

            if (!this.isLogin) {
                uni.navigateTo({ url: "/pages/login/login" });
                return;
            }

            uni.navigateTo({
                url: "/pages/address/address?is_choose=true",
            });
        },
        handleMenuTap(id) {
            //点击菜单项事件
            if (!this.sizeCalcState) {
                this.calcSize();
            }
            //console.log(this.goods.find((item) => item.id == id).top);
            this.currentCateId = id;
            this.$nextTick(() => (this.cateScrollTop = 0));
        },
        calcSize() {
            let h = 10;

            this.goods.forEach((item) => {
                let view = uni.createSelectorQuery().select(`#cate-${item.id}`);
                view.fields(
                    {
                        size: true,
                    },
                    (data) => {
                        item.top = h;
                        h += data.height;
                        item.bottom = h;
                    }
                ).exec();
            });
            this.sizeCalcState = true;
        },
        handleAddToCart(cate, good, num) {
            //添加到购物车
            const index = this.cart.findIndex((item) => {
                if (good.use_property) {
                    return (
                        item.id === good.id &&
                        item.props_text === good.props_text
                    );
                } else {
                    return item.id === good.id;
                }
            });
            if (index > -1) {
                this.cart[index].number += num;
            } else {
                this.cart.push({
                    id: good.id,
                    cate_id: cate.id,
                    name: good.name,
                    price: good.price,
                    number: num,
                    image: good.images,
                    use_property: good.use_property,
                    props_text: good.props_text,
                    props: good.props,
                });
            }
        },
        handleReduceFromCart(item, good, num) {
            const index = this.cart.findIndex((item) => item.id === good.id);
            this.cart[index].number -= num;
            if (this.cart[index].number <= 0) {
                this.cart.splice(index, 1);
            }
        },
        showGoodDetailModal(item, good) {
            this.good = JSON.parse(
                JSON.stringify({ ...good, number: good.number || 0 })
            );
            this.category = JSON.parse(JSON.stringify(item));
            this.goodDetailModalVisible = true;
        },
        closeGoodDetailModal() {
            //关闭饮品详情模态框
            this.goodDetailModalVisible = false;
            this.category = {};
            this.good = {};
        },
        handlePropertyAdd() {
            this.good.number += 0.5;
        },
        handlePropertyReduce() {
            if (this.good.number <= 0) return;
            this.good.number -= 0.5;
        },
        handleAddToCartInModal() {
            const product = Object.assign({}, this.good, {});
            this.handleAddToCart(this.category, product, this.good.number);
            this.closeGoodDetailModal();
        },
        openCartPopup() {
            //打开/关闭购物车列表popup
            this.cartPopupVisible = !this.cartPopupVisible;
        },
        handleCartClear() {
            //清空购物车
            uni.showModal({
                title: "提示",
                content: "确定清空购物车么",
                success: ({ confirm }) => {
                    if (confirm) {
                        this.cartPopupVisible = false;
                        this.cart = [];
                    }
                },
            });
        },
        handleCartItemAdd(index) {
            this.cart[index].number += 1;
        },
        handleCartItemReduce(index) {
            if (this.cart[index].number === 1) {
                this.cart.splice(index, 1);
            } else {
                this.cart[index].number -= 1;
            }
            if (!this.cart.length) {
                this.cartPopupVisible = false;
            }
        },
        toPay() {
            if (!this.isLogin) {
                uni.navigateTo({ url: "/pages/login/login" });
                return;
            }

            uni.showLoading({ title: "加载中" });
            uni.setStorageSync("cart", JSON.parse(JSON.stringify(this.cart)));

            uni.navigateTo({
                url: "/pages/pay/pay",
            });
            uni.hideLoading();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/pages/order/order.scss";
</style>
