import { createStore } from "vuex";
// 导入login共享库模块
import AuthStore from "./authStore";
// 导入sideBar侧边栏模块
import SideBarStore from "./sideBarStore";
// 导入听力题库模块
import ListeningStore from "./listeningStore";

export default createStore({
  modules: {
    // 登录共享库
    AuthStore,
    // 侧边栏共享库
    SideBarStore,
    // 听力题库共享库
    ListeningStore
  }
});
