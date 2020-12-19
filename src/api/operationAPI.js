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

// 文章列表
export const article = {
  // 获取文章列表
  GetArticleList: "article/page",
  // 开启/关闭文章
  SetArticleState: "article/status"
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
  EditStateAboutList: (id) => `about/status/${id}`,
  // 删除数据列表
  DelAboutList: (id) => `about/${id}`
}

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
