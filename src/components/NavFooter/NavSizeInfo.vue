<template>
  <div class="nav-size-info">
    <div class="size-info-logo"></div>
    <div class="size-info-text">
      <ul>
        <li>环保商城</li>
        <li>环保之家</li>
        <li>环保保护规则</li>
        <li>环保用户协议</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-size-info"
};
</script>

<style>
.nav-size-info {
  height: 90px;
  overflow: hidden;
  padding-left: 350px;
  display: flex;
  line-height: 90px;
  background: #fafafa;
}
.size-info-logo {
  width: 55px;
  height: 55px;
  background: url("/imgs/mi-logo.png") no-repeat;
  background-size: contain;
  background-color: #ff6700;
  margin-top: 15px;
  margin-right: 30px;
}
.size-info-text li {
  float: left;
  font-size: 14px;
  text-align: center;
  margin-right: 30px;
}
.size-info-text li::after {
  display: inline-block;
  content: "";
  width: 1px;
  height: 10px;
  background-color: #757575;
  margin-left: 15px;
}
.size-info-text li:last-child::after {
  height: 0;
}
</style>
