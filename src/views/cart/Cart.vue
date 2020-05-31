<template>
  <div id="cart">
    <!-- 头部 -->
    <nav-header></nav-header>
    <!-- 加载中 -->
    <div class="cart-loading" v-if="showLoading">
      <loading class="cart-loading-row" :loadingNum="2" />
    </div>
    <!-- 主要内容 -->
    <div class="cart-main" v-else-if="showCart && !showLoading">
      <div class="container">
        <!-- 头部 -->
        <div class="goods-list clear-fix">
          <!-- 标题内容 -->
          <div class="list-head list">
            <ul>
              <li class="list-check">
                <span
                  v-show="selectedNum === goodsList.length"
                  :class="{ isActive: selectedNum === goodsList.length }"
                  @click="checkAll"
                  ></span
                >
                <span
                  v-show="selectedNum !== goodsList.length"
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
          <!-- 商品列表 -->
          <div
            class="list-body list"
            v-for="(item, index) in this.goodsList"
            :key="index"
          >
            <ul>
              <li class="list-check">
                <span
                  v-show="item.isSelect === 1"
                  @click="check(item)"
                  :class="{ isActive: item.isSelect === 1 }"
                  ></span
                >
                <span v-show="item.isSelect === -1" @click="check(item)"></span>
              </li>
              <li class="list-img">
                <a
                  href="javaScript:;"
                  @click="$router.push(`/product/${item.spu_id}`)"
                >
                  <img :src="item.imgurl" alt="" />
                </a>
              </li>
              <li class="list-name">
                <a
                  href="javaScript:;"
                  @click="$router.push(`/product/${item.spu_id}`)"
                >
                  <h3 class="name">{{ item.sku_name }}</h3>
                </a>
              </li>
              <li class="list-price">{{ item.price | price }}元</li>
              <li class="list-num list-counter">
                <div class="wrapper">
                  <a
                    href="javascript:;"
                    class="btn-item"
                    @click="decrease(item, -1)"
                    >-</a
                  >
                  <input
                    type="text"
                    class="counter"
                    v-model="item.product_num"
                    @blur="checkText(item)"
                  />
                  <a
                    href="javascript:;"
                    class="btn-item"
                    @click="increment(item, 1)"
                    >+</a
                  >
                </div>
                <span class="stock">
                  产品库存量
                  <span>{{ item.stock }}</span>
                  件
                </span>
              </li>
              <li class="list-total list-margin">
                <span>{{ (item.product_num * item.price) | price }}元</span>
              </li>
              <li class="list-action">
                <a href="javascript:;" @click="remove(item, index)"></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 底部-->
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
              >合计：<i>{{ allPrice | price }}</i
              >元</span
            >
            <a class="total-btn" @click="buyGoods">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 空的购物车 -->
    <div class="cart-empty clear-fix" v-else>
      <div class="container">
        <div class="empty-left fl"></div>
        <div class="empty-right fl">
          <h2>您的购物车还是空的</h2>
          <a href="/index" class="btn">去购物</a>
        </div>
      </div>
    </div>
    <!-- 删除商品模态框 -->
    <modal
      :showModal="showModal"
      title="提示"
      @onConfirm="modalRemove(cartItem, cartIndex)"
      @onClose="showModal = false"
    >
      <div slot="body" class="body-text">确定要从购物车删除吗</div>
    </modal>
    <!-- 底部 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NavHeader from "components/navheader/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";
import Loading from "components/loading/Loading";
import Modal from "components/modal/Modal";
import Toach from "components/Toach";

import {
  getCartData,
  romoveCartItem,
  updateItemCount,
  changeSelectStatus,
  selectAllCart,
  selectNoneCart,
} from "network/cart";

import { throttle } from "utils/throttle";

import * as types from "../../store/mutations.types";

