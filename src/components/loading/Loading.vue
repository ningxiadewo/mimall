<template>
  <div class="loading">
    <div class="load-1" v-if="loadingNum === 1">
      <div class="ring"></div>
    </div>
    <div class="load-2" v-else>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    loadingNum: {
      // 用几号的loading展示 默认为1
      type: Number,
      default: 1,
    },
  },
};
</script>

<style>
.loading {
  position: absolute;
  right: -33px;
  top: 50%;
  transform: translate(0, -50%);
}
.load-1 .ring {
  animation: loading1 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}
.load-1 .ring {
  width: 8px;
  height: 8px;
  margin: 0 auto;
  padding: 4px;
  border: 4px dashed #fff;
  border-radius: 100%;
}
@keyframes loading1 {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.load-2 .line {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 30px;
}
.load-2 .line:nth-last-child(1) {
  animation: loading2 0.6s 0.1s linear infinite;
  background-color: #0be881;
}
.load-2 .line:nth-last-child(2) {
  animation: loading2 0.6s 0.1s linear infinite;
  background-color: #4bcffa;
}
.load-2 .line:nth-last-child(3) {
  animation: loading2 0.6s 0.1s linear infinite;
  background-color: #ff5e57;
}
@keyframes loading2 {
  25% {
    transform: translate(-50px, 0);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
