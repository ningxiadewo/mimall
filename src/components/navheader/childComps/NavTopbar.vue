<template>
  <!-- 顶部导航 -->
  <div class="nav-topbar">
    <div class="container">
      <div class="topbar-info">
        <a href="javaScript:;" @click="$router.push('/', () => {})">返回首页</a>
        <span>
          <a href="javaScript:;" @click="$emit('toMyProfile')">个人中心</a>
          <a href="javaScript:;" @click="$emit('toMyOrder')">我的订单</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-topbar",
};
</script>

<style>
.nav-topbar {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.nav-topbar a:hover {
  color: #fff;
}
.nav-topbar .container {
  position: relative;
}
.nav-topbar .topbar-info {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 40px;
}
.nav-topbar .container .topbar-info a {
  display: inline-block;
  color: #999;
}
.nav-topbar .container .topbar-info a:first-child::after {
  display: inline-block;
  content: "|";
  height: 14px;
  width: 1px;
  margin: 0 14px;
}
.nav-topbar .container .topbar-info a:hover {
  color: var(--color-topic);
}
</style>
