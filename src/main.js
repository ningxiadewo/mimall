import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toach from "components/Toach";
import Vuelazyload from "vue-lazyload";

import {
  Form,
  FormItem,
  Input,
  Radio,
  Button,
  Icon,
  RadioGroup,
} from "element-ui";

// 使用图片懒加载
Vue.use(Vuelazyload, {
  loading: require("./assets/imgs/common/loading.gif"),
});

// 按需引入element.ui
Vue.use(Form);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Icon);
Vue.use(FormItem);
Vue.use(RadioGroup);

Vue.config.productionTip = false;

// 安装本地的提示框
Vue.use(toach);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
