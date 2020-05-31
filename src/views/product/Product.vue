<template>
  <div id="product">
    <nav-header></nav-header>
    <!-- 吸顶标题 -->
    <div class="nav-bar">
      <div class="container">
        <span class="fl">{{ goodsInfo.goods_name }}</span>
        <!-- <a class="fr" href="javascript:;">用户评价</a> -->
      </div>
    </div>
    <!-- 加载中 -->
    <div class="product-loading" v-if="showProductLoading">
      <loading class="product-loading-row" :loadingNum="2" />
    </div>
    <!-- 产品内容 -->
    <div class="container clear-fix" v-else>
      <!-- 产品信息 -->
      <div class="product-box">
        <!-- 产品图 -->
        <div class="product-img fl">
          <img :src="goodsInfo.imgurl" alt="" />
        </div>
        <!-- 描述 -->
        <div class="product-info fr">
          <div class="wrapper">
            <h2 class="product-name">
              {{ goodsInfo.goods_name }}
            </h2>
            <p class="product-desc"></p>
            <div class="product-price">
              <span class="price">{{ goodsInfo.price | toFix }}元</span>
            </div>
            <div class="product-select" v-if="allGoodsInfo.length > 0">
              <h3 class="title">选择产品</h3>
              <a
                href="javaScript:;"
                class="select-item"
                v-for="(item, index) in allGoodsInfo"
                :key="index"
                :class="{ isSelected: currentIndex === index }"
                @click="selectProduct(index)"
              >
                <span class="name" :style="{ width: maxWidth + 'px' }">{{
                  selectName(item)
                }}</span>
                <span class="price">{{ item.price | toFix }}</span>
              </a>
            </div>
            <!-- 库存 -->
            <div class="product-store">
              <span>该产品剩余： </span>
              <span>{{ goodsInfo.stock }} 件</span>
            </div>
            <!-- 数量 -->
            <div class="product-number">
              <span class="fl">购买数量</span>
              <div class="wrapper fl">
                <a href="javascript:;" @click="decrease" class="btn-item">-</a>
                <input
                  type="text"
                  name=""
                  id=""
                  v-model="counter"
                  class="counter"
                  @blur="checkText"
                />
                <!-- <input class="counter" />{{ counter }}</input> -->
                <a href="javascript:;" @click="increment" class="btn-item">+</a>
              </div>
            </div>
            <!-- 总价格 购物车 收藏 -->
            <div class="info-bom">
              <div class="total fl">
                <span>总计: </span>
                <span>{{ priceTotal | toFix }} 元</span>
              </div>
              <div
                class="add-cart fr"
                @click="addCart"
                :class="{ noDrop: addCartloading }"
              >
                <span>加入购物车<loading v-if="addCartloading"/></span>
              </div>
              <div
                class="collect fr"
                @click="addCollect"
                :class="{ isCollect: isCollected }"
              >
                <span v-show="!isCollected"></span>
                <span v-show="isCollected"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 用户评价 -->
      <div class="comment">
        <h3 class="title"></h3>
      </div>
    </div>
    <!-- 加入购物车成功后模态框 -->
    <modal
      :showModal="showMadal"
      :title="'提示'"
      :confirmText="'查看购物车'"
      :CloseText="'返回'"
      @onClose="showMadal = false"
      @onConfirm="$router.push('/cart')"
    >
      <div slot="body" class="body-text">加入购物车成功</div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/navheader/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";

import Modal from "components/modal/Modal";
import Loading from "components/loading/Loading";

// 导入首页网络请求
import { getProductData, addCart } from "network/product.js";
import {
  addCollection,
  findGoodCollect,
  deleteCollectionGood,
} from "network/collect";

import * as types from "../../store/mutations.types";
import { mapState } from "vuex";

