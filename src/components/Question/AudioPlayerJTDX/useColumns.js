//#region 获取片段columns
// 导入响应api
import { reactive } from "vue";
export const useColumns = () => {
  // 片段columns
  const fColumns = reactive([
    {
      title: "文件名",
      key: "fileName",
      slots: { customRender: "fileName" },
      align: "center"
    },
    {
      title: "提取时长",
      key: "extractTime",
      slots: { customRender: "extractTime" },
      align: "center"
    },
    {
      title: "音频内时间",
      key: "audioTime",
      slots: { customRender: "audioTime" },
      align: "center"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" },
      align: "center"
    }
  ]);

  return {
    fColumns
  };
};
//#endregion
