import { createStore } from "vuex";
// 引入vuex持久化插件
import createPersistedState from "vuex-persistedstate";
// 导入login共享库模块
import AuthStore from "./authStore";
// 导入sideBar侧边栏模块
import SideBarStore from "./sideBarStore";
// 导入听力题库模块
import ListeningStore from "./listeningStore";
// 导入口语题库模块
import SpeakingStore from "./speakingStore";
// 引入图片上传模块
import ImageUploadStore from "./imageUploadStore";

export default createStore({
  modules: {
    // 登录共享库
    AuthStore,
    // 侧边栏共享库
    SideBarStore,
    // 听力题库共享库
    ListeningStore,
    // 口语题库共享库
    SpeakingStore,
    // 图片上传共享库
    ImageUploadStore
  },
  plugins: [
    // 配置数据持久化存储
    createPersistedState({
      // 使用sesstionStorage存储
      // storage: window.sessionStorage,
      // 设置只持久化AuthStore下面的userInfos数据
      paths: ["AuthStore"]
    })
  ]
});
