//#region 批量上传功能
// 引入响应式API
import { reactive } from "vue";
// 引入接口配置
import word from "@/api/wordPageAPI";
export function useBulkUpload(getWordData) {
  /**
   *   uploadTitle: 模态框标签
   *   templateName: 下载模板名称(不含后缀)
   *   uploadUrl: 上传路径
   *   downloadUrl: 下载模板路径
   *   uploadData: 同步数据方法
   */
  const uploadFile = reactive({
    uploadTitle: "批量导入单词",
    templateName: "单词",
    uploadUrl: word.AddWords,
    downloadUrl: word.ExportTemplat,
    getData: getWordData
  });

  return {
    uploadFile
  };
}
//#endregion
