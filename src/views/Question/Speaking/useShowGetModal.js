// 引入共享库
import { useStore } from "vuex"
// 导出
/**
 * @param {*} category 当前题型分类
 */
export function useShowGetModal(category) {
  // 共享库
  const store = useStore();

  // 显示添加题目模态框
  const showGetModal = (id) => {
    console.log(id);
    // 弹出查看模态框
    store.commit("SpeakingStore/SHOW_GETMODAL", {
      type: category.value,
      visible: true
    });
  }

  // 返回
  return {
    showGetModal
  }
}