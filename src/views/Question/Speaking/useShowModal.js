//#region 查看模态框
// 引入响应式API
import { ref, reactive, provide } from "vue";
// 引入api
import { speak } from "@/api/questionSpeakAPI";
// 引入http
import { httpGet } from "@/utils/http";
// 导入全局提示
import { message } from "ant-design-vue";
/**
 * @param {*} category 当前题型分类
 */
export function useShowModal(category) {
  //#region 查看模态框的显示和隐藏
  const getModalVisible = reactive({
    ra: false,
    rs: false,
    di: false,
    rl: false,
    asq: false
  });
  //#endregion
  //#region 添加模态框的显示和隐藏
  const addModalVisible = reactive({
    ra: false,
    rs: false,
    di: false,
    rl: false,
    asq: false
  });
  //#endregion
  //#region 编辑模态框的显示和隐藏
  const editModalVisible = reactive({
    ra: false,
    rs: false,
    di: false,
    rl: false,
    asq: false
  });
  //#endregion

  //#region 获取题目详情 方法
  // 题目的详情，向下注入
  const questionDetail = ref({});
  provide("speak/questionDetail", questionDetail);
  /**
   * @param {string} id 题目id
   * @param {function} callback 请求成功后的回调
   */
  const getQuestionDetail = (id, callback) => {
    httpGet(speak.GetDetail(category.value.toLowerCase(), id))
      .then(res => {
        console.log(res);
        // 解构data
        const { data } = res;
        // 获取成功 赋值
        if (res.success) {
          // 存储查看题目详情
          questionDetail.value = data;
          // 显示[查看/添加/编辑]模态框
          callback();
        } else {
          // 失败时提示
          message.error(res.message);
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };
  //#endregion

  //#region 显示查看题目模态框
  /**
   * @param {string} id 题目id
   */
  const showGetModal = id => {
    // 查看题目详情
    getQuestionDetail(id, () => {
      getModalVisible[category.value.toLowerCase()] = true;
    });
  };
  //#endregion

  //#region 显示添加题目模态框
  const showAddModal = () => {
    addModalVisible[category.value.toLowerCase()] = true;
  };
  //#endregion

  //#region 显示编辑题目模态框
  const showEditModal = id => {
    // 编辑题目详情
    getQuestionDetail(id, () => {
      editModalVisible[category.value.toLowerCase()] = true;
    });
  };
  //#endregion

  // 返回
  return {
    // 查看
    showGetModal,
    getModalVisible,
    // 添加
    showAddModal,
    addModalVisible,
    // 编辑
    showEditModal,
    editModalVisible
  };
}

//#endregion
