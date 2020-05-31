<template>
  <div class="address clear-fix">
    <h3 class="title">收货信息</h3>
    <!-- 展示的用户收货信息 -->
    <div
      v-show="addressInfo.length > 0"
      class="address-item"
      :class="{ isActive: currentIndex == index }"
      v-for="(item, index) in addressInfo"
      :key="index"
      @click="selectAddress(index)"
    >
      <dl>
        <dt>
          {{ item.addressee }}
          <span class="fr">{{ item.address_tag }}</span>
        </dt>
        <span class="address-del" @click.stop="_deleteAddress(item.address_id)"
          ></span
        >
        <dd>{{ item.mobile | changeMobile }}</dd>
        <dd>{{ item.address_area }}</dd>
        <dd>{{ item.address_name }}</dd>
        <dd class="change-address" @click.stop="changeAddress(index)">修改</dd>
      </dl>
    </div>
    <!-- 默认存在的用户地址 -->
    <div class="address-item" @click="addAddress">
      <div class="increment">
        <div class="icon"></div>
        <div class="text">添加收货信息</div>
      </div>
    </div>
    <!-- 表单 -->
    <Modal
      :title="'添加收货信息'"
      :showModal="showFormModal"
      @onConfirm="saveInfo"
      @onClose="close(form, active, empty, error)"
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
            @blur="inputBlur('name')"
          />
          <p class="msg-error" v-show="empty.name">
            您还未输入姓名喔！
          </p>
          <p class="msg-error" v-show="error.name">
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
          <p class="msg-error" v-show="empty.phone">
            您还未输入手机号喔！
          </p>
          <p class="msg-error" v-show="error.phone">
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
            @blur="inputBlur('address')"
          />
          <p class="msg-error" v-show="empty.address">
            您还未选择地区喔！
          </p>
          <span></span>
          <Regions
            @getRegion="getRegion"
            :displayRegions="displayRegions"
            v-if="displayRegions"
          ></Regions>
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
            @blur="inputBlur('detail')"
          ></textarea>
          <p class="msg-error" v-show="empty.detail">
            您还未输入详细地址喔！
          </p>
          <p class="msg-error" v-show="error.detail">
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
            @blur="inputBlur('tag')"
          />
          <p class="msg-error" v-show="empty.tag">
            您还未输入地址标签喔！
          </p>
          <p class="msg-error" v-show="error.tag">
            地址标签不正确（长度为1到5个字符、如家或公司等）
          </p>
        </div>
      </div>
    </Modal>
    <!-- 是否要删除地址的模态框 -->
    <Modal
      :title="'提示'"
      :showModal="showDelModal"
      @onConfirm="ModaDelAddress(addressId)"
      @onClose="showDelModal = false"
    >
      <div slot="body" class="modal-body-text">确定要删除该地址信息吗</div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Modal from "components/modal/Modal";

import Regions from "./childComps/Regions";

import {
  createAddress,
  showAddress,
  deleteAddress,
  changeAddress,
} from "network/address";

