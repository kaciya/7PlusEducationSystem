import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

// 使用Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
