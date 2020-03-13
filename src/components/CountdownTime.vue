<template>
  <div class="countdown-time" v-show="!flag">
    <p class="time-item">
      {{ timeObj.h }}
    </p>
    <i>:</i>
    <p class="time-item">
      {{ timeObj.m }}
    </p>
    <i>:</i>
    <p class="time-item">
      {{ timeObj.s }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeObj: {},
      flag: false
    };
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        // 倒计时结束，清除定时器
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  props: {
    endTime: {
      type: String
    }
  },
  methods: {
    timeDown() {
      const nowTime = new Date();
      const nowData = nowTime.toLocaleDateString().replace(/\//g, "-");
      const endTime = new Date(
        nowTime.toLocaleDateString() + " " + this.endTime
      );
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      // 倒计时结束
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.timeObj = {
        d,
        h,
        m,
        s
      };
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>

<style>
.countdown-time {
  padding: 0 15px;
}
.countdown-time i {
  height: 46px;
  float: left;
  font-style: normal;
  line-height: 46px;
  margin: 5px;
}
.countdown-time .time-item {
  float: left;
  height: 46px;
  width: 46px;
  font-size: 24px;
  background-color: #605751;
  color: #fff;
  margin: 5px;
  text-align: center;
  line-height: 46px;
}
</style>
