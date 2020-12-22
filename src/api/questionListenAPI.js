// 听力题库 接口配置
export const listen = {
  // 更新题目
  EditQuestion: category => `/question/listen/${category}/update`,
  // 批量上传
  BulkUpload: category => `/question/listen/${category}/import`,
  // 模板下载
  DownloadTemplate: category => `/question/listen/${category}/export/template`,
  // 添加题目
  AddQuestion: category => `/question/listen/${category}/add`,
  // 查询题目详情
  GetQuestion: category => `/question/listen/${category}/detail`
};
