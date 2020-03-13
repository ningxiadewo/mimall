<template>
  <div class="address clear-fix">
    <h3 class="title">收货信息</h3>
    <div class="address-item">
      <div class="increment">
        <div class="icon"></div>
        <div class="text">收货地址</div>
      </div>
    </div>
    <Modal :title="'添加收货信息'" :showModal="true">
      <div slot="body" class="address-write clear-fix">
        <div class="same-input fl" :class="{ formActive: active.name }">
          <label for="name">收货人姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="form.name"
            @focus="inputFocus('name')"
            @blur="checkName"
          />
          <p class="msg-error" :class="{ hide: error.emptyName }">
            您还未输入姓名喔！
          </p>
          <p class="msg-error" :class="{ hide: error.errorName }">
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
            @blur="inputBlur('phone')"
          />
          <p class="msg-error">手机号码格式不正确</p>
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
            @blur="inputBlur('address')"
            @click="btnAddress"
          />
          <Regions @getRegion="getRegion" :hideRegions="hideRegions"></Regions>
        </div>
        <div
          class="same-input long-input detail-input fl"
          :class="{ formActive: active.detail }"
        >
          <label for="add-detail">详细地址</label>
          <textarea
            id="add-detail"
            name="add-detail"
            v-model="form.detail"
            @focus="inputFocus('detail')"
            @blur="inputBlur('detail')"
          ></textarea>
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
            @blur="inputBlur('tag')"
          />
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
        emptyName: true,
        errorName: true,
        emptyPhone: true,
        errorPhone: true,
        emptydetail: true,
        errordetail: true,
        emptyTag: true,
        errorTag: true
      },
      hideRegions: true
    };
  },
  methods: {
    btnAddress() {
      this.hideRegions = false;
    },
    /**
     * 文本框焦点事件
     */
    inputFocus(key) {
      this.active[key] = true;
    },
    inputBlur(key, value) {
      if (this.form[key] === "") {
        this.active[key] = false;
        if (value) {
          this.error[value] = false;
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
    },
    /**
     * 检查表单
     */
    checkName() {
      this.inputBlur("name", "emptyName");
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (reg.test(reg)) {
        console.log(1);
      } else {
        console.log(2);
      }
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
  color: #ff6700;
}
.address .address-write .formActive input {
  border-color: #ff6700;
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
  font-size: 12px;
  color: #fff;
  height: 10px;
  line-height: 10px;
  padding: 6px 10px;
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
</style>
