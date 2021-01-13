import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

const app = createApp(App);

// 使用Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/assets/styles/index.scss"; // global css

// 全局配置message.config
import { message } from "ant-design-vue";
message.config({
  duration: 2,
  maxCount: 2
});

// 使用富文本编辑器
import CKEditor from "@ckeditor/ckeditor5-vue";
// 使用权限管理
import "./permission";
import action from "./directives/actions";
app.directive('action',action)

// 使用echarts
import echarts from "echarts";
app.provide("$echarts", echarts);



app
  .use(store)
  .use(router)
  .use(Antd)
  .use(CKEditor)
  .mount("#app");
