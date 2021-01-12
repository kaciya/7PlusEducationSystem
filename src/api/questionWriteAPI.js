// 写作题库 接口配置

export const write = {
  // 添加题目
  AddQuestion: category => `/question/write/${category}/add`,
  // 查询题目详情
  GetQuestion: category => `/question/write/${category}/detail`,
  // 更新题目
  EditQuestion: category => `/question/write/${category}/update`,
  // 批量上传
  BulkUpload: category => `/question/write/${category}/import`,
  // 模板下载
  DownloadTemplate: category => `/question/write/${category}/export/template`
};
