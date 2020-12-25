// 写作题库 接口配置

export const write = {
  // 添加题目
  AddQuestion: category => `/question/write/${category}/add`,
  // 查询题目详情
  GetQuestion: category => `/question/write/${category}/detail`,
  // 更新题目
  EditQuestion: category => `/question/write/${category}/update`
};
