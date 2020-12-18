//#region 模板下载 功能
// 引入接口配置
import { listen } from "@/api/questionListenAPI";
// 导出
export function useDownloadTemplate(category) {
  // 下载模板地址
  const downloadTemplateUrl =
    "http://pte.admin.api.banyuge.com/admin" +
    listen.DownloadTemplate(category.value.toLowerCase());

  return {
    downloadTemplateUrl
  };
}
//#endregion
