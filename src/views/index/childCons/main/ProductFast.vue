<template>
  <!-- 小米闪购 -->
  <div class="product-fast">
    <div class="fast-title">
      <h3 class="index-big-title">小米闪购</h3>
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
      <div class="fast-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in fastProductList" :key="index">
            <ul class="fast-swiper-col">
              <li
                v-for="(sub, number) in item"
                :key="number"
                class="fast-swiper-row"
              >
              <a :href="/product/ + sub.ID">
                  <img :src="sub.imgurl" alt="" />
                  <h3 class="index-title">{{ sub.title }}</h3>
                  <p class="index-desc">{{ sub.desc }}</p>
                  <p class="index-price">{{ sub.price }}元</p>
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
  name: "product-fast",
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
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 2500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    downTime() {
      return this.endTime.substr(0, 5) + " 场";
    }
  }
};
</script>

<style>
.product-fast {
  position: relative;
}
.product-fast .fast-title .swiper-button-prev {
  top: 28px;
  left: 234px;
  border: 1px solid #fb8e45;
  background: url(/imgs/icon-slides.png) no-repeat -84px 50%;
}
.product-fast .fast-title .swiper-button-next {
  top: 28px;
  left: 1235px;
  border: 1px solid #fb8e45;
  background: url(/imgs/icon-slides.png) no-repeat -130px 50%;
}
.fast-produts .fast-time {
  width: 234px;
  height: 340px;
  padding-top: 40px;
  text-align: center;
  box-sizing: border-box;
  border-top: 1px solid#e53935;
  background-color: #f1eded;
}
.fast-produts .fast-time .current-time {
  height: 46px;
  color: #ef3a3b;
  font-size: 22px;
  padding-top: 15px;
}
.fast-produts .fast-time .fast-bgimg {
  width: 40px;
  height: 40px;
  background: url("/imgs/logo-footer.png") no-repeat;
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
  border-top: 1px solid #ff00d477;
}
.fast-produts .fast-swiper .fast-swiper-row img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 30px auto;
}
</style>
