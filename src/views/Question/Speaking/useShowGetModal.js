//#region 查看模态框
// 引入响应式API
import { reactive } from "vue";
// 引入api
import { speak } from "@/api/questionSpeakAPI";
// 引入http
import { httpGet } from "@/utils/http"
/**
 * @param {*} category 当前题型分类
 */
export function useShowGetModal(category) {
  // 查看模态框的显示和隐藏
  const getModalVisible = reactive({
    ra: false,
    detail: ""
  });

  //#region 显示查看题目模态框
  /**
   * 
   * @param {string} id 题目id
   */
  const showGetModal = id => {
    // 查看RA题目详情
    httpGet(speak.GetDetail('ra', id)).then(res => {
      console.log(res);
      // 解构data
      const { data } = res;
      // 获取成功 赋值
      if (res.success) {
        // 存储题目详情
        getModalVisible.detail = data;
        // 显示ra查看模态框
        getModalVisible[category.value.toLowerCase()] = true;
      }
    }).catch(err => {
      throw new Error(err);
    })
  };
  //#endregion

  // 返回
  return {
    getModalVisible,
    showGetModal
  };
}

//#endregion