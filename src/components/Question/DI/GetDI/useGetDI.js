//#region 查看RA题型
// 引入响应式API
import { reactive } from "vue";

export function useGetDI() {
  // 题目详情布局
  const layout = reactive({
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 21
    }
  });

  return {
    layout
  };
}
//#endregion
