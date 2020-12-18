//#region 设置侧边栏导航
// 导入响应api
import { reactive, watchEffect } from "vue";
// 导入vue-router
import { useRoute } from "vue-router";

// 定义功能函数
export const useSetSideBar = () => {
  // 定义使用useRoute
  const route = useRoute();

  // 侧边栏的展开keys
  const sideBarUnfoldKeys = reactive({
    // 当前展开的一级菜单项keys
    openKeys: ["home"],
    // 当前选中的菜单栏keys
    selectKeys: ["/home/main"]
  });

  //#region 只展开当前父级菜单栏
  function onOpenChange(openKeys) {
    if (openKeys.length !== 0) {
      // 选择要展开的菜单栏key
      sideBarUnfoldKeys.openKeys = [openKeys[1]];
    } else {
      // 不展开菜单栏
      sideBarUnfoldKeys.openKeys = [""];
    }
    // console.log(sideBarUnfoldKeys.openKeys);
  }
  //#endregion

  // 侦听路由变化 控制导航栏
  watchEffect(() => {
    // console.log(route.meta);
    // 当前一级菜单栏key 转数组获取
    const subKey = route.path.split("/")[1];
    // 赋值当前一级菜单栏key
    sideBarUnfoldKeys.openKeys = [subKey];
    // 赋值选中的菜单栏的key
    sideBarUnfoldKeys.selectKeys = [route.meta.pathName];
  });

  // 返回数据
  return {
    sideBarUnfoldKeys, //侧边栏的展开keys
    onOpenChange //只展开当前父菜单栏
  };
};

//#endregion
