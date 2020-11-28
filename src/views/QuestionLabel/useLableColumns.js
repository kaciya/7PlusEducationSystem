//#region 标签管理表格列配置
// 引入响应式API
import { reactive } from "vue";
//
export function useLabelColumns() {
  let labelColumns = reactive([
    {
      title: "标签名称"
    },
    {
      title: "操作"
    }
  ]);

  return {
    labelColumns
  };
}
//#endregion