export default {
  name: "Address",
  components: {
    Modal,
    Regions,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    // 发送网络请求，获取用户的地址
    console.log(deleteAddress);

    this._showAddress();
  },
  data() {
    return {
      addressInfo: [],
      form: {
        // 绑定的表单
        name: "",
        phone: "",
        address: "",
        detail: "",
        tag: "",
      },
      active: {
        // 选中状态
        name: false,
        phone: false,
        address: false,
        detail: false,
        tag: false,
      },
      empty: {
        // 空字符
        name: false,
        phone: false,
        address: false,
        detail: false,
        tag: false,
      },
      error: {
        // 错误的字符
        name: false,
        phone: false,
        detail: false,
        tag: false,
      },
      displayRegions: false,
      showFormModal: false,
      currentIndex: 0, // 选中的地址
      addressId: 0, // 用户要删除的地址id
      showDelModal: false, // 删除提示模态框
      isChangeAddress: false, // 是否要修改地址
      changeIndex: -1,
    };
  },
  methods: {
    /**
     * 显示选择地区
     */
    btnAddress() {
      this.displayRegions = true; // 显示地区信息
    },
    /**
     * 文本框焦点事件
     */
    inputFocus(key) {
      this.active[key] = true;
      // 焦点选择省区
      if (key === "address") {
        this.btnAddress();
      }
    },
    inputBlur(key) {
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
          this.empty[key] = true;
        }
      } else {
        if (this.form[key] === "") {
          this.active[key] = false;
          this.empty[key] = true;
          this.error[key] = false;
        } else if (reg.test(this.form[key])) {
          this.empty[key] = false;
          this.error[key] = false;
        } else {
          this.empty[key] = false;
          this.error[key] = true;
        }
      }
    },
    /**
     * 获得地区信息
     */
    getRegion(str, emptyAddress) {
      this.active["address"] = true;
      this.form.address = str;
      this.displayRegions = false;
      this.empty.address = emptyAddress; // 隐藏空地区提示
      console.log(this.empty.address);
    },
    /**
     * 保存信息
     */
    saveInfo() {
      // 检查表单
      this.inputBlur("name");
      this.inputBlur("phone");
      this.inputBlur("address");
      this.inputBlur("detail");
      this.inputBlur("tag");

      // let flag = true; // true表单可以提交 false 不能提交

      // 判断表单控件是否有空 {
      for (let k in this.empty) {
        if (this.empty[k] === true) {
          // flag = false;
          return;
        }
      }
      // 判断表单是否有错
      for (let k in this.error) {
        if (this.error[k] === true) {
          // flag = false;
          return;
        }
      }
      if (this.isChangeAddress) {
        // 修改地址信息
        changeAddress(
          this.addressInfo[this.changeIndex].address_id,
          this.userInfo.user_id,
          this.form.detail,
          this.form.name,
          this.form.phone,
          this.form.address,
          this.form.tag
        )
          .then((res) => {
            if (res.data.affectedRows === 1) {
              this.showFormModal = false;
              this.$toach.show("保存成功");
              this._showAddress();
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toach.show("保存失败，请刷新网络");
          });
      } else {
        // 创建地址信息
        createAddress(
          this.userInfo.user_id,
          1,
          this.form.name,
          this.form.phone,
          this.form.address,
          this.form.detail,
          this.form.tag
        )
          .then((res) => {
            if (res.data.affectedRows === 1) {
              this.showFormModal = false;
              this.$toach.show("保存成功");
              this._showAddress();
            } else {
              this.$toach.show(res.data);
            }
          })
          .catch((arr) => {
            this.$toach.show("确认失败", "请再确认一次");
          });
      }
    },
    /**
     * 取消提交表单
     */
    close(form, active, empty, error) {
      this.showFormModal = false;
      this.isChangeAddress = false;
    },
    /**
     * 初始化对象内容
     */
    initForm(obj, data) {
      for (const k in obj) {
        if (obj.hasOwnProperty(k) && obj[k] !== data) {
          obj[k] = data;
        }
      }
    },
    /**
     * 选中地址
     */
    selectAddress(index) {
      if (this.$route.name === "order") {
        this.currentIndex = index;
        // 发送到父组件
        this.$emit("selectedAddress", this.addressInfo[this.currentIndex]);
      }
    },
    /**
     * 修改地址
     */
    changeAddress(index) {
      this.isChangeAddress = true;
      this.changeIndex = index;
      // 显示表单模态框
      this.showFormModal = true;
      // 把表单的信息全部修改为要修改的地址信息
      this.form.name = this.addressInfo[index].addressee;
      this.form.phone = this.addressInfo[index].mobile;
      this.form.address = this.addressInfo[index].address_area;
      this.form.detail = this.addressInfo[index].address_name;
      this.form.tag = this.addressInfo[index].address_tag;
      // 设置Input控件全部为活动状态
      this.initForm(this.active, true);
    },
    /**
     * 添加地址
     */
    addAddress() {
      this.showFormModal = true;
      // 清空表单
      this.initForm(this.form, "");
      this.initForm(this.active, false);
      this.initForm(this.empty, false);
      this.initForm(this.error, false);
    },
    /**
     * 显示删除地址模态框
     */
    _deleteAddress(id) {
      this.showDelModal = true;
      this.addressId = id;
    },
    /**
     * 网络请求
     */
    _showAddress() {
      showAddress(this.userInfo.user_id)
        .then((res) => {
          this.addressInfo = res.data;
          // 把默认选中的地址信息发送到父组件
          this.selectAddress(this.currentIndex);
        })
        .catch((arr) => {
          console.log(arr);
        });
    },
    /**
     * 删除地址
     */
    ModaDelAddress() {
      deleteAddress(this.addressId)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            this.$toach.show("删除成功");
            this.showDelModal = false;
            this._showAddress();
          } else {
            this.$toach.show(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toach.show("当前网络较差，删除失败");
        });
    },
  },
  filters: {
    // 过滤电话号码
    changeMobile(value) {
      return value
        ? value.toString().replace(value.toString().substr(3, 4), "****")
        : value;
    },
  },
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
  margin: 20px 20px 0 0;
}
.address .address-item dl {
  padding: 15px 24px 0;
}
.address .address-item dt {
  font-size: 18px;
  margin-bottom: 10px;
}
.address .address-item dt > span {
  font-size: 14px;
  color: #b0b0b0;
}
.address-item dl .address-del,
.address-item .change-address {
  display: none;
  transition: all 0.3s linear;
}
.address .address-item dd {
  font-size: 14px;
  line-height: 26px;
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
.address .address-item:hover dl .address-del {
  display: block;
  position: absolute;
  top: 2px;
  right: 2px;
  font-family: "icomoon";
  font-size: 14px;
  color: var(--color-topic);
}
.address .address-item:hover dl .change-address {
  display: block;
  position: absolute;
  right: 15px;
  bottom: 15px;
  color: var(--color-topic);
}
.address .address-item:hover,
.address .address-item:hover .text {
  color: #666;
  border-color: var(--color-topic);
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
.address .address-write .address-input {
  position: relative;
}
.address .address-write .address-input input {
  cursor: pointer;
}
.address .address-write .address-input > span {
  position: absolute;
  right: 16px;
  top: 50%;
  font-family: "icomoon";
  font-size: 20px;
  margin-top: -4px;
  color: #999;
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
