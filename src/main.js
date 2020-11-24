import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";
// 重置样式
import "../public/css/reset.css";

// 使用ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 使用Composition API
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
