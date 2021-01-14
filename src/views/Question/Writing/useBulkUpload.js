//#region 批量上传功能
// 引入响应式API
import { reactive, computed } from "vue";
// 引入接口配置
import { write } from "@/api/questionWriteAPI";

export function useBulkUpload(category, getQuestion) {
  /** 批量导入数据
   *   uploadTitle: 模态框标签
   *   templateName: 下载模板名称(不含后缀)
   *   uploadUrl: 上传路径
   *   downloadUrl: 下载模板路径
   */
  console.log(category);
  // 批量上传数据
  const bulkUpload = reactive({
    uploadTitle: "批量上传",
    templateName: computed(() => "题库" + category.value),
    uploadUrl: computed(() => write.BulkUpload(category.value.toLowerCase())),
    downloadUrl: computed(() =>
      write.DownloadTemplate(category.value.toLowerCase())
    ),
    getData: getQuestion
  });

  return {
    bulkUpload
  };
}
//#endregion
