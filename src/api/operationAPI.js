// 参数管理
export const param = {
  // 获取数据列表
  GetDataList: "system/params",
  // 修改数据列表
  EditDataList: "system/param/update",
  // 获取广告列表
  GetAdList: position => `system/ad/${position}`,
  // 禁用广告
  ChangeAdList: id => `system/ad/status/${id}`,
  // 添加广告
  AddAdList: "system/ad/add",
  // 修改广告
  EditAdList: "system/ad/update",
  // 删除广告
  DelAdList: id => `system/ad/${id}`,
  // 获取联系列表
  GetLinkList: "system/contact/list",
  // 更改联系列表状态
  ChangeLinkList: id => `system/contact/status/${id}`,
  // 修改联系方式
  EditLinkList: "system/contact/update"
};

// 师资管理
export const teacherInfo = {
  // 师资列表
  GetTacherList: "teacher/page",
  // 删除老师
  DelTeacherList: "teacher",
  // 添加老师
  AddTeacherList: "teacher/add",
  // 修改老师
  EditTeacherList: "teacher/update"
};

// 课程服务
export const course = {
  // 课程列表
  GetCourseList: "course/page",
  // 添加课程
  AddCourseList: "course/add",
  // 修改课程
  EditCourseList: "course/update",
  // 删除课程
  DelCourseList: "course"
};

// 互动练习
export const exercise = {
  // 互动练习列表
  GetExerciseList: "interactive/list",
  // 更新互动练习内容
  UpdateExerciseContent: "interactive/update"
};

export const campus = {
  // 获取介绍列表
  GetIntroList: "school/introduce",
  // 更新介绍列表
  UpdateIntroList: "school/introduce/update",
  // 获取校区数据列表
  GetCampuTableList: "school/campus/list",
  // 添加校区列表
  AddCampuTableList: "school/campus/add",
  // 修改校区列表
  EditCampuTableList: "school/campus/update",
  // 删除校区列表
  DelCampuTableList: id => `school/campus/${id}`,
  // 获取校区风采列表
  GetCampStyleList: "school/campus/style/list",
  // 添加校区风采
  AddCampStyleList: "school/campus/style/add",
  // 编辑校区风采
  EditCampStyleList: "school/campus/style/update",
  // 删除校区风采
  DelCampStyleList: id => `school/campus/style/${id}`
};

// 文章列表
export const article = {
  // 获取文章列表
  GetArticleList: "article/page",
  // 开启/关闭文章
  SetArticleState: "article/status",
  // 添加文章列表
  AddArticleList: "article/add",
  // 编辑文章列表
  EditArticleList: "article/update",
  // 删除文章列表
  DelArticleList: id => `article/${id}`
};

// 关于PTE
export const about = {
  // 获取数据列表
  GetAboutList: "about/page",
  // 发布
  AddAboutList: "about/add",
  // 修改数据列表
  EditAboutList: "about/update",
  // 修改文章状态
  EditStateAboutList: id => `about/status/${id}`,
  // 删除数据列表
  DelAboutList: id => `about/${id}`
};

// 常见问题
export const problem = {
  // 获取常见问题列表
  GetProblemList: "issue/list",
  // 添加常见问题
  AddProblemList: "issue/add",
  // 编辑常见问题
  EditProblemList: "issue/update",
  // 删除常见问题
  DelProblemList: "issue"
};
