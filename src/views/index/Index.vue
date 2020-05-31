<template>
  <!-- 主页详情内容 -->
  <div id="index">
    <!-- 头部 -->
    <nav-header />
    <!-- 加载中 -->
    <div class="index-loading" v-show="showLoading">
      <loading class="index-loading-row" :loadingNum="2" />
    </div>
    <!-- 中间主要内容 -->
    <div class="container" v-show="!showLoading">
      <category />
      <index-swiper :swiperSlides="swiperSlides" ref="swiper"></index-swiper>
      <!-- <index-abs :productAbsList="productAbsList"></index-abs> -->
      <index-fast
        :fastProductList="fastProductList"
        :endTime="endTime"
      ></index-fast>
      <index-main
        :title="'过滤设备'"
        :mainProductList="mainProductList.filter"
      ></index-main>
      <index-main
        :title="'环保材料'"
        :mainProductList="mainProductList.material"
      ></index-main>
      <index-main
        :title="'节能清洁'"
        :mainProductList="mainProductList.chemistry"
      ></index-main>
      <index-back-top></index-back-top>
    </div>
    <!-- 底部 -->
    <nav-footer />
  </div>
</template>

<script>
// 公共子组件
import NavHeader from "components/navheader/NavHeader";
import Category from "components/category/Category";
import NavFooter from "components/NavFooter/NavFooter";
import loading from "components/loading/Loading";

// 子组件
import IndexSwiper from "./childComps/IndexSwiper";
// import IndexAbs from "./childComps/IndexAbs";
import IndexFast from "./childComps/IndexFast";
import IndexMain from "./childComps/IndexMain";
import IndexBackTop from "./childComps/IndexBackTop";

// 网络请求
import { getIndexData } from "network/index.js";

export default {
  name: "index",
  components: {
    NavHeader,
    Category,
    NavFooter,
    loading,
    IndexSwiper,
    // IndexAbs,
    IndexFast,
    IndexMain,
    IndexBackTop,
  },
  data() {
    return {
      // 轮播图
      swiperSlides: [],
      // 轮播图下的四个广告位
      // productAbsList: [],
      // 产品闪购图片
      fastProductList: [],
      // 10张图片
      mainProductList: {},
      // 倒计时
      endTime: "23:00:00",
      showLoading: true, // 加载中
    };
  },
  created() {
    // 首页数据请求
    this.getIndexData();
  },
  methods: {
    /**
     * 网络请求部分
     */
    getIndexData(res) {
      getIndexData()
        .then((res) => {
          // this.productAbsList = res.data.abs;
          this.swiperSlides = res.data.swiper;
          this.fastProductList = res.data.fast;

          this.mainProductList = res.data.main;
          this.mainProductList.filter = res.data.main.filter;
          this.showLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$toach.show("当前网络较差，请刷新重试");
        });
    },
  },
};
</script>

<style>
#index {
  background-color: #f4f4f4;
}
#index > .index-loading {
  position: relative;
  width: 1266px;
  margin: 0 auto;
  height: 480px;
}
#index > .index-loading .index-loading-row {
  right: 50%;
  right: none;
  transform: translate(50%, -50%);
}
</style>
