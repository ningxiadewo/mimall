<template>
  <transition name="fade">
    <div class="toach" v-show="isShow">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "toach",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = "这是提示框", duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style>
.toach {
  position: fixed;
  left: 50%;
  top: 30%;
  font-size: 14px;
  background-color: rgba(251, 5, 17, 0.1);
  transform: translate(-50%, 0);
  color: rgb(241, 80, 80);
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  text-align: center;
  width: 300px;
  border-radius: 10px;
  /* transition: all 1s linear; */
}

.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s;
}
.fade-enter,
.fade-leave-to {
  height: 0;
}
.fade-leave,
.fade-enter-to {
  height: 50px;
}
</style>
