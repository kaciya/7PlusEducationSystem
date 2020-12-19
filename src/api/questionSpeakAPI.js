// 题库 接口配置
// ra题型
export const speak = {
  // 设置题目标签
  SetLabels: (category) => `/question/speak/${category}/update`,
  // 批量上传
  BulkUpload: (category) => `/question/speak/${category}/import`,
  // 模板下载
  DownloadTemplate: (category) => `/question/speak/${category}/export/template`,
  // 查看题目详情
  GetDetail: (category, id) => `/question/speak/${category}/detail/${id}`
}