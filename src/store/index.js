import { createStore } from "vuex";
// 导入login共享库模块
import AuthStore from "./authStore";

export default createStore({
  modules: {
    // 登录共享库
    AuthStore
  }
});
