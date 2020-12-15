// 引入共享库 
import { useStore } from "vuex";
// 引入computed计算属性
import { computed } from "vue";

export function useCloseAddSST() {
  // 共享库
  let store = useStore();

  // 模态框的显示与隐藏
  let addSSTVisible = computed(() => store.state.ListeningStore.AddSSTVisible);

  // 添加SST题型
  let closeAddSST = () => {
    // 关闭sst模态框
    store.commit("SHOW_ADDMODAL", {
      type: "sst",
      visible: false
    });
  }

  // 返回
  return {
    addSSTVisible,
    closeAddSST
  }
}