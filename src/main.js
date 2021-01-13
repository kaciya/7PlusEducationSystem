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
app.use(Button);
app.use(Grid);
app.use(Row);
app.use(Col);
app.use(ConfigProvider);
app.use(Layout);
app.use(Input);
app.use(Switch);
app.use(Tooltip);
app.use(Form);
app.use(Menu);
app.use(Avatar);
app.use(Dropdown);
app.use(Card);
app.use(PageHeader);
app.use(Breadcrumb);
app.use(Radio);
app.use(Modal);
app.use(Table);
app.use(Popconfirm);
app.use(Select);
app.use(Upload);
app.use(Alert);
app.use(Tag);
app.use(Checkbox);
app.use(Divider);
app.use(DatePicker)
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
  .use(CKEditor)
  .mount("#app");
