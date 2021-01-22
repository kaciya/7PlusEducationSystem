//#region 批量上传功能
// 引入响应式API
import { reactive, computed } from "vue";
// 引入接口配置
import { listen } from "@/api/questionListenAPI";

export function useBulkUpload(category, getQuestion) {
  // 批量上传数据
  const bulkUpload = reactive({
    uploadTitle: "批量导入",
    templateName: computed(() => "题库" + category.value),
    uploadUrl: computed(() => listen.BulkUpload(category.value.toLowerCase())),
    downloadUrl: computed(() =>
      listen.DownloadTemplate(category.value.toLowerCase())
    ),
    getData: getQuestion
  });

  return {
    bulkUpload
  };
}
//#endregion
