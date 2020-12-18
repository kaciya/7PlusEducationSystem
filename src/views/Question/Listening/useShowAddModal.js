// 引入共享库
import { useStore } from "vuex";
// 导出
/**
 * @param {*} category 当前题型分类
 */
export function useShowAddModal(category) {
  // 共享库
  let store = useStore();

  // 显示添加题目模态框
  let showAddModal = () => {
    // 关闭sst模态框
    store.commit("SHOW_ADDMODAL", {
      type: category.value,
      visible: true
    });
  };

  // 返回
  return {
    showAddModal
  };
}
