import { createStore } from "vuex";
// 导入login共享库模块
import AuthStore from "./authStore";
// 导入sideBar侧边栏模块
import SideBarStore from "./sideBarStore";

export default createStore({
  modules: {
    // 登录共享库
    AuthStore,
    // 侧边栏共享库
    SideBarStore
  }
});
