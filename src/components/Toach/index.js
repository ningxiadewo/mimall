import Toach from "./Toach.vue";

const obj = {
  install: function(Vue) {
    // 创建一个组件构造器
    const toachCom = Vue.extend(Toach);

    // new一个组件对象
    const toachObj = new toachCom();

    //将组件对象手动挂载到某一个元素上面
    toachObj.$mount(document.createElement("div"));

    // toachObj.$el就是对应的div
    document.body.appendChild(toachObj.$el);

    // 挂载到vue的原型上
    Vue.prototype.$toach = toachObj;
  }
};

export default obj;
