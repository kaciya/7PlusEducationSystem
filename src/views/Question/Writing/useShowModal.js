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
 * @param {*} getQuestion 刷新页面
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

  // 题目的详情，向下注入
  const questionDetail = ref({});
  provide("questionDetail", questionDetail);

  // 根据题目id获取题目详情
  const getQuestionDetail = (id, callback) => {
    httpGet(write.GetQuestion(category.value.toLowerCase()) + "/" + id)
      .then(res => {
        if (res.success) {
          // 记录题目详情
          questionDetail.value = res.data;
          // 回调函数 （打开模态框）
          callback();
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
  };

  // 编辑模态框的显示隐藏
  const editModalVisible = reactive({
    // 题型分类
    swt: false,
    we: false
  });

  // 显示编辑题目模态框
  const showEditModal = id => {
    getQuestionDetail(id, () => {
      // 显示模态框
      editModalVisible[category.value.toLowerCase()] = true;
    });
  };

  // 查看模态框的显示隐藏
  const getModalVisible = reactive({
    // 题型分类
    swt: false,
    we: false
  });

  // 显示查看题目模态框
  const showGetModal = id => {
    getQuestionDetail(id, () => {
      // 显示模态框
      getModalVisible[category.value.toLowerCase()] = true;
    });
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
