/**
 * @description 界面三，模仿商城界面选择一天的食材
 */
<template>
    <view class="container" v-if="!loading">
        <u-toast ref="uToast" />
        <navbar></navbar>
        <tools
					@category-type-change="categoryTypeChange"
					@meal-type-change="mealType=$event"
				></tools>
        <view class="main" v-if="goods.length">
            <view class="content">
                <!-- 左侧食品大类目录 -->
                <scroll-view
                    class="menus"
                    :scroll-into-view="menuScrollIntoView"
                    scroll-with-animation
                    scroll-y
                >
                    <view class="wrapper">
                        <view
                            class="menu"
                            :id="`menu-${item.categoryID}`"
                            :class="{
                                current: item.categoryID === currentCateId,
                            }"
                            v-for="(item, index) in goods"
                            :key="index"
                            @tap="handleMenuTap(item.categoryID)"
                        >
                            <text>{{ item.name }}</text>
                            <view
                                class="dot"
                                v-show="menuCartNum(item.categoryID)"
                                >{{ menuCartNum(item.categoryID) }}</view
                            >
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
                                :id="`cate-${item.categoryID}`"
                            >
                                <view
                                    class="title"
                                    v-if="item.categoryID == currentCateId"
                                >
                                    <text>{{ item.name }}</text>
                                    <image
                                        :src="item.icon"
                                        class="icon"
                                    ></image>
                                </view>
                                <view
                                    class="items"
                                    v-if="item.categoryID == currentCateId"
                                >
                                    <!-- 商品 begin -->
                                    <view
                                        class="good"
                                        v-for="(good, key) in item.goodsList"
                                        :key="key"
                                        @tap="showGoodDetailModal(item, good)"
                                    >
                                        <image
                                            :src="good.thumbImg"
                                            class="image"
                                        ></image>
                                        <view class="right">
                                            <text class="name">{{
                                                good.name
                                            }}</text>
                                            <text class="tips">{{
                                                good.description
                                            }}</text>
                                            <view class="price_and_action">
                                                <text class="price">{{
                                                    String(good.price) +
                                                    good.unit
                                                }}</text>
                                                <!-- 呈现选规则按钮 -->

                                                <!-- 呈现加号，加一份到购物车按钮 -->
                                                <view class="btn-group">
                                                    <button
                                                        type="default"
                                                        v-show="
                                                            goodCartNum(
                                                                good.foodID
                                                            )
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
                                                            goodCartNum(
                                                                good.foodID
                                                            )
                                                        "
                                                        @tap.stop=""
                                                        >{{
                                                            goodCartNum(
                                                                good.foodID
                                                            )
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
                                                                0.5,
																																mealType
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
                        src="/static/icon/bucket.png"
                        class="cart-img"
                        @tap="openCartPopup"
                    ></image>
                    <view class="tag">{{ getCartGoodsNumber }}</view>
                </view>
                <view class="price">{{ getCartGoodsKilo }}g</view>
                <button type="primary" class="pay-btn" @tap="toDetail">
                    {{ "分餐详情" }}
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
            @cancel="goodDetailModalVisible = false"
        >
            <scroll-view class="detail" scroll-y>
                <view class="wrapper">
                    <view
                        class="basic"
                        style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        "
                    >
                        <view class="name">{{ good.name }}</view>
                        <view class="tips" v-if="good.description">{{
                            good.description
                        }}</view>
                        <image
                            :src="good.thumbImg"
                            style="width: 160rpx; height: 160rpx"
                        ></image>
                    </view>
                    <view class="properties" v-if="good.nutrientContent">
                        <view class="property">
                            <view
                                class="title"
                                style="
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-evenly;
                                "
                            >
                                <text class="name">
                                    碳水化合物：
                                    {{ good.nutrientContent.carbohydrates }}
                                    {{ good.nutrientContent.carbohydratesUnit }}
                                </text>
                                <text class="name">
                                    蛋白质：
                                    {{ good.nutrientContent.protein }}
                                    {{ good.nutrientContent.proteinUnit }}
                                </text>
                                <text class="name">
                                    油脂：
                                    {{ good.nutrientContent.fat }}
                                    {{ good.nutrientContent.fatUnit }}
                                </text>
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
                <view>加入食谱</view>
            </view>
        </modal>
        <!-- 商品详情模态框 end -->
        <!-- 购物车详情popup -->
        <popup-layer
            direction="top"
            :show-pop="cartPopupVisible"
            class="cart-popup"
            @close="cartPopupVisible = false"
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
                                <view class="name">{{ item.name }}-
																( {{["早餐","早加餐","中餐","中加餐","晚餐","晚加餐"][item.mealType-1]}} )</view>
                            </view>
                            <view class="center">
                                <text>{{
                                    String(item.price) + item.unit
                                }}</text>
                            </view>
                            <view class="right">
                                <button
                                    type="default"
                                    plain
                                    size="mini"
                                    class="btn"
                                    hover-class="none"
                                    @tap="handleCartItemReduce(item)"
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
                                    @tap="handleCartItemAdd(item)"
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
</template>

<script>
import modal from "@/components/modal/modal";
import popupLayer from "@/components/popup-layer/popup-layer";
import navbar from "./components/navbar";
import tools from "./components/tools";
import store from "./store";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
    components: {
        modal,
        popupLayer,
        navbar,
        tools,
    },
    data() {
        return {
					  categoryType: 1,	// 1:熟食，2：生食
						cookedGoods:[],
						rawGoods:[],
            goods: [], //所有商品
            rawFoodGoods: [],
            cookedFoodGoods: [],
						mealType:0,	// supposed to range from 1-6
            loading: true,
            currentCateId: 7, //默认分类
            cateScrollTop: 0,
            menuScrollIntoView: "",
            cart: [], // 购物车
						cookedFoodCart:[],	// 熟食购物车
						rawFoodCart:[],	// 生食购物车
            goodDetailModalVisible: false, //是否饮品详情模态框
            good: {}, //当前饮品
            category: {}, //当前饮品所在分类
            cartPopupVisible: false,
            sizeCalcState: false,
            store,

            recipeLimit: {
                energe: 1234,
                nutrients: [
                    {
                        name: "糖类",
                        data: 123,
                    },
                    {
                        name: "蛋白质",
                        data: 3213,
                    },
                    {
                        name: "脂肪",
                        data: 12,
                    },
                ],
                foods: [
                    {
                        name: "奶类",
                        data: 3,
                    },
                    {
                        name: "肉蛋",
                        data: 2,
                    },
                    {
                        name: "谷薯",
                        data: 2.5,
                    },
                    {
                        name: "蔬菜",
                        data: 1,
                    },
                    {
                        name: "油脂",
                        data: 1.5,
                    },
                    {
                        name: "水果",
                        data: 1,
                    },
                ],
            },
        };
    },
    async onLoad() {
        await this.init();
    },
    computed: {
        // ...mapState(['orderType', 'address', 'store']),
        ...mapState(['isLogin']),
        // ...mapState(["recipeLimit"]),
        goodCartNum() {
            //计算单个饮品添加到购物车的数量
            return (id) =>
                this.cart.reduce((acc, cur) => {
                    if (cur.foodID === id) {
                        return (acc += cur.number);
                    }
                    return acc;
                }, 0);
        },
        menuCartNum() {
            return (id) =>
                this.cart.reduce((acc, cur) => {
                    if (cur.categoryID === id) {
                        return (acc += cur.number);
                    }
                    return acc;
                }, 0);
        },
        getCartGoodsNumber() {
            //计算购物车总数
            return this.cart.reduce((acc, cur) => acc + cur.number, 0);
        },
        getCartGoodsKilo() {
            //计算购物车总价
            return this.cart.reduce(
                (acc, cur) => acc + cur.number * cur.price,
                0
            );
        },
    },
    methods: {
        // ...mapMutations(['SET_ORDER_TYPE']),
        // ...mapActions(['getStore']),
        async init() {
            //页面初始化
            this.loading = true;
            await this.loadFoodData();
            this.loading = false;
        },
        async loadFoodData() {
					uni.showLoading({
					    title: "加载中",
					});
            // 获取商品信息
            if (this.categoryType == 1) {
                if (!this.cookedFoodGoods.length) {
                    const res = await this.$db
                        .collection("food-category,food")
                        .where(`categoryType == ${this.categoryType}`)
                        .field(
                            "goodsList{foodID,name,description,kilo as price,unit,thumbImg,categoryId,nutrientContent},categoryID,name,priority"
                        )
                        .get();
                    this.cookedFoodGoods = res.result.data;
                }
                this.goods = this.cookedFoodGoods;
								this.cart=this.cookedFoodCart;
            } else if (this.categoryType == 2) {
                if (!this.rawFoodGoods.length) {
                    const res = await this.$db
                        .collection("food-category,food")
                        .where(`categoryType == ${this.categoryType}`)
                        .field(
                            "goodsList{foodID,name,description,price,unit,thumbImg,categoryId},categoryID,name,priority"
                        )
                        .get();

                    this.rawFoodGoods = res.result.data;
                }
                this.goods = this.rawFoodGoods;
								this.cart=this.rawFoodCart;
            } else {
            }
            this.currentCateId = this.goods[0].categoryID;
						uni.hideLoading();
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
                let view = uni
                    .createSelectorQuery()
                    .select(`#cate-${item.categoryID}`);
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
				/**
				 * @param {Object} cate {categoryID,name}
				 * @param {Object} good	{foodID}
				 * @param {Object} num	=== kilo
				 */
        handleAddToCart(cate, good, num, mealType) {
            if (num == 0) {
                return;
            }
						if(this.mealType<1 || this.mealType>6){
							this.$refs.uToast.show({
								title:"未选择餐点",
								type:"warning"
							})
							return;
						}
            //添加到购物车
            let total = this.menuCartNum(cate.categoryID);

            if (this.categoryType == 1) {

            } else if (this.categoryType == 2) {
                if (
                    total + num >
                    this.recipeLimit.foods[cate.categoryID - 1].data
                ) {
                    this.$refs.uToast.show({
                        title: `${cate.name}每天的交换份限额为${
                            this.recipeLimit.foods[cate.categoryID - 1].data
                        }`,
                    });
                    return;
                }
            }

            const index = this.cart.findIndex((item) => {
                return item.foodID === good.foodID && item.mealType === mealType;
            });
            if (index > -1) {
                this.cart[index].number += num;
            } else {
                this.cart.push({
										mealType:mealType,
                    foodID: good.foodID,
                    categoryID: cate.categoryID,
                    name: good.name,
                    price: good.price,
                    number: num,
                    image: good.thumbImg,
                    unit: good.unit,
                    categoryName: cate.name,
                });
            }
        },
        handleReduceFromCart(item, good, num) {
            const index = this.cart.findIndex(
                (item) => item.foodID === good.foodID
            );
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
            this.handleAddToCart(this.category, product, this.good.number,this.mealType);
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
        handleCartItemAdd(item) {
            this.handleAddToCart(
                { categoryID: item.categoryID, name: item.categoryName },
                item,
                0.5,
								item.mealType
            );
        },
        handleCartItemReduce(item) {
            this.handleReduceFromCart(
                { categoryID: item.categoryID, name: item.categoryName },
                item,
                0.5
            );
        },
        toDetail() {
            const that = this;

            uni.showLoading({ title: "加载中" });
            this.$db
                .collection("recipe")
                .add({
                    uid: this.$store.state.user.uid,
                    username: this.$store.state.user.username,
										cookedFood: this.cookedFoodCart,
										rawFood:this.rawFoodCart,
										valid:true
                })
						uni.hideLoading();
						this.$dRouter.navigateTo({
							route:this.$routesConfig.order_detail,
							query:{
								cookedFood:JSON.stringify(this.cookedFoodCart || []),
								rawFood:JSON.stringify(this.rawFoodCart || [])
							}
						})
        },
        async categoryTypeChange(e) {
            this.categoryType = e;
            await this.loadFoodData();
						console.log(this.cart)
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/pages/order/order.scss";
</style>
