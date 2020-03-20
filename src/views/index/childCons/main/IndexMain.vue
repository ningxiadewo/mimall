<template>
  <div class="index-main">
    <div class="container">
      <product-fast
        :fastProductList="fastProductList"
        :endTime="endTime"
      ></product-fast>
      <!-- 广告banner -->
      <!-- <div class="Abs-img">
        <img :src="longBannerList.list1.imgurl" alt="" />
      </div> -->

      <!-- 产品展示 -->
      <div class="product-box">
        <!-- 手机 -->
        <div class="product-title">
          <h3 class="index-big-title">手机</h3>
          <a href="javascript:;" class="product-all">
            查看全部
            <span class="icon-right"></span>
          </a>
        </div>
        <!-- 产品列表 -->
        <index-product-list
          :mainProductList="mainProductList.filter"
        ></index-product-list>
      </div>

      <!-- 广告banner -->
      <!-- <div class="Abs-img">
        <img :src="longBannerList.list2" alt="" />
      </div> -->

      <div class="product-box">
        <!-- 手机 -->
        <div class="product-title">
          <h3 class="index-big-title">家电</h3>
          <a href="javascript:;" class="product-all">
            查看全部
            <span class="icon-right"></span>
          </a>
        </div>
        <!-- 产品列表 -->
        <index-product-list
          :mainProductList="mainProductList.material"
        ></index-product-list>
      </div>

      <!-- 广告banner -->
      <!-- <div class="Abs-img">
        <img :src="longBannerList.list3" alt="" />
      </div> -->

      <!-- 产品展示 -->
      <div class="product-box">
        <!-- 手机 -->
        <div class="product-title">
          <h3 class="index-big-title">智能</h3>
          <a href="javascript:;" class="product-all">
            查看全部
            <span class="icon-right"></span>
          </a>
        </div>
        <!-- 产品列表 -->
        <index-product-list
          :mainProductList="mainProductList.chemistry"
        ></index-product-list>
      </div>
    </div>
  </div>
</template>

<script>
import ProductFast from "./ProductFast";

import IndexProductList from "./IndexProductList";

export default {
  name: "index-main",
  components: {
    ProductFast,
    IndexProductList
  },
  data() {
    return {
      savaLongBanner: {}
    };
  },
  props: {
    fastProductList: {
      type: Array,
      default() {
        return [];
      }
    },
    longBannerList: {
      type: Object,
      default() {
        return {};
      }
    },
    mainProductList: {
      type: Object,
      default() {
        return {};
      }
    },
    endTime: {
      type: String,
      default() {
        return "";
      }
    }
  }
};
</script>

<style>
.index-main {
  background-color: #f5f5f5;
}
.index-main .Abs-img {
  margin: 20px 0;
}
.index-main .Abs-img img {
  width: 1266px;
  height: 120px;
}
.product-box {
  overflow: hidden;
}
.product-box .product-title {
  display: flex;
  justify-content: space-between;
}
.product-box .product-title .product-all {
  display: inline-block;
  font-size: 16px;
  color: #424242;
  padding-left: 30px;
  line-height: 58px;
}
.product-box .product-all .icon-right {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background-color: #b0b0b0;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-left: 10px;
}
.product-box .product-all .icon-right::after {
  font-family: "icomoon";
  font-size: 20px;
  content: "\ea52";
}
.product-box .product-title .product-all:hover {
  color: #ff6700;
}
.product-box .product-title .product-all:hover .icon-right {
  background-color: #ff6700;
}
</style>
