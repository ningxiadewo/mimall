<template>
  <div class="swiper-box">
    <!-- 轮播图 -->
    <div
      class="wrapper"
      @mouseenter="swiperBox.autoplay.stop()"
      @mouseleave="swiperBox.autoplay.start()"
    >
      <swiper
        :options="swiperOption"
        v-if="swiperSlides.length"
        ref="swiperBox"
      >
        <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
          <!-- <a :href="'/product/' + item.ID"> -->
          <img :src="item.imgurl" alt="" />
          <!-- </a> -->
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "index-swiper",
  props: {
    swiperSlides: {
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
  computed: {
    swiperBox() {
      return this.$refs.swiperBox.swiper;
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style>
/* 轮播图 */
.swiper-box .swiper-container {
  height: 460px;
}
.swiper-box .swiper-button-prev {
  width: 35px;
  height: 60px;
  left: 247px;
  background: url("~assets/imgs/index/icon-slides.png") no-repeat -84px 50%;
}
.swiper-box .swiper-button-prev:hover {
  background-position: -5px 50%;
}
.swiper-box .swiper-button-next {
  width: 35px;
  height: 60px;
  background: url("~assets/imgs/index/icon-slides.png") no-repeat -130px 50%;
}
.swiper-box .swiper-button-next:hover {
  background-position: -50px 50%;
}
.swiper-box .swiper-pagination-bullet-active {
  background-color: var(--color-topic);
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
