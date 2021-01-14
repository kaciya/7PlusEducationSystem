import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

const app = createApp(App);

// 使用Ant Design Vue
import {
  Button,
  ConfigProvider,
  Layout,
  Grid,
  Row,
  Col,
  Input,
  Form,
  Switch,
  Tooltip,
  Menu,
  Avatar,
  Modal,
  Dropdown,
  Card,
  PageHeader,
  Breadcrumb,
  Radio,
  Table,
  Popconfirm,
  Select,
  Upload,
  Alert,
  Tag,
  Checkbox,
  Divider,
  DatePicker
} from "ant-design-vue";
app.use(Button)
  .use(Grid)
  .use(Row)
  .use(Col)
  .use(ConfigProvider)
  .use(Layout)
  .use(Input)
  .use(Switch)
  .use(Tooltip)
  .use(Form)
  .use(Menu)
  .use(Avatar)
  .use(Dropdown)
  .use(Card)
  .use(PageHeader)
  .use(Breadcrumb)
  .use(Radio)
  .use(Modal)
  .use(Table)
  .use(Popconfirm)
  .use(Select)
  .use(Upload)
  .use(Alert)
  .use(Tag)
  .use(Checkbox)
  .use(Divider)
  .use(DatePicker);
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
// import action from "./directives/actions";
// app.directive('action',action)

// 使用echarts
import echarts from "echarts";
app.provide("$echarts", echarts);



app
  .use(store)
  .use(router)
  // .use(CKEditor)
  .mount("#app");
