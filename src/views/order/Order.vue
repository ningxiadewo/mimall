<template>
  <div id="order">
    <com-header :showTopbar="true">
      <span slot="title-h" class="title-h">确认订单</span>
    </com-header>
    <div class="page-main">
      <div class="container">
        <!-- 收货地址 -->
        <Address @selectedAddress="saveAddress" />
        <!-- 商品列表 -->
        <div class="goods-body">
          <h3 class="title">商品及其优惠卷</h3>
          <ul class="good-list clear-fix">
            <li
              class="good-list-item clear-fix"
              v-for="(item, index) in goodsInfo"
              :key="index"
            >
              <div class="fl item-img">
                <img :src="item.imgurl" alt="" />
              </div>
              <div class="fl item-name">
                <a
                  href="javaScript:;"
                  @click="$router.push(`/product/${item.spu_id}`)"
                  >{{ item.sku_name }}</a
                >
              </div>
              <div class="fl item-price">
                {{ item.price | price }}元 x {{ item.product_num }}
              </div>
              <div class="fr item-total">
                {{ (item.product_num * item.price) | price }}元
              </div>
            </li>
          </ul>
        </div>
        <!-- 配送方式 -->
        <div class="method-row clear-fix">
          <h3 class="title fl">配送方式</h3>
          <span class="fl">包邮</span>
        </div>
        <!-- 发票 -->
        <div class="method-row receipt clear-fix">
          <h3 class="title fl">发票</h3>
          <span class="fl">电子发票</span>
          <span class="fl">个人</span>
          <span class="fl">商品明细</span>
        </div>
        <!-- 价格列表 -->
        <div class="money-box clear-fix">
          <ul class="fr">
            <li class="item">
              <span class="text">商品件数：</span>
              <span class="price">{{ goodsInfo.length }}件</span>
            </li>
            <li class="item">
              <span class="text">商品总价：</span>
              <span class="price">{{ allPrice | price }}元</span>
            </li>
            <li class="item">
              <span class="text">活动优惠：</span>
              <span class="price">-0元</span>
            </li>
            <li class="item">
              <span class="text">优惠卷抵扣：</span>
              <span class="price">-0元</span>
            </li>
            <li class="item">
              <span class="text">运费：</span>
              <span class="price">0元</span>
            </li>
            <li class="item total-price">
              <span class="text">应付总额：</span>
              <span class="price">{{ allPrice | price }}元</span>
            </li>
          </ul>
        </div>
        <!-- 按钮 -->
        <div class="btn clear-fix">
          <a
            href="javaScript:;"
            @click="toPay"
            class="to-compute fr"
            :class="{ noDrop: payLoad }"
          >
            <span style="position: relative"
              >去付款<loading v-if="payLoad"
            /></span>
          </a>
          <a
            href="javaScript:;"
            class="to-cart fr"
            @click="$router.replace('/cart')"
            >返回购物车</a
          >
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ComHeader from "components/comheader/ComHeader";
import Address from "components/address/Address";
import NavFooter from "components/NavFooter/NavFooter";
import Loading from "components/loading/Loading";

import { getCartData } from "network/cart";
import { addOrder, pay } from "network/order";