export default {
  name: "cart",
  components: {
    NavHeader,
    NavFooter,
    Modal,
    Toach,
    Loading,
  },
  created() {
    // 网络请求
    this.getCartData();
  },
  data() {
    return {
      goodsList: [], // 产品列表
      showModal: false, // 展示删除模态框
      showCart: true, // 展示购物车列表
      isOneClick: true, // 第一次点击
      returnfunc() {}, // 节流阀函数
      lastNum: 0, // 用于记录上一次输入input的产品数量
      cartItem: 0, // 要删除的商品
      cartIndex: 0, // 要删除的商品的索引号
      showLoading: true, // 加载中
    };
  },
  filters: {
    price(value) {
      return typeof value === "number" ? value.toFixed(2) : value;
    },
  },
  computed: {
    // 已选择的商品个数
    selectedNum() {
      let count = 0;
      this.goodsList.forEach((item) => {
        if (item.isSelect === 1) {
          count += 1;
        }
      });
      return count;
    },
    // 已选中商品共计总数钱
    allPrice() {
      let sum = 0;
      this.goodsList.forEach((item) => {
        if (item.isSelect === 1) {
          sum += item.product_num * item.price;
        }
      });
      return sum;
    },
    ...mapState(["userInfo"]),
  },
  methods: {
    /**
     * 更新商品
     */
    increment(item, num) {
      // 数量加1
      // 产品数量是否大于产品库存量
      if (item.product_num + 1 > item.stock) {
        this.$toach.show(`商品件数最大数量是${item.stock}喔`, 2000);
        item.product_num = item.stock;
        return;
      } else {
        this.updateNum(item, num);
      }
    },
    decrease(item, num) {
      // 数量减一
      // 判断产品数量是否小于产品库存量
      if (item.product_num - 1 < 1) {
        this.$toach.show("商品件数不可以少于1件喔", 2000);
        item.product_num = 1;
        return;
      } else {
        this.updateNum(item, num);
      }
    },
    updateNum(item, num, func) {
      // 节流来防止用户快速点击，减少网络请求，增加性能
      // 第一次点击时记录返回函数（其实是记录当前时间）
      if (this.isOneClick) {
        this.returnfunc = throttle(this.requestUpdateNum, 500);
        // 第一次并没有执行返回函数，所以先执行一次更新数量函数
        this.requestUpdateNum(item, num);
        this.isOneClick = false;
      } else {
        // 执行节流阀
        this.returnfunc(item, num);
      }
    },
    requestUpdateNum(item, num) {
      // 发送网络请求更新数量
      updateItemCount(num, item.cart_id)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            item.lastNum += num;
            // 记录最后一次产品数量
            item.product_num = item.lastNum;
            // 更新购物车的总数量
            this.$store.dispatch("saveCartCount", num);
          } else {
            this.$toach.show("操作失败");
          }
        })
        .catch((err) => {
          console.log(this.err);
          this.$toach.show("操作失败，请刷新网络");
        });
    },
    modalRemove(item, index) {
      romoveCartItem(item.cart_id)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            // 刷新购物车的数据
            this.$store.dispatch("saveCartCount", -item.product_num);
            // 本地删除数据
            this.goodsList.splice(index, 1);
            // 判断购物车是否为空
            if (this.goodsList.length <= 0) {
              this.showCart = false;
            }
            this.showModal = false;
            this.$toach.show("删除成功");
          } else {
            this.showModal = false;
            this.$toach.show("删除失败");
          }
        })
        .catch(() => {
          this.showModal = false;
          this.$toach.show("删除失败，请刷新网络");
        });
      if (this.goodsList.length <= 0) {
        this.showCart = false;
      }
    },
    remove(item, index) {
      // 显示模态框
      this.showModal = true;
      // 删除的购物车商品赋值
      this.cartItem = item;
      this.cartIndex = index;
    },
    /**
     * 选中商品
     */
    check(item) {
      // 选中或取消单个商品
      changeSelectStatus(item.cart_id)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            if (item.isSelect === 1) {
              item.isSelect = -1;
            } else {
              item.isSelect = 1;
            }
          } else {
            this.$toach.show("请求失败");
          }
          // console.log(this.goodsList);
        })
        .catch((err) => {
          this.$toach.show("请求失败");
        });

      // console.log(item.selected);
      // this.$store.commit(types.UPDATE_SELECTED, {
      //   id: item.id,
      //   selected: item.selected,
      // });
    },
    checkAll() {
      // 查看是否全部选中
      const allCheck = this.allCheckStatus();
      // 全部选中
      if (allCheck) {
        // 全部取消选中 网络请求
        selectNoneCart(this.userInfo.user_id)
          .then((res) => {
            this.goodsList.forEach((item) => {
              item.isSelect = -1;
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // this.goodsList.forEach((item) => {
        //   item.isSelect = -1;
        // });
      } else {
        // console.log(this.userInfo.user_id);
        // 全部选中，网络请求
        selectAllCart(this.userInfo.user_id)
          .then((res) => {
            this.goodsList.forEach((item) => {
              item.isSelect = 1;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    allCheckStatus() {
      // 检查购物车全选状态
      let flag = true; // 默认全部选中
      this.goodsList.some((item) => {
        if (item.isSelect === -1) {
          flag = false;
          return true;
        }
      });
      // // 若购物车为空
      // if (this.goodsList.length === 0) {
      //   flag = false;
      // }
      return flag;
    },
    checkText(item) {
      const reg = /^[0-9]{1,}$/;
      // 输入的为数字

      if (reg.test(item.product_num)) {
        // 如果输入的数量小于1，也是把产品数量维持不变
        if (item.product_num < 1) {
          item.product_num = item.lastNum;
          this.$toach.show(`亲！商品不可以少于一件的喔！`);
          return;
        }

        // 如果输入的数量大于当前的库存量，则把产品数量维持不变
        if (item.product_num > item.stock) {
          item.product_num = item.stock;
          this.$toach.show(`亲！您购买的商品超过库存量啦！`);
        }

        // 计算变化的数量
        const num = item.product_num - item.lastNum;

        // 更新产品数量
        this.updateNum(item, num);
      } else {
        // 如果输入的文本不是数字，也是把产品数量维持不变
        this.$toach.show(`亲！请输入大于0的数字喔！`);
        item.product_num = item.lastNum;
      }
    },
    /**
     * 去结算
     */
    buyGoods() {
      const arr = this.goodsList.filter((item) => {
        // 未选中
        if (item.isSelect === -1) {
          return true;
        }
      });
      // 商品全部未选中
      if (arr.length === this.goodsList.length) {
        this.$toach.show("您还未选中商品呢");
        return;
      } else {
        // 商品选中
        this.$router.push("/order");
      }
    },
    /**
     * 网络请求
     * */
    getCartData() {
      getCartData(this.userInfo.user_id)
        .then((res) => {
          // 取消loading
          this.showLoading = false;
          // 判断购物车是否为空
          if (res.data.code === -1 || res.data.length <= 0) {
            this.showCart = false;
          } else {
            this.goodsList = res.data;
            // 记录最后一次的产品数量
            this.goodsList.forEach((item) => {
              item.lastNum = item.product_num;
            });
          }
          // 更新购物车的数量
          this.$store.dispatch("saveCartCount");
        })
        .catch((arr) => {
          console.log(arr);
          this.$toach.show("网络较差，请刷新重试");
        });
    },
  },
};
</script>

<style>
/* 头部文字 */
#cart .title-h {
  font-size: 28px;
  font-weight: normal;
  color: #493e3e;
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
  border-bottom: 1px solid #e0e0e0;
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
  width: 70px;
  height: 70px;
}
#cart .list .list-img img {
  width: 70px;
  height: 70px;
}
#cart .list .list-name {
  width: 380px;
  text-align: start;
}
#cart .list-name h3 {
  font-size: 18px;
  color: #333;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#cart .list .list-price {
  width: 160px;
}
#cart .list .list-num {
  width: 150px;
  height: 70px;
  position: relative;
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
  background-color: rgba(0, 0, 0, 0.2);
}
#cart .list-num .counter {
  display: inline-block;
  width: 72px;
  background-color: #fff;
  text-align: center;
  line-height: 38px;
  color: #666;
}
#cart .list .list-num .stock {
  position: absolute;
  height: 30px;
  width: 200%;
  line-height: 30px;
  color: #999;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 12px;
  bottom: -20px;
}
#cart .list .list-num .stock span {
  color: var(--color-assist);
  opacity: 0.7;
}
#cart .list .list-total {
  width: 200px;
}
#cart .list .list-margin {
  width: 200px;
  /* margin-left: 150px; */
}
#cart .list-total span {
  color: var(--color-topic);
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
  color: var(--color-topic);
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
  color: var(--color-topic);
}
#cart .section-right .total-price {
  font-size: 14px;
  color: var(--color-topic);
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
  background-color: var(--color-assist);
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
  background-color: var(--color-assist);
  margin-top: 20px;
  text-align: center;
}
#cart .body-text {
  line-height: 40px;
  margin-bottom: 40px;
}
#cart > .cart-loading {
  position: relative;
  width: 1266px;
  margin: 0 auto;
  height: 500px;
}
#cart > .cart-loading .cart-loading-row {
  right: 50%;
  right: none;
  transform: translate(50%, -50%);
}
</style>
