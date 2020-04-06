<template>
  <div class="tool-bar" :class="{ showTop: isShowTop }">
    <!-- <div class="tool-bar-item">
      <a href="javascript:;">
        <img src="/imgs/icon-phone.png" alt="" />
        <img src="/imgs/icon-phone-hover.png" alt="" />
        <span>手机扫一扫</span>
      </a>
    </div>
    <div class="tool-bar-item">
      <a href="javascript:;">
        <img src="/imgs/icon-people.png" alt="" />
        <img src="/imgs/icon-people-hover.png" alt="" />
        <span>个人中心</span>
      </a>
    </div>
    <div class="tool-bar-item">
      <a href="javascript:;">
        <img src="/imgs/icon-set.png" alt="" />
        <img src="/imgs/icon-set-hover.png" alt="" />
        <span>售后服务</span>
      </a>
    </div>
    <div class="tool-bar-item">
      <a href="javascript:;">
        <img src="/imgs/icon-service.png" alt="" />
        <img src="/imgs/icon-service-hover.png" alt="" />
        <span>人工服务</span>
      </a>
    </div>
    <div class="tool-bar-item">
      <a href="javascript:;">
        <img src="/imgs/icon-cart.png" alt="" />
        <img src="/imgs/icon-cart-hover.png" alt="" />
        <span>购物车</span>
      </a>
    </div> -->
    <!-- 返回顶部 -->
    <div class="tool-bar-item">
      <a href="javascript:;" @click="backTop">
        <span class="icon-top"></span>
        顶部
        <!-- <img src="/imgs/icon-cart.png" alt="" />
        <img src="/imgs/icon-cart-hover.png" alt="" /> -->
        <!-- <span>回顶部</span> -->
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "index-back-top",
  data() {
    return {
      scrollTop: 0,
      isShowTop: false
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scrollToTop);
  },
  methods: {
    scrollToTop() {
      // 获取当前距离顶部的距离
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 300) {
        this.isShowTop = true;
      } else {
        this.isShowTop = false;
      }
    },
    backTop() {
      let timer = setInterval(() => {
        // 每16毫秒进行一次小滑动， 滑动距离为isppeed
        let ispeed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style>
.tool-bar {
  position: fixed;
  bottom: 10%;
  right: 20px;
  z-index: 99999;
  background-color: #fff;
  display: none;
}
.tool-bar .tool-bar-item {
  position: relative;
  width: 58px;
  height: 60px;
  box-sizing: border-box;
  /* line-height: 60px; */
  /* border: 1px solid #f5f5f5; */
}
.tool-bar .tool-bar-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px 0 0 0;
  text-align: center;
  font-size: 16px;
  color: #999;
  box-sizing: border-box;
  transition: all 0.5s;
}
.tool-bar .tool-bar-item a .icon-top {
  display: block;
  font-family: "icomoon";
  /* font-size: 20px; */
}
.tool-bar .tool-bar-item a:hover {
  background-color: var(--color-topic);
  color: #fff;
}
.showTop {
  display: block;
}
/* .tool-bar .tool-bar-item img {
  display: block;
  width: 20px;
  height: 20px;
  margin: 15px 7.5px;
} */
/* .tool-bar .tool-bar-item a:hover img:first-child,
.tool-bar .tool-bar-item img:nth-child(2),
.tool-bar .tool-bar-item a span,
.tool-bar .tool-bar-item a span::after {
  display: none;
}
.tool-bar .tool-bar-item a:hover img:nth-child(2),
.tool-bar .tool-bar-item a:hover span,
.tool-bar .tool-bar-item a:hover span::after {
  display: block;
}
.tool-bar .tool-bar-item a span {
  position: absolute;
  right: 40px;
  top: 50%;
  height: 30px;
  width: 60px;
  background-color: #fff;
  line-height: 30px;
  padding: 0 10px;
  color: #333;
  transform: translate(0, -50%);
  text-align: center;
}
.tool-bar .tool-bar-item a span::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -16px;
  width: 0;
  height: 0;
  border-color: transparent transparent transparent #fff;
  border-style: solid;
  border-width: 8px;
  transform: translate(0, -50%);
} */
</style>
