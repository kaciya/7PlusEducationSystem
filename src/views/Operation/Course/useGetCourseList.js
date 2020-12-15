import { reactive } from "vue";
// 引入http
import { httpGet } from "@/utils/http";
// 引入api
import { course } from "@/api/operationAPI";

// 获取数据
export const getCourseList = () => {
  // 创建变量存储数据
  const CourseListData = reactive({});
  // 发送请求
  const getCourse = async () => {
    let res = await httpGet(course.getCourseList);
    // 判断是否获取成功
    if (res.code === 200) {
      // 设置数据
      CourseListData.data = res.data;
    }
  }

  return {
    CourseListData,
    getCourse
  }
}