export default {
  name: "product",
  components: {
    NavHeader,
    NavFooter,
    Modal,
    Loading,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      id: this.$route.params.id,
      HeaderProductList: [],
      goodsInfo: {},
      allGoodsInfo: [],
      counter: 1, // 购买数量
      showMadal: false,
      priceTotal: 0,
      currentIndex: 0, // 当前选择的产品
      maxlength: 0, // 产品名的最大长度
      maxWidth: 0,
      addCartloading: false, // 加入购物车loading
      showProductLoading: true, // 加载中loading
      collectloading: false, // 加入收藏loading
      isCollected: false, // 是否收藏
    };
  },
  created() {
    // 请求商品信息
    this._getProductData(this.id);

    // 查看商品是否被收藏
    this._findGoodCollect();
  },
  filters: {
    toFix(value) {
      return typeof value === "number" ? value.toFixed(2) : value;
    },
  },
  methods: {
    /**
     * 产品名右边空格，使得所以产品名的宽度一致
     */
    getMargin(item) {
      let num = 0;
      let resultLength = this.selectName(item).length;
      while (resultLength < this.maxlength) {
        num++;
        resultLength++;
      }
      console.log(num);

      return num * 16;
    },
    /**
     * 产品名过滤
     */
    selectName(item) {
      const goodsLength = item.goods_name.length; // 商品名字的长度
      const skuLength = item.sku_name.length; // 产品名字的长度
      let resultName = item.sku_name.substr(
        goodsLength,
        skuLength - goodsLength
      );

      return resultName;
    },
    /**
     * 选择产品
     */
    selectProduct(index) {
      this.currentIndex = index;
      this.goodsInfo = this.allGoodsInfo[index];
      // 计算总价格
      this.getPriceTotal();
    },
    /**
     * 购买数量
     */
    decrease() {
      this.counter--;
      if (this.counter < 1) {
        this.$toach.show("商品数量不可以少于1件喔！");
        this.counter = 1;
      }
      this.getPriceTotal();
    },
    increment() {
      this.counter++;
      if (this.counter >= this.goodsInfo.stock) {
        this.$toach.show(`商品数量仅剩${this.goodsInfo.stock}件了喔！`);
        this.counter = this.goodsInfo.stock;
      }
      this.getPriceTotal();
    },
    /**
     * 计算总价格
     */
    getPriceTotal() {
      this.priceTotal = this.goodsInfo.price * this.counter;
    },
    /**
     * 检查是否是数字
     */
    checkText() {
      const reg = /^[0-9]{1,}$/;
      if (reg.test(this.counter)) {
        if (this.counter > this.goodsInfo.stock) {
          this.counter = this.goodsInfo.stock;
          this.$toach.show(`亲！商品仅剩数量${this.goodsInfo.stock}件了喔！`);
        }
        this.getPriceTotal();
      } else {
        this.counter = 1;
        this.getPriceTotal();
      }
    },
    /**
     * 查找产品名的最大长度
     */
    findGoodsMaxLength() {
      this.maxlength = this.selectName(this.allGoodsInfo[0]).length;
      if (this.allGoodsInfo.length > 1) {
        for (let index = 1; index < this.allGoodsInfo.length; index++) {
          if (
            this.maxlength < this.selectName(this.allGoodsInfo[index]).length
          ) {
            this.maxlength = this.selectName(this.allGoodsInfo[index]).length;
          }
        }
      }
      this.maxWidth = this.maxlength * 16;
    },
    /**
     * 加入购物车
     */
    addCart() {
      // 如果正在提交，则不响应按钮点击
      if (this.addCartloading) {
        return;
      }
      this.addCartloading = true;
      const _this = this;
      if (Object.keys(this.userInfo).length <= 0) {
        this.$router.push("/login");
        return;
      }
      addCart(this.userInfo.user_id, this.goodsInfo.sku_id, this.counter)
        .then((res) => {
          // 保存购物车的数量
          this.$store.dispatch("saveCartCount", this.counter);
          this.addCartloading = false;
          this.showMadal = true;
        })
        .catch((err) => {
          console.log(err);

          this.addCartloading = false;
          this.$toach.show("加入购物车失败");
        });
    },
    /**
     * 加入收藏
     */
    addCollect() {
      // 判断是否处于登录状态
      if (Object.keys(this.userInfo).length > 0) {
        // 登录状态，发送网络请求
        // 如果商品已经收藏 取消收藏
        if (this.isCollected) {
          deleteCollectionGood(this.userInfo.user_id, this.id)
            .then((res) => {
              console.log(res);
              this.isCollected = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          addCollection(
            this.userInfo.user_id,
            this.allGoodsInfo[0].goods_name,
            this.allGoodsInfo[0].spu_id
          )
            .then((res) => {
              if (res.data.affectedRows === 1) {
                this.isCollected = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // 取消收藏
      } else {
        // 非登录状态，跳转到登录页面
        this.$router.push("/login");
      }
    },
    /**
     * 网络请求部分
     */
    _getProductData(id) {
      getProductData(id)
        .then((res) => {
          console.log(res);

          this.showProductLoading = false;
          this.allGoodsInfo = res.data;
          this.goodsInfo = this.allGoodsInfo[0];
          // 查找产品名的最大长度
          this.findGoodsMaxLength();
          // 计算总价格
          this.getPriceTotal();
        })
        .catch((err) => {
          console.log(err);
          this.$toach.show("当前网络交差，请刷新网页");
        });
    },
    _findGoodCollect() {
      findGoodCollect(this.userInfo.user_id, this.id)
        .then((res) => {
          console.log(res);

          this.isCollected = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#product .nav-bar {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #ccc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
#product .nav-bar .container > span {
  font-size: 16px;
  color: #212121;
}
/* #product .nav-bar .container > a {
  font-size: 14px;
  color: #616161;
} */
#product .nav-bar > a:hover {
  color: var(--color-topic);
}
#product .product-box {
  padding: 32px 0;
}
#product .product-box .product-img {
  width: 40%;
  height: 560px;
  position: relative;
}
#product .product-box .product-info {
  width: 60%;
}
/* 左边轮播图 */
#product .product-img img {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 95%;
  min-width: 300px;
  max-height: 500px;
}
#product .product-info .wrapper > div {
  margin-top: 40px;
}
#product .product-info .product-name {
  font-weight: normal;
  font-size: 24px;
  color: #212121;
  text-align: center;
}
#product .product-info .product-desc {
  font-size: 14px;
  color: #616161;
  margin-top: 20px;
}
#product .product-info .product-price {
  padding: 20px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
#product .product-info .price-text {
  color: var(--color-topic);
  font-size: 16px;
}
#product .product-info .product-price > .price {
  color: var(--color-topic);
  font-size: 24px;
}
#product .product-select .title {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 15px;
}
#product .select-item {
  display: inline-block;
  height: 40px;
  padding: 0 5px 0 20px;
  line-height: 40px;
  border: 1px solid #ccc;
  margin-right: 25px;
  font-size: 16px;
  margin-bottom: 20px;
}
#product .select-item > .name {
  display: inline-block;
  color: #212121;
  margin-right: 10px;
}
#product .select-item > .price {
  display: inline-block;
  color: #999;
  width: 100px;
  margin: 0;
  font-size: 16px;
}
#product .product-info .product-store {
  font-size: 16px;
  color: #616161;
}
#product .product-info .product-store span:last-child {
  color: var(--color-assist);
}
#product .product-info .product-number {
  font-size: 16px;
  color: #616161;
  height: 80px;
  background-color: #fafafa;
  padding: 0 40px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 80px;
  position: relative;
}
#product .product-number .wrapper {
  position: absolute;
  left: 20%;
  top: 50%;
  height: 38px;
  line-height: 38px;
  transform: translate(0, -50%);
  border: 1px solid #ccc;
  overflow: hidden;
}
#product .product-number .btn-item {
  display: inline-block;
  width: 38px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #666;
  line-height: 38px;
}
#product .product-number .btn-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
#product .product-number .counter {
  display: inline-block;
  width: 72px;
  background-color: #fff;
  text-align: center;
  line-height: 38px;
  color: #666;
}
#product .info-bom {
  height: 54px;
  line-height: 54px;
}
#product .info-bom .total {
  font-size: 30px;
  color: var(--color-topic);
}
#product .info-bom .collect {
  width: 100px;
  height: 54px;
  font-size: 26px;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  border: 1px solid #ddd;
  border-radius: 50px;
  color: #999;
}
#product .info-bom .isCollect {
  border-color: var(--color-topic);
  color: var(--color-topic);
}
#product .info-bom .add-cart {
  width: 300px;
  height: 54px;
  background-color: var(--color-topic);
  font-size: 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
#product .info-bom .collect > span {
  font-family: "icomoon";
}
#product .info-bom .add-cart > span,
#product .info-bom .collect > span {
  position: relative;
}
#product .body-text {
  line-height: 40px;
  margin-bottom: 40px;
}
#product .isSelected {
  border: 1px solid var(--color-topic);
}
#product .isSelected .name,
#product .isSelected .price {
  color: var(--color-topic);
}
#product > .product-loading {
  position: relative;
  width: 1266px;
  margin: 0 auto;
  height: 480px;
}
#product > .product-loading .product-loading-row {
  right: 50%;
  right: none;
  transform: translate(50%, -50%);
}
#product .comment {
  margin-top: 20px;
}
#product .comment .title {
  line-height: 40px;
  font-size: 14px;
  background-color: #f6f6f6;
  color: #666;
  padding-left: 5px;
  box-sizing: border-box;
}
</style>
