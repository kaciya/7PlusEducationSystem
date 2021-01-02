// 阅读题库 接口配置

export const read = {
  // 添加题目
  AddQuestion: category => `/question/read/${category}/add`,
  // 查询题目详情
  GetQuestion: category => `/question/read/${category}/detail`,
  // 更新题目
  EditQuestion: category => `/question/read/${category}/update`
};
