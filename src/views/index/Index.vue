<template>
  <!-- 主页详情内容 -->
  <div id="index">
    <nav-header :HeaderProductList="HeaderProductList"></nav-header>
    <div class="container">
      <swiper
        :swiperSlides="swiperSlides"
        :navProductList="navProductList"
      ></swiper>
      <product-ads :productAbsList="productAbsList"></product-ads>
      <index-main
        :fastProductList="fastProductList"
        :longBannerList="longBannerList"
        :mainProductList="mainProductList"
        :endTime="endTime"
      ></index-main>
      <tool-bar></tool-bar>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader/NavHeader";

import Swiper from "./childCons/Swiper";
import ProductAds from "./childCons/ProductAds";
import IndexMain from "./childCons/main/IndexMain";
import ToolBar from "./childCons/ToolBar";

import NavFooter from "components/NavFooter/NavFooter";

// 导入首页网络请求
import { getIndexData, getHeaderData } from "network/indexQequest.js";

export default {
  name: "index",
  components: {
    NavFooter,
    NavHeader,
    Swiper,
    ProductAds,
    IndexMain,
    ToolBar
  },
  data() {
    return {
      // 头部隐藏数据
      HeaderProductList: [],
      // 轮播图
      swiperSlides: [],
      // 轮播图下的四个广告位
      productAbsList: [],
      // 轮播图左边的隐藏数据
      navProductList: [],
      // 12张轮播图
      fastProductList: [],
      // 三张长广告图
      longBannerList: {},
      // 10张图片
      mainProductList: {},
      // 倒计时
      endTime: "23:00:00"
    };
  },
  created() {
    getIndexData().then(res => {
      this.getIndexData(res);
    });
    getHeaderData().then(res => {
      this.getHeaderData(res);
    });
  },
  methods: {
    /**
     * 网络请求部分
     */
    getIndexData(res) {
      this.productAbsList = res.data.abs;
      this.swiperSlides = res.data.swiper;
      this.fastProductList = res.data.fast;
      // console.log(res);
      this.navProductList = res.data.nav;

      this.mainProductList = res.data.main;
    },
    getHeaderData(res) {
      this.HeaderProductList = res.data;
    }
  }
};
</script>

<style></style>
