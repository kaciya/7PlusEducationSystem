//#region 显示模态框
// 引入响应式API
import { reactive, provide, ref } from "vue";
// 引入get请求
import { httpGet } from "@/utils/http";
// 导入接口配置
import { listen } from "@/api/questionListenAPI";
// 引入提示框
import { message } from "ant-design-vue";
/**
 * 导出
 * @param {*} category 当前题型分类
 * @param {*} getQuestion 刷新题目列表
 */
export function useShowModal(category, getQuestion) {
  // 添加模态框的显示和隐藏
  const addModalVisible = reactive({
    sst: false,
    wfd: false,
    fib: false,
    mcs: false,
    smw: false,
    hcs: false,
    mcm: false
  })

  // 显示添加题目模态框
  const showAddModal = () => {
    // 关闭sst模态框
    addModalVisible[category.value.toLowerCase()] = true;
  };

  // 编辑模态框的显示和隐藏
  const editModalVisible = reactive({
    sst: false,
    wfd: false,
    fib: false,
    mcs: false,
    smw: false,
    hcs: false,
    mcm: false
  });

  // 编辑题目的详情，向下注入
  const editDetail = ref({})
  provide("editDetail", editDetail)

  /**
   * 显示添加题目模态框
   * @param {*} id 编辑题目的id
   */
  const showEditModal = (id) => {
    // 根据题目id获取题目详情
    httpGet(listen.GetQuestion(category.value.toLowerCase()) + "/" + id).then((res) => {
      const { success, data } = res;
      if (success) {
        // 记录题目详情
        editDetail.value = data;
        // 打开sst模态框
        editModalVisible[category.value.toLowerCase()] = true;
      }
      else {
        // 失败时提示
        message.error(res.message);
        // 刷新列表
        getQuestion();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  // 返回
  return {
    addModalVisible,
    showAddModal,
    editModalVisible,
    showEditModal,
  };
}
//#endregion