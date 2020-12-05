//#region 操作侧边栏伸缩状态
// 导入响应api
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export const useSetCollapsed = () => {
  // 使用共享库
  const store = useStore();
  // 获取侧边栏伸缩状态
  const collapsed = computed(() => store.state.SideBarStore.collapsed);

  // 设置侧边栏状态
  function setCollapsed() {
    store.commit("SideBarStore/SET_COLLAPSED");
  }

  return {
    collapsed,
    setCollapsed
  };
};
//#endregion
