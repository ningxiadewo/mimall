<template>
  <div class="swiper-box">
    <!-- 左边菜单 -->
    <div class="nav-menu">
      <ul>
        <li class="nav-menu-item">
          <a href="javascript:;">手机 电话卡</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[0]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">电视 盒子</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[1]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">笔记本 显示器 平板</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[2]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">家电 插线板</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[3]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">出行 穿戴</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[4]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">智能 路由器</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[5]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">电源 配件</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[6]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">健康 儿童</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[7]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">耳机 音箱</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[8]"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">生活 箱包</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList[9]"
          ></nav-product>
        </li>
      </ul>
    </div>

    <!-- 轮播图 -->
    <swiper :options="swiperOption" v-if="swiperSlides.length">
      <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
        <a :href="'/product/' + item.ID">
          <img :src="item.imgurl" alt="" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import NavProduct from "./NavProduct";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "swiper-box",
  props: {
    swiperSlides: {
      type: Array,
      default() {
        return [];
      }
    },
    navProductList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        speed: 1500,
        effect: "fade",
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    NavProduct,
    swiper,
    swiperSlide
  }
};
</script>

<style>
/* 菜单栏 */
.swiper-box .nav-menu {
  width: 243px;
  height: 460px;
  position: absolute;
  z-index: 9;
  background-color: rgba(105, 101, 101, 0.6);
  padding: 20px 0;
  box-sizing: border-box;
}
.swiper-box .nav-menu .nav-menu-item {
  height: 42px;
  line-height: 42px;
  padding-left: 30px;
}
.swiper-box .nav-menu .nav-menu-item:hover {
  background-color: #ff6700;
}
.swiper-box .nav-menu .nav-menu-item a {
  position: relative;
  font-size: 14px;
  color: #fff;
}
.swiper-box .nav-menu .nav-menu-item a::before {
  position: absolute;
  right: 10%;
  top: 50%;
  content: "";
  width: 16px;
  height: 16px;
  background: url("/imgs/icon-arrow.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.swiper-box .nav-menu-item:hover .item-children {
  display: block;
}
/* 轮播图 */
.swiper-box .swiper-container {
  height: 460px;
}
.swiper-box .swiper-button-prev {
  width: 35px;
  height: 60px;
  left: 247px;
  background: url("/imgs/icon-slides.png") no-repeat -84px 50%;
}
.swiper-box .swiper-button-prev:hover {
  background-position: -5px 50%;
}
.swiper-box .swiper-button-next {
  width: 35px;
  height: 60px;
  background: url("/imgs/icon-slides.png") no-repeat -130px 50%;
}
.swiper-box .swiper-button-next:hover {
  background-position: -50px 50%;
}
.swiper-box .swiper-pagination-bullet-active {
  background-color: #ff6700;
}
.swiper-box .swiper-pagination {
  padding-left: 100px;
}
.swiper-box a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.swiper-box img {
  width: 100%;
  height: 100%;
}
</style>
