//#region 批量上传功能
// 引入响应式API
import { reactive, watch } from "vue";
// 引入接口配置
import { speak } from "@/api/questionSpeakAPI";

export function useBulkUpload(category, getQuestion) {
  /** 批量导入数据
   *   uploadTitle: 模态框标签
   *   templateName: 下载模板名称(不含后缀)
   *   uploadUrl: 上传路径
   *   downloadUrl: 下载模板路径
   *   uploadData: 同步数据方法
   */
  const uploadFile = reactive({
    uploadTitle: "批量上传",
    templateName: `题库${category.value}`,
    uploadUrl: speak.BulkUpload(category.value.toLowerCase()),
    downloadUrl: speak.DownloadTemplate(category.value.toLowerCase()),
    getData: getQuestion
  });

  // 监听category的变化 修改批量上传所需数据
  watch(category, () => {
    uploadFile.templateName = `题库${category.value}`;
    uploadFile.uploadUrl = speak.BulkUpload(category.value.toLowerCase());
    uploadFile.downloadUrl = speak.DownloadTemplate(
      category.value.toLowerCase()
    );
  });

  return {
    uploadFile
  };
}
//#endregion