export default {
  name: "order",
  components: {
    ComHeader,
    NavFooter,
    Address,
    Loading,
  },
  computed: {
    ...mapState(["userInfo"]),
    allPrice() {
      // 计算所有商品的总价格
      const sum = this.goodsInfo.reduce((item, data) => {
        return item + data.product_num * data.price;
      }, 0);
      return sum;
    },
  },
  filters: {
    price(value) {
      return typeof value === "number" ? value.toFixed(2) : value;
    },
  },
  created() {
    getCartData(this.userInfo.user_id)
      .then((res) => {
        this.goodsInfo = res.data.filter((item) => {
          if (item.isSelect === 1) {
            return item;
          }
        });
      })
      .catch((err) => {
        this.$toach.show("当前网络较差，请刷新网络");
      });
  },
  data() {
    return {
      goodsInfo: [],
      addressInfo: {},
      payLoad: false,
    };
  },
  methods: {
    /**
     * 去付款
     */
    toPay() {
      // 如果在付款中则退出
      if (this.payLoad) {
        return;
      }
      let orderItems = []; // 发送的商品信息
      if (
        this.addressInfo === undefined ||
        this.addressInfo === null ||
        Object.keys(this.addressInfo).length <= 0
      ) {
        this.$toach.show("您还没有选择收货地址呢");
      } else if (this.goodsInfo.length <= 0) {
        this.$toach.show("您的商品为空，请前往购物车页面选择商品");
      } else {
        const order = {
          // 发送的地址信息
          user_id: this.userInfo.user_id,
          mobile: this.userInfo.user_tel,
          address_id: this.addressInfo.address_id,
        };
        // 商品信息
        this.goodsInfo.forEach((item) => {
          orderItems.push({
            product_id: item.product_id, //产品id
            product_num: item.product_num, //产品数量
            cart_id: item.cart_id, //对应购物车id
            account: null,
            ee_mobile: null,
            shopId: null,
          });
        });
        this.payLoad = true;
        // 去付款
        addOrder(order, orderItems)
          .then((res) => {
            this.payLoad = false;
            console.log(res);
            // if (res.data[0].master_id) {
            pay(res.data[0].master_id)
              .then((res) => {
                console.log(res.data);
                window.location.href = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
            this.$toach.show("即将跳转到付款页面");
            // 更新购物车的数量
            // }
            this.$store.dispatch("saveCartCount");
          })
          .catch((err) => {
            this.payLoad = false;
            console.log(err);
          });
      }
    },
    /**
     * 保存地址信息
     */
    saveAddress(info) {
      this.addressInfo = info;
    },
  },
};
</script>

<style>
#order .page-main {
  padding: 40px 0 60px;
  background-color: #f5f5f5;
}
#order .page-main .container {
  padding: 48px 48px 0;
  background-color: #fff;
  box-sizing: border-box;
}
#order .goods-body > .title,
#order .method-row .title {
  color: #333;
  font-size: 18px;
  font-weight: normal;
}
#order .goods-body {
  margin-top: 40px;
}
#order .goods-body > .title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
#order .goods-body .good-list {
  padding: 10px 0;
}
#order .goods-body .good-list-item {
  padding: 10px 0;
  line-height: 30px;
}
#order .item-img {
  width: 30px;
  height: 30px;
}
#order .item-img img {
  width: 30px;
  height: 30px;
}
#order .item-name {
  width: 600px;
  padding-left: 50px;
}
#order .item-name a {
  color: #424242;
  font-size: 14px;
}
#order .item-price {
  width: 300px;
  text-align: center;
  font-size: 14px;
  color: #424242;
}
#order .item-total {
  color: var(--color-topic);
  font-size: 14px;
}
#order .method-row {
  padding: 25px 0;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
#order .method-row .title {
  width: 200px;
  height: 50px;
  line-height: 50px;
}
#order .method-row span {
  color: var(--color-topic);
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin-right: 30px;
}
#order .receipt {
  border-top: none;
}
#order .money-box {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}
#order .money-box .item {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
}
#order .money-box .item .text {
  display: inline-block;
  width: 126px;
  text-align: end;
  color: #757575;
}
#order .money-box .item .price {
  float: right;
  color: var(--color-topic);
  text-align: end;
}
#order .money-box .total-price {
  height: 55px;
  line-height: 55px;
}
#order .money-box .total-price .price {
  font-size: 24px;
}
#order .btn {
  padding: 20px 48px;
}
#order .btn a {
  display: inline-block;
  height: 40px;
  width: 160px;
  text-align: center;
  margin-left: 30px;
  font-size: 14px;
  line-height: 40px;
}
#order .btn .to-cart {
  color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.4);
}
#order .btn .to-cart:hover,
#order .btn .to-compute:hover {
  opacity: 0.7;
}
#order .btn .to-compute {
  color: #fff;
  background-color: var(--color-topic);
}
</style>
