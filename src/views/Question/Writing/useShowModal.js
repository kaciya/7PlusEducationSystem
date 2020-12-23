// 引入响应式API
import { reactive } from "vue";
/**
 * 导出
 * @param {*} category 当前题型分类
 */
export function useShowModal(category) {
  // 添加模态框的显示隐藏
  const addModalVisible = reactive({
    // 题型分类
    swt: false,
    we: false
  });

  // 显示添加题目模态框
  const showAddModal = () => {
    // 显示模态框
    addModalVisible[category.value.toLowerCase()] = true;
  };

  // 查看模态框的显示隐藏
  const getModalVisible = reactive({
    // 题型分类
    swt: false,
    we: false
  });

  // 显示查看题目模态框
  const showGetModal = () => {
    // 显示模态框
    getModalVisible[category.value.toLowerCase()] = true;
  };

  // 编辑模态框的显示隐藏
  const editModalVisible = reactive({
    // 题型分类
    swt: false,
    we: false
  });

  // 显示编辑题目模态框
  const showEditModal = () => {
    // 显示模态框
    editModalVisible[category.value.toLowerCase()] = true;
  };

  // 返回
  return {
    // 添加
    addModalVisible,
    showAddModal,
    // 删除
    getModalVisible,
    showGetModal,
    // 编辑
    editModalVisible,
    showEditModal
  };
}
