<template>
  <div id="cart">
    <!-- 头部 -->
    <nav-header></nav-header>
    <!-- <com-header>
      <span slot="title-h" class="title-h">我的购物车</span>
      <span slot="title-p" class="title-p">产品以实物为准</span>
    </com-header> -->

    <!-- 主要内容 -->
    <div class="cart-main" v-if="showCart">
      <div class="container">
        <div class="goods-list clear-fix">
          <div class="list-head list">
            <ul>
              <li class="list-check">
                <span
                  v-show="this.$store.getters.allCheck"
                  :class="{ isActive: this.$store.getters.allCheck }"
                  @click="checkAll"
                  ></span
                >
                <span
                  v-show="!this.$store.getters.allCheck"
                  @click="checkAll"
                ></span
                >全选
              </li>
              <li class="list-img">&nbsp;</li>
              <li class="list-name">商品名称</li>
              <li class="list-price">单价</li>
              <li class="list-num">数量</li>
              <li class="list-total">小计</li>
              <li class="list-action">操作</li>
            </ul>
          </div>
          <!-- 遍历商品 -->
          <div
            class="list-body list"
            v-for="(item, index) in this.goodsList"
            :key="index"
          >
            <ul>
              <li class="list-check">
                <span
                  v-show="item.selected"
                  @click="check(item)"
                  :class="{ isActive: item.selected }"
                  ></span
                >
                <span v-show="!item.selected" @click="check(item)"></span>
              </li>
              <li class="list-img">
                <a :href="/product/ + item.id">
                  <img :src="item.img" alt="" />
                </a>
              </li>
              <li class="list-name">
                <a href="javascript:;">
                  <h3 class="name">{{ item.name }}</h3>
                </a>
              </li>
              <li class="list-price">{{ item.price }}元</li>
              <li class="list-num list-counter">
                <div class="wrapper">
                  <a
                    href="javascript:;"
                    class="btn-item"
                    @click="decrease(item)"
                    >-</a
                  >
                  <input
                    type="text"
                    class="counter"
                    v-model="item.counter"
                    @blur="checkText(item)"
                  />
                  <a
                    href="javascript:;"
                    class="btn-item"
                    @click="increment(item)"
                    >+</a
                  >
                </div>
              </li>
              <li class="list-total list-margin">
                <span>{{ item.totalPrice }}元</span>
              </li>
              <li class="list-action">
                <a href="javascript:;" @click="showModal = true"></a>
              </li>
            </ul>
            <!-- 模态框 -->
            <modal
              :showModal="showModal"
              :title="'提示'"
              @onConfirm="remove(item.id, index)"
              @onClose="showModal = false"
            >
              <div slot="body" class="body-text">确定要从购物车删除吗</div>
            </modal>
          </div>
        </div>
        <div class="cart-bar clear-fix">
          <div class="section-left fl">
            <a href="/index">继续购物</a>
            <span class="total-num">
              共
              <i>{{ goodsList.length }}</i>
              件商品，已选择
              <i>{{ selectedNum }}</i>
              件
            </span>
          </div>
          <div class="section-right fr">
            <span class="total-price"
              >合计：<i>{{ this.$store.getters.allPrice }}</i
              >元</span
            >
            <a class="total-btn" @click="buyGoods">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-empty clear-fix" v-else>
      <div class="container">
        <div class="empty-left fl"></div>
        <div class="empty-right fl">
          <h2>您的购物车还是空的</h2>
          <a href="/index" class="btn">去购物</a>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";

import Modal from "components/Modal";
import Toach from "components/Toach";

import * as types from "../../store/mutations.types";

export default {
  name: "cart",
  components: {
    NavHeader,
    NavFooter,
    Modal,
    Toach
  },
  data() {
    return {
      goodsList: [],
      showModal: false,
      showCart: true
    };
  },
  computed: {
    // 已选择的商品个数
    selectedNum() {
      let count = 0;
      this.goodsList.forEach(item => {
        if (item.selected) {
          count += 1;
        }
      });
      return count;
    }
  },
  methods: {
    /**
     * 更新商品
     */
    increment(item) {
      item.counter++;
      if (item.counter > item.storeNum) {
        this.$toach.show(`商品件数仅剩${item.storeNum}件喔`, 2000);
        item.counter = item.storeNum;
        return;
      }
      this.$store.commit(types.UPDATE_CARTINFO, {
        id: item.id,
        counter: item.counter
      });
    },
    decrease(item) {
      item.counter--;
      if (item.counter < 1) {
        this.$toach.show("商品件数不可以少于1件喔", 2000);
        item.counter = 1;
        return;
      }
      this.$store.commit(types.UPDATE_CARTINFO, {
        id: item.id,
        counter: item.counter
      });
    },
    remove(id, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit(types.REMOVE_CARTITEM, id);
      this.showModal = false;

      if (this.goodsList.length <= 0) {
        this.showCart = false;
      }
    },
    check(item) {
      item.selected = !item.selected;
      this.$store.commit(types.UPDATE_SELECTED, {
        id: item.id,
        selected: item.selected
      });
    },
    checkAll() {
      let allCheck = this.$store.getters.allCheck;
      if (allCheck) {
        this.goodsList.forEach(item => {
          item.selected = false;
        });
      } else {
        this.goodsList.forEach(item => {
          item.selected = true;
        });
      }
      this.$store.commit(types.UPDATE_ALLSELECTED, !allCheck);
    },
    checkText(item) {
      const reg = /^[0-9]{1,}$/;
      if (reg.test(item.counter)) {
        if (item.counter > item.storeNum) {
          item.counter = item.storeNum;
          this.$toach.show(`亲！商品仅剩数量${item.storeNum}件了喔！`);
        }
      } else {
        this.$toach.show(`亲！请输入数字喔！`);
        item.counter = 1;
      }
      this.$store.commit(types.UPDATE_CARTINFO, {
        id: item.id,
        counter: item.counter
      });
    },
    /**
     * 去结算
     */
    buyGoods() {
      let flag = true;
      const arr = this.goodsList.filter(item => {
        if (!item.selected) {
          return true;
        }
      });
      // 商品全部未选中
      if (arr.length == this.goodsList.length) {
        this.$toach.show("您还未选中商品呢");
        return;
      } else {
        // 商品选中
        this.$router.replace("order");
      }
    }
  },
  created() {
    this.goodsList = this.$store.state.cart;
  },
  mounted() {
    if (this.goodsList.length <= 0) {
      this.showCart = false;
    }
  }
};
</script>

