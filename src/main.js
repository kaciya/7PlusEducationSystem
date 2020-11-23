import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

// 使用ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
