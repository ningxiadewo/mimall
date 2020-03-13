<template>
  <div id="product">
    <nav-header :HeaderProductList="HeaderProductList"></nav-header>
    <!-- 吸顶标题 -->
    <div class="nav-bar" :class="{ isFixed: isFixed }">
      <div class="container">
        <span class="fl">{{ goodsInfo.name }}</span>
        <a class="fr" href="javascript:;">用户评价</a>
      </div>
    </div>
    <!-- 产品内容 -->
    <div class="container clear-fix">
      <div class="product-box">
        <!-- 轮播图 -->
        <div class="product-img fl">
          <!-- 轮播图 -->
          <swiper :options="swiperOption" v-if="goodsInfo.productImgList">
            <swiper-slide
              v-for="(item, index) in goodsInfo.productImgList"
              :key="index"
            >
              <img :src="item" alt="" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <!-- 描述 -->
        <div class="product-info fr">
          <div class="wrapper">
            <h2 class="product-name">
              {{ goodsInfo.name }}
            </h2>
            <p class="product-desc"></p>
            <div class="product-price">
              <span class="price">{{ goodsInfo.price }}元</span>
            </div>
            <!-- 地址 -->
            <div class="product-address">
              <span v-for="(item, index) in goodsInfo.place" :key="index">{{
                item
              }}</span>
            </div>
            <!-- 库存 -->
            <div class="product-store">
              <span>商品库存 </span>
              <span>{{ goodsInfo.storeNum }}件</span>
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
            <!-- 总价格 -->
            <div class="info-bom">
              <div class="total fl">
                <span>总计: </span>
                <span>{{ priceTotal }} 元</span>
              </div>
              <div class="add-cart fr" @click="addCart">加入购物车</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加入购物车成功后模态框 -->
    <modal
      :showModal="showMadal"
      :title="'提示'"
      :confirmText="'查看购物车'"
      :CloseText="'返回'"
      @onClose="showMadal = false"
      @onConfirm="$router.replace('/cart')"
    >
      <span slot="body">加入购物车成功</span>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader/NavHeader";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import NavFooter from "components/NavFooter/NavFooter";

import Modal from "components/Modal";

// 导入首页网络请求
import { getHeaderData } from "network/indexQequest.js";
import { getProductData } from "network/product.js";

import * as types from "../../store/mutations.types";

export default {
  name: "product",
  components: {
    NavHeader,
    NavFooter,
    swiper,
    swiperSlide,
    Modal
  },
  data() {
    return {
      id: this.$route.params.id,
      HeaderProductList: [],
      goodsInfo: {},
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true, // 循环模式选项
        speed: 800,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      offsetTop: 0, // 吸顶距离头部距离
      isFixed: false, // 吸顶是否要固定定位
      counter: 1, // 购买数量
      showMadal: false,
      priceTotal: 0
    };
  },
  created() {
    getHeaderData().then(res => {
      this.getHeaderData(res);
    });
    getProductData().then(res => {
      this.getProductData(res);
    });
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector(".nav-bar").offsetTop;
    });
  },
  // computed: {
  //   priceTotal() {
  //     if (typeof this.counter === "number") {
  //       return this.goodsInfo.price * this.counter + "元";
  //     }
  //   }
  // },
  methods: {
    /**
     * 标题吸顶判断
     */
    initHeight() {
      let scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollHeight > this.offsetTop ? true : false;
    },
    /**
     * 购买数量
     */
    decrease() {
      this.counter--;
      if (this.counter <= 1) {
        this.$toach.show("商品数量不可以少于1件喔！");
        this.counter = 1;
      }
      this.getPriceTotal();
    },
    increment() {
      this.counter++;
      if (this.counter >= this.goodsInfo.storeNum) {
        this.$toach.show(`商品数量仅剩${this.goodsInfo.storeNum}件了喔！`);
        this.counter = this.goodsInfo.storeNum;
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
        if (this.counter > this.goodsInfo.storeNum) {
          this.counter = this.goodsInfo.storeNum;
          this.$toach.show(
            `亲！商品仅剩数量${this.goodsInfo.storeNum}件了喔！`
          );
        }
        this.getPriceTotal();
      } else {
        this.counter = 1;
        this.getPriceTotal();
      }
    },
    /**
     * 加入购物车
     */
    addCart() {
      const _this = this;
      const userInfo = this.$store.state.userInfo;

      if (Object.keys(userInfo).length <= 0) {
        this.$router.replace("/login");
        return;
      }
      let goods = {
        id: _this.id,
        name: _this.goodsInfo.name,
        counter: _this.counter,
        img: _this.goodsInfo.productImgList[0],
        price: _this.goodsInfo.price,
        totalPrice: _this.goodsInfo.price * _this.counter,
        storeNum: _this.goodsInfo.storeNum,
        selected: true
      };
      this.$store.commit(types.ADD_CART, goods);
      this.showMadal = true;
    },
    /**
     * 网络请求部分
     */
    getHeaderData(res) {
      this.HeaderProductList = res.data;
    },
    getProductData(res) {
      this.goodsInfo = res.data;
      // 计算总价格
      this.getPriceTotal();
      console.log(this.priceTotal);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, false);
  }
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
#product .nav-bar .container > a {
  font-size: 14px;
  color: #616161;
}
#product .nav-bar > a:hover {
  color: #ff6700;
}
#product .isFixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
#product .product-box {
  padding: 32px 0;
}
#product .product-box .product-img {
  width: 45%;
  height: 560px;
}
#product .product-box .product-info {
  width: 55%;
  height: 560px;
}
/* 左边轮播图 */
#product .swiper-container {
  width: 560px;
  height: 560px;
}
#product .product-img img {
  width: 100%;
  height: 560px;
}
#product .swiper-button-prev {
  width: 35px;
  height: 60px;
  background: url("/imgs/icon-slides.png") no-repeat -84px 50%;
}
#product .swiper-button-prev:hover {
  background-position: -5px 50%;
}
#product .swiper-button-next {
  width: 35px;
  height: 60px;
  background: url("/imgs/icon-slides.png") no-repeat -130px 50%;
}
#product .swiper-button-next:hover {
  background-position: -50px 50%;
}
#product .product-img .swiper-pagination-bullet {
  width: 60px;
  height: 3px;
  border-radius: 0%;
  margin-right: 30px;
}
#product .product-img .swiper-pagination-bullet-active {
  background-color: #ff6700;
}
#product .product-info .wrapper > div {
  margin-top: 20px;
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
  color: #ff6700;
  font-size: 16px;
}
#product .product-info .price {
  color: #ff6700;
  font-size: 24px;
}
#product .product-info .product-address {
  height: 104px;
  background-color: #fafafa;
  padding: 0 40px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 104px;
}
#product .product-info .product-address span {
  margin-right: 10px;
}
#product .product-info .product-address::before {
  font-family: "icomoon";
  content: "\e947";
}
#product .product-info .product-store {
  font-size: 16px;
  color: #616161;
}
#product .product-info .product-store span:last-child {
  color: #e47429;
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
  color: #ff6700;
}
#product .info-bom .add-cart {
  width: 300px;
  height: 54px;
  background-color: #ff6700;
  font-size: 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
</style>
