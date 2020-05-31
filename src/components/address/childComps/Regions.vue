<template>
  <div class="regions" v-show="displayRegions">
    <div class="select-box clear-fix">
      <div
        class="select-item fl"
        v-for="(item, regions) in title"
        :key="regions"
        v-show="item.show"
        @click="tabRegions(regions)"
      >
        {{ item.name }}
        <span :class="{ selected: currentregions === regions }"></span>
      </div>
    </div>
    <!-- 加载中 -->
    <div class="regions-loading" v-show="showLoading">
      <loading class="regions-loading-row" :loadingNum="2" />
    </div>
    <div class="option-box" v-show="!showLoading">
      <ul>
        <li
          class="option-item fl"
          v-for="(item, regions) in currentRegions"
          :key="regions"
          @click.stop="selectRegion(item)"
          v-show="currentregions > 0"
        >
          {{ item.fullname }}
        </li>
      </ul>
      <ul>
        <li
          class="option-item fl"
          v-for="(item, regions) in currentRegions"
          :key="regions"
          v-show="currentregions === 0"
          @click.stop="selectRegion(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="cancel" @click="cancel">
      <button>取消</button>
    </div>
  </div>
</template>

<script>
import { getChildrenData } from "network/address";

import Loading from "components/loading/Loading";

export default {
  name: "regions",
  components: {
    Loading,
  },
  props: {
    displayRegions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: [
        // 选择的标题
        {
          name: "选择省/自治区",
          show: true,
        },
        {
          name: "选择城市/地区",
          show: false,
        },
        {
          name: "选择区/县",
          show: false,
        },
        {
          name: "选择配送区域",
          show: false,
        },
      ],
      regions: {
        // 从服务端获取的地区信息
        provs: [], // 省
        citys: [], // 城市
        countys: [], // 县
        towns: [], // 城镇
      },
      region: "", // 提交的地址
      orginTitle: [
        // 初始化选择标题
        "选择省/自治区",
        "选择城市/地区",
        "选择区/县",
        "选择配送区域",
      ],
      currentRegions: [], // 当前页面展示的地区信息
      currentregions: 0, // 当前选中展示的索引号，从省到城镇（0~3）
      showLoading: true,
    };
  },
  created() {
    this.selectRegion();
  },
  methods: {
    selectRegion(item) {
      this.showLoading = true;
      // 判断退出条件
      if (this.currentregions === 3) {
        this.region = "";
        this.title[3].name = item.fullname;
        this.title.forEach((item) => {
          this.region += item.name + " ";
        });
        this.$emit("getRegion", this.region, false);
        this.showLoading = false;
        return;
      }
      // 第一种是二三四级地区的情况需要发送id
      if (item) {
        // 直辖市判断
        if (
          (this.currentregions === 0 && item.name === "北京") ||
          (this.currentregions === 0 && item.name === "上海") ||
          (this.currentregions === 0 && item.name === "天津") ||
          (this.currentregions === 0 && item.name === "重庆")
        ) {
          {
            this.currentRegions = [item];
            this.saveInfo(item, "citys", this.currentRegions, 1);
            this.showLoading = false;
            return;
          }
        }
        getChildrenData({ id: item.id })
          .then((res) => {
            if (res.status === 0) {
              // 储存从服务端获取的地区信息
              switch (this.currentregions) {
                case 0:
                  this.saveInfo(item, "citys", res.result[0], 1);
                  break;
                case 1:
                  this.saveInfo(item, "countys", res.result[0], 2);
                  break;
                case 2:
                  this.saveInfo(item, "towns", res.result[0], 3);
                  break;
              }
              console.log(1);

              this.showLoading = false;
              console.log(2);

              // 更新显示的区域
              this.currentRegions = res.result[0];
            }
          })
          .catch((err) => {
            console.log(err);

            this.$toach.show("请求错误，请刷新重试");
          });
      } else {
        // 第二种是顶级地区的情况不需要发送id
        // 发送网络请求
        getChildrenData()
          .then((res) => {
            console.log(res);
            if (res.status === 0) {
              this.showLoading = false;
              // 储存从服务端获取的地区信息
              this.saveInfo(item, "provs", res.result[0], 0);
              // 展示当前的地区信息
              this.currentRegions = res.result[0];
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toach.show("请求错误，请刷新重试");
          });
      }
    },
    tabRegions(regions) {
      this.currentregions = regions;
      switch (regions) {
        case 0:
          this.currentRegions = this.regions.provs;
          break;
        case 1:
          this.currentRegions = this.regions.citys;
          break;
        case 2:
          this.currentRegions = this.regions.countys;
          break;
        case 3:
          this.currentRegions = this.regions.towns;
          break;
      }
    },
    cancel() {
      //  检查选择地区是否为空
      if (this.region === "") {
        console.log("1");
        this.$emit("getRegion", this.region, true);
      } else {
        console.log("2");

        this.$emit("getRegion", this.region, false);
      }
    },
    /**
     * item: Object 当前点击中的地区
     * child: String 当前所在的区域 如citys
     * res: Array 从服务端返回的数据
     * regions: 当前的区域的索引号
     */
    saveInfo(item, child, res, regions) {
      // 储存从服务端返回的数据
      this.regions[child] = res;
      // 更新区域索引号
      this.currentregions = regions;
      // 更新标题名字
      // regions=0 不用更新切换的标题名字
      if (regions > 0) {
        if (child === "citys") {
          this.title[regions - 1].name = item.name;
        } else {
          this.title[regions - 1].name = item.fullname;
        }
      }
      // 更新标题的显示，只有已经选择的区域和所在的区域显示标题
      for (let i = 1; i < this.title.length; i++) {
        // 已选择区域或者所在区域
        if (i <= this.currentregions) {
          this.title[i].show = true;
        } else {
          // 未选择的区域
          this.title[i].show = false;
        }
      }
      // 初始化当前正在选择的标题名字
      this.title[regions].name = this.orginTitle[regions];
    },
    // initTitle() {
    //   this.title.forEach((item, i)=> {
    //     if (i>=this.currentregions) {
    //       this.title.name = this.orginTitle[i];
    //     }
    //   })
    // }
  },
};
</script>

<style>
.regions {
  position: absolute;
  left: 0;
  top: -24px;
  width: 100%;
  height: 314px;
  background-color: #fff;
  border: 1px solid var(--color-topic);
  z-index: 9;
  box-sizing: border-box;
  padding: 40px 0;
}
.regions .select-box {
  padding-top: 6px;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}
.regions .select-box .select-item {
  height: 30px;
  line-height: 30px;
  margin-right: 3%;
  color: var(--color-topic);
  cursor: pointer;
}
.regions .select-box .select-item .selected {
  width: 100%;
  height: 2px;
  background-color: red;
  display: block;
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
  color: var(--color-topic);
}
.regions > .cancel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
}
.regions > .cancel > button {
  width: 160px;
  background: #b0b0b0;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  border: none;
  cursor: pointer;
}
.regions > .cancel > button:hover {
  opacity: 0.7;
}
.regions .regions-loading {
  position: relative;
  width: 580px;
  margin: 0 auto;
  height: 200px;
}
.regions .regions-loading .regions-loading-row {
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
