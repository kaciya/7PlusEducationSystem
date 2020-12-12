// 听力题库 接口配置
// sst题型
export const listen = {
  // 设置题目标签
  SetLabels: (category) => `/question/listen/${category}/update`,
  // 批量上传
  BulkUpload: (category) => `/question/listen/${category}/import`,
  // 模板下载
  DownloadTemplate: (category) => `/question/listen/${category}/export/template`,
}