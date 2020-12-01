//#region 标签管理表格列配置
// 引入响应式API
import { reactive } from "vue";
// 导出
export function useLabelColumns() {
  // 标签管理列配置
  const labelColumns = reactive([
    {
      title: "标签名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    labelColumns
  };
}
//#endregion
