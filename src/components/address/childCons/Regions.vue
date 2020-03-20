<template>
  <div class="regions" :class="{ hide: hideRegions }">
    <div class="select-box clear-fix">
      <div class="select-item fl">
        {{ select.prov }}
      </div>
      <div class="select-item fl" :class="{ hide: show.city }">
        {{ select.city }}
      </div>
      <!-- <div class="select-item fl">选择区县</div>
      <div class="select-item fl">选择配送区域</div> -->
    </div>
    <div class="option-box">
      <ul :class="{ hide: show.props }">
        <li
          class="option-item fl"
          v-for="(item, index) in option.prov"
          :key="index"
          @click="enterProv($event)"
        >
          {{ item }}
        </li>
      </ul>
      <ul :class="{ hide: show.citys }">
        <li
          class="option-item fl"
          v-for="(item, index) in option.region"
          :key="index"
          @click="enterCity($event)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import provs from "@/api/prov";
import citys from "@/api/city";

export default {
  name: "regions",
  props: {
    hideRegions: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      select: {
        prov: "选择省/自治区",
        city: "选择城市或地区"
      },
      option: {
        prov: provs,
        city: citys,
        region: []
      },
      show: {
        provs: true, // 省份列表
        city: true, // 选择城市
        citys: true // 城市列表
      }
    };
  },
  methods: {
    enterProv(e) {
      this.show.city = false;
      this.show.props = true;

      this.select.prov = e.target.innerText;

      for (let i in this.option.city) {
        if (i == this.select.prov) {
          this.option.region = this.option.city[i];
        }
      }

      this.show.citys = false;
    },
    enterCity(e) {
      this.select.city = e.target.innerText;
      this.$emit("getRegion", this.select.prov + " " + this.select.city);

      // 初始化
      this.show = {
        provs: true, // 省份列表
        city: true, // 选择城市
        citys: true // 城市列表
      };
      this.select.prov = "选择省/自治区";
    }
  }
};
</script>

<style>
.regions {
  position: absolute;
  left: 0;
  top: -10px;
  width: 100%;
  height: 300px;
  background-color: #fff;
  border: 1px solid #ff6700;
  z-index: 9;
  box-sizing: border-box;
  padding: 40px 0;
}
.regions .select-box {
  padding: 6px 0;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}
.regions .select-box .select-item {
  height: 30px;
  line-height: 30px;
  margin-right: 3%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ff6700;
  cursor: pointer;
}
.regions .option-box {
  padding: 15px 0;
}
.regions .option-box .option-item {
  margin: 10px 10px 0 10px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
}
.regions .option-box .option-item:hover {
  color: #ff6700;
}
</style>
