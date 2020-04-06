<template>
  <div class="address clear-fix">
    <h3 class="title">收货信息</h3>
    <div
      class="address-item"
      :class="{ isActive: currentIndex == index }"
      v-for="(item, index) in addressInfo"
      :key="index"
      @click="currentIndex = index"
    >
      <dl>
        <dt>{{ item.name }}</dt>
        <dd>{{ item.tel | changeTel }}</dd>
        <dd>{{ item.prov }}</dd>
        <dd>{{ item.detail }}</dd>
      </dl>
    </div>
    <div class="address-item" @click="showModal = true">
      <div class="increment">
        <div class="icon"></div>
        <div class="text">收货地址</div>
      </div>
    </div>
    <Modal
      :title="'添加收货信息'"
      :showModal="showModal"
      @onConfirm="saveInfo"
      @onClose="showModal = false"
    >
      <div slot="body" class="address-write clear-fix">
        <div class="same-input fl" :class="{ formActive: active.name }">
          <label for="name">收货人姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="form.name"
            @focus="inputFocus('name')"
            @blur="inputBlur('name', 'emptyNameHide', 'errorNameHide')"
          />
          <p class="msg-error" :class="{ hide: error.emptyNameHide }">
            您还未输入姓名喔！
          </p>
          <p class="msg-error" :class="{ hide: error.errorNameHide }">
            收货人姓名不正确(2~20个中文或英文)
          </p>
        </div>
        <div class="same-input fr " :class="{ formActive: active.phone }">
          <label for="phone">手机号</label>
          <input
            type="text"
            id="phone"
            name="phone"
            v-model="form.phone"
            @focus="inputFocus('phone')"
            @blur="inputBlur('phone', 'emptyPhoneHide', 'errorPhoneHide')"
          />
          <p class="msg-error" :class="{ hide: error.emptyPhoneHide }">
            您还未输入手机号喔！
          </p>
          <p class="msg-error" :class="{ hide: error.errorPhoneHide }">
            手机号格式不正确（11位）
          </p>
        </div>
        <div
          class="same-input address-input long-input fl"
          :class="{ formActive: active.address }"
        >
          <label for="address">省 / 市 / 地区</label>
          <input
            type="text"
            id="address"
            name="address"
            v-model="form.address"
            @focus="inputFocus('address')"
            @blur="inputBlur('address', 'emptyAddressHide')"
            @click="btnAddress"
          />
          <p class="msg-error" :class="{ hide: error.emptyAddressHide }">
            您还未选择地区喔！
          </p>
          <Regions @getRegion="getRegion" :hideRegions="hideRegions"></Regions>
        </div>
        <div
          class="same-input long-input detail-input fl"
          :class="{ formActive: active.detail }"
        >
          <label for="add-detail">详细地址(具体到县、镇、门牌号等)</label>
          <textarea
            id="add-detail"
            name="add-detail"
            v-model="form.detail"
            @focus="inputFocus('detail')"
            @blur="inputBlur('detail', 'emptyDetailHide', 'errorDetailHide')"
          ></textarea>
          <p class="msg-error" :class="{ hide: error.emptyDetailHide }">
            您还未输入详细地址喔！
          </p>
          <p class="msg-error" :class="{ hide: error.errorDetailHide }">
            详细地址不正确（长度为3到30个字符）
          </p>
        </div>
        <div
          class="same-input long-input fl"
          :class="{ formActive: active.tag }"
        >
          <label for="tag">地址标签（如家 / 公司等，限五个字符内）</label>
          <input
            type="text"
            id="tag"
            name="tag"
            v-model="form.tag"
            @focus="inputFocus('tag')"
            @blur="inputBlur('tag', 'emptyTagHide', 'errorTagHide')"
          />
          <p class="msg-error" :class="{ hide: error.emptyTagHide }">
            您还未输入地址标签喔！
          </p>
          <p class="msg-error" :class="{ hide: error.errorTagHide }">
            地址标签不正确（长度为1到5个字符、如家或公司等）
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../Modal";

import Regions from "./childCons/Regions";

