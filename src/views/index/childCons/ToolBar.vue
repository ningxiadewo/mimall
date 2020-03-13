<template>
  <div class="tool-bar">
    <div class="tool-bar-item">
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
    </div>
    <!-- 返回顶部 -->
    <div class="toTop tool-bar-item"></div>
  </div>
</template>

<script>
export default {
  name: "tool-bar"
};
</script>

<style>
.tool-bar {
  position: fixed;
  top: 30%;
  right: 0;
  z-index: 999;
}
.tool-bar .tool-bar-item {
  position: relative;
  width: 35px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid #f5f5f5;
}
.tool-bar .tool-bar-item a {
  display: inline-block;
  width: 35px;
  height: 50px;
}
.tool-bar .tool-bar-item img {
  display: block;
  width: 20px;
  height: 20px;
  margin: 15px 7.5px;
}
.tool-bar .tool-bar-item a:hover img:first-child,
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
}
</style>