<style>
/* 头部文字 */
#cart .title-h {
  font-size: 28px;
  font-weight: normal;
  color: #424242;
}
#cart .title-p {
  margin: 5px 20px;
  color: #757575;
  font-size: 12px;
}
/* 购物车主要内容 */
#cart .cart-main {
  padding: 40px 0;
  background-color: #f5f5f5;
}
#cart .cart-main .goods-list {
  background-color: #fff;
}
#cart .goods-list .list {
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
#cart .list li {
  float: left;
  font-size: 16px;
}
#cart .list .list-check {
  position: relative;
  width: 110px;
  height: 70px;
}
#cart .list-check span {
  position: absolute;
  left: 10px;
  top: 50%;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  vertical-align: middle;
  transform: translate(0, -50%);
}
#cart .list-check span.isActive {
  font-family: "icomoon";
  font-size: 14px;
  background-color: rgb(19, 243, 67);
  border-color: rgb(19, 243, 67);
  line-height: 18px;
  color: #fff;
}
#cart .list .list-img {
  width: 120px;
  height: 70px;
  text-align: start;
}
#cart .list .list-img a {
  display: inline-block;
}
#cart .list .list-img img {
  width: 80px;
  height: 80px;
}
#cart .list .list-name {
  width: 380px;
  text-align: start;
}
#cart .list-name h3 {
  font-size: 18px;
  color: #333;
  font-weight: normal;
}
#cart .list .list-price {
  width: 160px;
}
#cart .list .list-num {
  width: 150px;
}
#cart .list .list-num .wrapper {
  position: absolute;
  /* left: 20%; */
  top: 50%;
  height: 38px;
  line-height: 38px;
  transform: translate(0, -50%);
  border: 1px solid #ccc;
  overflow: hidden;
}
#cart .list-num .btn-item {
  display: inline-block;
  width: 38px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #666;
  line-height: 38px;
}
#cart .list-num .btn-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
#cart .list-num .counter {
  display: inline-block;
  width: 72px;
  background-color: #fff;
  text-align: center;
  line-height: 38px;
  color: #666;
}
#cart .list .list-total {
  width: 200px;
}
#cart .list .list-margin {
  width: 200px;
  padding-left: 150px;
  /* margin-left: 150px; */
}
#cart .list-total span {
  color: #ff6700;
}
#cart .list .list-action {
  width: 96px;
}
#cart .list .list-action a {
  color: #333;
}
#cart .list .list-action a::after {
  font-family: "icomoon";
  content: "\ea0d";
}
#cart .list .list-action a:hover {
  color: #ff6700;
}
#cart .list-body {
  padding: 25px 0;
  position: relative;
}
#cart .cart-bar {
  margin-top: 20px;
  height: 50px;
  background-color: #fff;
  line-height: 50px;
}
#cart .section-left {
  margin-left: 30px;
}
#cart .section-left > a {
  font-size: 14px;
  color: #757575;
  margin-right: 15px;
}
#cart .total-num {
  padding-left: 15px;
  border-left: 1px solid #ccc;
  height: 15px;
  line-height: 50px;
  color: #757575;
  font-size: 14px;
}
#cart .total-num i {
  font-style: normal;
  color: #ff6700;
}
#cart .section-right .total-price {
  font-size: 14px;
  color: #ff6700;
  margin-right: 50px;
}
#cart .section-right .total-price i {
  font-style: normal;
  font-size: 30px;
}
#cart .section-right .total-btn {
  text-align: center;
  display: inline-block;
  width: 200px;
  background-color: #ff00dd;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

#cart .cart-empty {
  background-color: #f5f5f5;
  padding: 100px 150px;
}
#cart .empty-left {
  height: 273px;
  width: 500px;
  background: url("~assets/imgs/cart/cart-empty.png") no-repeat;
}
#cart .empty-right {
  margin-top: 80px;
}
#cart .empty-right h2 {
  color: #b0b0b0;
  font-size: 40px;
}
#cart .empty-right .btn {
  display: block;
  color: #fff;
  height: 60px;
  line-height: 60px;
  width: 200px;
  font-size: 24px;
  background-color: #ff00dd;
  margin-top: 20px;
  text-align: center;
}
#cart .body-text {
  line-height: 40px;
  margin-bottom: 40px;
}
</style>
