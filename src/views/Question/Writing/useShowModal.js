// 引入响应式API
import { reactive, ref, provide } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入接口配置
import { write } from "@/api/questionWriteAPI";
// 引入get请求
import { httpGet } from "@/utils/http";
/**
 * 导出
 * @param {*} category 当前题型分类
 */
export function useShowModal(category, getQuestion) {
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

  // 编辑题目的详情，向下注入
  const editDetail = ref({});
  provide("editDetail", editDetail);

  // 显示编辑题目模态框
  const showEditModal = id => {
    // console.log(id);
    // 根据题目id获取题目详情
    httpGet(write.GetQuestion(category.value.toLowerCase()) + "/" + id)
      .then(res => {
        // console.log(res);
        if (res.success) {
          // 记录题目详情
          editDetail.value = res.data;
          // 显示模态框
          editModalVisible[category.value.toLowerCase()] = true;
        } else {
          // 失败时提示
          message.error(res.message);
          // 刷新列表
          getQuestion();
        }
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(editDetail);
  };

  // 返回
  return {
    // 添加
    addModalVisible,
    showAddModal,
    // 查看
    getModalVisible,
    showGetModal,
    // 编辑
    editModalVisible,
    showEditModal
  };
}
