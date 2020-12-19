//#region 模板下载 功能
// 引入接口配置
import { speak } from "@/api/questionSpeakAPI";
// 导出
export function useDownloadTemplate(category) {
  // 下载模板地址
  const downloadTemplateUrl = 'http://pte.admin.api.banyuge.com/admin' + speak.DownloadTemplate(category.value.toLowerCase());

  return {
    downloadTemplateUrl
  };
}
//#endregion
