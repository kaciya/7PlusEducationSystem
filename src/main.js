import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

const app = createApp(App);

// 使用Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 使用echarts
import echarts from "echarts";
app.config.globalProperties.$echarts = echarts;

app
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
