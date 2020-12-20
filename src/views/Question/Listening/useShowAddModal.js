// 引入响应式API
import { reactive } from "vue"
/** 
 * 导出
 * @param {*} category 当前题型分类
 */
export function useShowAddModal(category) {
  // 添加模态框的显示和隐藏
  const addModalVisible = reactive({
    sst: false,
    wfd: false,
    fib: false
  })

  // 显示添加题目模态框
  const showAddModal = () => {
    // 关闭sst模态框
    addModalVisible[category.value.toLowerCase()] = true;
  }

  // 返回
  return {
    addModalVisible,
    showAddModal
  };
}
