// 题库 接口配置
// ra题型
export const speak = {
  // 批量上传
  BulkUpload: category => `/question/speak/${category}/import`,
  // 模板下载
  DownloadTemplate: category => `/question/speak/${category}/export/template`,
  // 查看题目详情
  GetDetail: (category, id) => `/question/speak/${category}/detail/${id}`,
  // 添加题目
  AddQuestion: category => `/question/speak/${category}/add`,
  // 更新题目
  EditQuestion: category => `/question/speak/${category}/update`
};
