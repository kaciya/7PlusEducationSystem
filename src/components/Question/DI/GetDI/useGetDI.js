//#region 查看RA题型
// 引入响应式API
import {
  reactive, inject
} from "vue";

export function useGetDI() {
  // 题目详情布局
  const layout = reactive({
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 21,
    },
  })
  // 获取[注入]查看详情
  const getDetail = inject("speak/getModalDetail");

  return {
    layout,
    getDetail
  };
}
//#endregion