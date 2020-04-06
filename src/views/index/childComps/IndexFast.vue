<template>
  <!-- 小米闪购 -->
  <div class="product-fast">
    <div class="fast-title">
      <h3 class="big-title">产品闪购</h3>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
    <div class="fast-produts">
      <!-- 倒计时 -->
      <div class="fast-time">
        <p class="current-time">
          {{ downTime }}
        </p>
        <div class="fast-bgimg"></div>
        <p class="time-text">{{ timeText }}</p>
        <countdown-time
          @time-end="timeText = '倒计时结束'"
          :endTime="endTime"
        ></countdown-time>
      </div>
      <!-- 产品轮播 -->
      <div
        class="fast-swiper"
        @mousemove="fastSwiper.autoplay.stop()"
        @mouseleave="fastSwiper.autoplay.start()"
      >
        <swiper
          :options="swiperOption"
          ref="fastSwiper"
          v-if="fastProductList.length > 0"
        >
          <swiper-slide v-for="(item, index) in fastProductList" :key="index">
            <ul class="fast-swiper-col">
              <li
                v-for="(sub, number) in item"
                :key="number"
                class="fast-swiper-row"
              >
                <a :href="/product/ + sub.spu_id">
                  <img :src="sub.imgurl" alt="" />
                  <h3 class="title">{{ sub.title }}</h3>
                  <p class="intro">{{ sub.intro }}</p>
                  <p class="price">{{ sub.price }}元起</p>
                </a>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import CountdownTime from "components/CountdownTime";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "index-fast",
  components: {
    CountdownTime,
    swiper,
    swiperSlide
  },
  props: {
    fastProductList: {
      type: Array,
      default() {
        return [];
      }
    },
    endTime: {
      type: String
    }
  },
  data() {
    return {
      timeText: "距离结束还有",
      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 1000,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    downTime() {
      // 截取时间
      return this.endTime.substr(0, 5) + " 场";
    },
    fastSwiper() {
      return this.$refs.fastSwiper.swiper;
    }
  }
};
</script>

<style>
.product-fast {
  position: relative;
}
.product-fast .fast-title .big-title {
  height: 58px;
  font-size: 22px;
  color: #333;
  line-height: 58px;
  font-weight: normal;
}
.fast-produts .price {
  color: var(--color-topic);
  font-size: 14px;
  margin-top: 20px;
}
.fast-produts .intro {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
  color: #b0b0b0;
}
.fast-produts .title {
  margin: 0 20px 3px;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  color: #212121;
  overflow: hidden;
  white-space: nowrap;
}
.product-fast .fast-title .swiper-button-prev {
  top: 28px;
  left: 234px;
  background: url(~assets/imgs/index/icon-slides.png) no-repeat -84px 50%;
}
.product-fast .fast-title .swiper-button-prev {
  background-position: -5px 50%;
}
.product-fast .fast-title .swiper-button-next {
  top: 28px;
  left: 1235px;
  background: url(~assets/imgs/index/icon-slides.png) no-repeat -130px 50%;
}
.product-fast .fast-title .swiper-button-next {
  background-position: -50px 50%;
}
.fast-produts .fast-time {
  width: 234px;
  height: 340px;
  padding-top: 40px;
  text-align: center;
  box-sizing: border-box;
  border-top: 1px solid var(--color-topic);
  background-color: #f1eded;
}
.fast-produts .fast-time .current-time {
  height: 46px;
  color: var(--color-assist);
  font-size: 22px;
  padding-top: 15px;
}
.fast-produts .fast-time .fast-bgimg {
  width: 120px;
  height: 55px;
  background: url("~assets/imgs/logo.png") no-repeat;
  background-size: contain;
  margin: 25px auto;
}
.fast-produts .fast-time .time-text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 20px;
}
.fast-produts .fast-swiper {
  position: absolute;
  left: 234px;
  top: 58px;
}
.fast-produts .fast-swiper .swiper-container {
  width: 1040px;
  height: 340px;
}
.fast-produts .fast-swiper .fast-swiper-row {
  float: left;
  margin-left: 24px;
  background-color: #fff;
  width: 234px;
  height: 340px;
  text-align: center;
  border-top: 1px solid var(--color-assist);
  transition: all 0.5s;
}
.fast-produts .fast-swiper .fast-swiper-row:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
}
.fast-produts .fast-swiper .fast-swiper-row img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 30px auto;
}
</style>
