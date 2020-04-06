<template>
  <!-- 脚部模块上面 -->
  <div class="size-footer container">
    <!-- 服务模块 -->
    <div class="footer-service">
      <ul>
        <li class="service-item">
          <a href="javascript:;">
            <span class="service-icon icon-setting"></span>
            预约维修服务
          </a>
        </li>
        <li class="service-item">
          <a href="javascript:;">
            <span class="service-icon icon-7day"></span>
            7天无理由退货
          </a>
        </li>
        <li class="service-item">
          <a href="javascript:;">
            <span class="service-icon icon-15day"></span>
            15天免费换货
          </a>
        </li>
        <!-- <li class="service-item">
          <a href="javascript:;">
            <span class="service-icon icon-99day"></span>
            满99包邮
          </a>
        </li> -->
        <li class="service-item">
          <a href="javascript:;">
            <span class="service-icon icon-post"></span>
            520余家售后网点
          </a>
        </li>
      </ul>
    </div>
    <!-- 关于模块 -->
    <div class="footer-about">
      <div class="about-left">
        <dl>
          <dt>帮助中心</dt>
          <dd>
            <a href="javascript:;">账户管理</a>
          </dd>
          <dd>
            <a href="javascript:;">购物指南</a>
          </dd>
          <dd>
            <a href="javascript:;">订单操作</a>
          </dd>
        </dl>
        <dl>
          <dt>服务支持</dt>
          <dd>
            <a href="javascript:;">售后政策</a>
          </dd>
          <dd>
            <a href="javascript:;">自助服务</a>
          </dd>
          <dd>
            <a href="javascript:;">相关下载</a>
          </dd>
        </dl>
        <dl>
          <dt>线下门店</dt>
          <dd>
            <a href="javascript:;">小米之家</a>
          </dd>
          <dd>
            <a href="javascript:;">服务网点</a>
          </dd>
          <dd>
            <a href="javascript:;">授权体验店</a>
          </dd>
        </dl>
        <dl>
          <dt>关于小米</dt>
          <dd>
            <a href="javascript:;">了解小米</a>
          </dd>
          <dd>
            <a href="javascript:;">加入小米</a>
          </dd>
          <dd>
            <a href="javascript:;">投资者关系</a>
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>
            <a href="javascript:;">新浪微博</a>
          </dd>
          <dd>
            <a href="javascript:;">官方微信</a>
          </dd>
          <dd>
            <a href="javascript:;">练习我们</a>
          </dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd>
            <a href="javascript:;">F码通道</a>
          </dd>
          <dd>
            <a href="javascript:;">礼物码</a>
          </dd>
          <dd>
            <a href="javascript:;">防伪查询</a>
          </dd>
        </dl>
      </div>
      <div class="about-right">
        <p class="about-phone">888-888-888</p>
        <p class="about-day">周一至周日 8:00-18-00</p>
        <a class="about-people">
          <span></span>
          人工服务
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.size-footer {
  margin-top: 20px;
  height: 272px;
}
/* 服务模块 */
.footer-service {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #e5e5e5;
}

.footer-service .service-item {
  float: left;
  font-size: 16px;
  width: 25%;
  text-align: center;
}
.footer-service .service-item > a {
  position: relative;
  display: inline-block;
  color: #616161;
}
.footer-service .service-item > a:hover {
  color: var(--color-topic);
}
.footer-service .service-icon {
  position: absolute;
  left: -30px;
  top: 50%;
  width: 24px;
  height: 25px;
  background-image: url("~assets/imgs/index/icon-setting.png");
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.footer-service .service-item .icon-7day {
  background-image: url("~assets/imgs/index/icon-7day.png");
}
/* .footer-service .service-item .icon-99day {
  background-image: url("~assets/imgs/index/icon-setting.png");
} */
.footer-service .service-item .icon-15day {
  background-image: url("~assets/imgs/index/icon-15day.png");
}
.footer-service .service-item .icon-post {
  background-image: url("~assets/imgs/index/icon-post.png");
}
/* 关于模块 */
.footer-about {
  height: 192px;
  padding: 40px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.footer-about .about-left dl {
  float: left;
  width: 160px;
}
.footer-about .about-left dt {
  font-size: 14px;
  color: #424242;
  margin-bottom: 26px;
}
.footer-about .about-left a {
  display: inline-block;
  font-size: 12px;
  color: #757575;
  margin-top: 10px;
}
.footer-about .about-left a:hover {
  color: var(--color-topic);
}
.footer-about .about-right {
  width: 252px;
  height: 112px;
  text-align: center;
  border-left: 1px solid #e5e5e5;
}
.footer-about .about-right .about-phone {
  font-size: 20px;
  color: var(--color-topic);
  margin-bottom: 15px;
}
.footer-about .about-right .about-day {
  margin-bottom: 20px;
}
.footer-about .about-right .about-people {
  display: block;
  width: 120px;
  height: 30px;
  border: 1px solid var(--color-topic);
  margin: 0 auto;
  color: var(--color-topic);
  line-height: 30px;
}
.footer-about .about-right .about-people:hover {
  color: #fff;
  background-color: var(--color-topic);
}
</style>
