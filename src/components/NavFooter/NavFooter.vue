<template>
  <div class="footer">
    <div class="nav-size-info clear-fix">
      <div class="container">
        <h1 class="size-info-logo fl"></h1>
        <div class="size-info-text fl">
          环保商城，用心购买健康的环保产品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
};
</script>

<style>
.nav-size-info {
  position: relative;
  height: 150px;
  line-height: 90px;
  background: #fafafa;
  overflow: hidden;
}
.nav-size-info > .container {
  box-sizing: border-box;
  padding: 40px 0 40px 350px;
  height: 100%;
}
.size-info-logo {
  width: 290px;
  height: 70px;
  background: url("~assets/imgs/logo.png") no-repeat;
  background-size: contain;
  margin: 0;
}
.size-info-text {
  line-height: 70px;
  font-size: 20px;
}
</style>