export default {
  name: "Address",
  components: {
    Modal,
    Regions
  },
  data() {
    return {
      addressInfo: [
        {
          name: "全海宁",
          tel: "18312294546",
          prov: "广东 中山市",
          detail: "石岐区电子科技大学中山学院北门"
        },
        {
          name: "彭晓彬",
          tel: "18312294546",
          prov: "广东 广州市",
          detail: "石岐区电子科技大学中山学院北门"
        }
      ],
      form: {
        name: "",
        phone: "",
        address: "",
        detail: "",
        tag: ""
      },
      active: {
        name: false,
        phone: false,
        address: false,
        detail: false,
        tag: false
      },
      error: {
        emptyNameHide: true,
        errorNameHide: true,
        emptyPhoneHide: true,
        errorPhoneHide: true,
        emptyAddressHide: true,
        emptyDetailHide: true,
        errorDetailHide: true,
        emptyTagHide: true,
        errorTagHide: true
      },
      hideRegions: true,
      showModal: false,
      currentIndex: 0 // 选中的地址
    };
  },
  methods: {
    /**
     * 显示选择地区
     */
    btnAddress() {
      this.hideRegions = false; // 显示地区信息
    },
    /**
     * 文本框焦点事件
     */
    inputFocus(key) {
      this.active[key] = true;
    },
    inputBlur(key, emptyHide, errorHide) {
      let reg;
      switch (key) {
        case "name":
          reg = /^[\u4E00-\u9FA5A-Za-z]{2,15}$/;
          break;
        case "phone":
          reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
          break;
        case "detail":
          reg = /^.{3,30}$/;
          break;
        case "tag":
          reg = /^.{1,5}$/;
          break;
        default:
          break;
      }
      if (key === "address") {
        if (this.form[key] === "") {
          this.active[key] = false;
          this.error.emptyAddressHide = false;
        }
      } else {
        if (this.form[key] === "") {
          this.active[key] = false;
          this.error[emptyHide] = false;
          this.error[errorHide] = true;
        } else if (reg.test(this.form[key])) {
          this.error[emptyHide] = true;
          this.error[errorHide] = true;
        } else {
          this.error[emptyHide] = true;
          this.error[errorHide] = false;
        }
      }
    },
    /**
     * 获得地区信息
     */
    getRegion(str) {
      this.active["address"] = true;
      this.form.address = str;
      this.hideRegions = true;
      this.error.emptyAddressHide = true; // 隐藏空地区提示
    },
    /**
     * 保存信息
     */
    saveInfo() {
      // 检查表单
      this.inputBlur("name", "emptyNameHide", "errorNameHide");
      this.inputBlur("phone", "emptyPhoneHide", "errorPhoneHide");
      this.inputBlur("address", "emptyAddressHide");
      this.inputBlur("detail", "emptyDetailHide", "errorDetailHide");
      this.inputBlur("tag", "emptyTagHide", "errorTagHide");

      let flag = true; // true 表单可以提交 false 不能提交

      for (let k in this.error) {
        if (this.error[k] === false) {
          flag = false;
          break;
        }
      }
      if (flag) {
        console.log("可以提交");
      }
    }
  },
  filters: {
    // 过滤电话号码
    changeTel(value) {
      return value.replace(value.substr(3, 4), "****");
    }
  }
};
</script>

<style>
.address .title {
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
  font-weight: normal;
}
.address .address-item {
  float: left;
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;
  transition: all 0.3s linear;
  margin-right: 20px;
}
.address .address-item dl {
  padding: 15px 24px 0;
}
.address .address-item dt {
  font-size: 18px;
  margin-bottom: 10px;
}
.address .address-item dd {
  font-size: 14px;
  line-height: 22px;
  color: #757575;
}
.address .increment .icon,
.address .increment .text {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s linear;
}
.address .increment .icon {
  font-family: "icomoon";
  top: 42%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #e0e0e0;
  color: #fff;
  font-size: 14px;
  border-radius: 50%;
}
.address .increment .text {
  font-size: 14px;
  color: #999;
  top: 58%;
}
.address .address-item:hover .icon {
  background-color: #666;
}
.address .address-item:hover,
.address .address-item:hover .text {
  color: #666;
  border-color: #999;
}

.address .address-write .same-input {
  width: 282px;
  height: 40px;
}
.address .address-write > div {
  position: relative;
}
.address .address-write .same-input input,
.address .address-write .same-input textarea {
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  padding: 10px 16px;
  box-sizing: border-box;
  color: #333;
  font-size: 14px;
}
.address .address-write label {
  position: absolute;
  left: 16px;
  top: 50%;
  font-size: 14px;
  z-index: 2;
  padding: 0 3px;
  line-height: 18px;
  color: #999;
  transform: translate(0, -50%);
  transition: all 0.5s;
  cursor: text;
}
.address .address-write .formActive label {
  top: 0;
  background-color: #fff;
  font-size: 12px;
  color: var(--color-topic);
}
.address .address-write .formActive input,
.address .address-write .formActive textarea {
  border-color: var(--color-topic);
}
.address .address-write .long-input {
  width: 100%;
  margin: 20px 0;
}
.address .address-write .long-input input {
  width: 100%;
  box-sizing: border-box;
}
.address .address-write .address-input input {
  cursor: pointer;
}
.address .address-write .detail-input {
  margin: 0;
}
.address .address-write .detail-input {
  height: 80px;
}
.address .address-write .msg-error {
  position: absolute;
  left: 0;
  top: -23px;
  font-size: 14px;
  color: #fff;
  height: 10px;
  line-height: 10px;
  padding: 6px 12px;
  background-color: #e53953;
  z-index: 5;
}
.address .address-write .msg-error::after {
  position: absolute;
  left: 27px;
  top: 22px;
  content: "";
  width: 0;
  height: 0;
  border-color: #e53953 transparent transparent transparent;
  border-width: 6px;
  border-style: solid;
}
.address .isActive {
  border-color: var(--color-topic);
  transition: none;
}
.address .isActive:hover {
  border-color: var(--color-topic);
}
</style>
