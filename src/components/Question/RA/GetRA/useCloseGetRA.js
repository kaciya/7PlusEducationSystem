//#region 关闭模态框
// 导入共享库
import { useStore } from "vuex";
// 导入响应api
import { computed } from "vue";

export function useCloseGetRA() {
  // 共享库
  const store = useStore();

  // 模态框的显示与隐藏
  const getRAVisible = computed(() => store.state.SpeakingStore.getRAVisible);

  // 添加SST题型
  const closeGetRA = () => {
    // 关闭sst模态框
    store.commit("SpeakingStore/SHOW_GETMODAL", {
      type: "ra",
      visible: false
    });
  };

  // 返回
  return {
    getRAVisible,
    closeGetRA
  };
}
//#endregion
