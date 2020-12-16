/**
 * @author Lemon
 * 获取常见问题数据列表
 * */
import { httpGet } from "@/utils/http";
import { problem } from "@/api/operationAPI";
import { reactive } from "vue";

export const getProblemGetList = () => {
  // 储存数据
  const ProblemList = reactive({});

  // 获取数据方法
  const getProblem = async () => {
    // 发送ajax请求
    const res = await httpGet(problem.GetProblemList);
    // 判断数据是否获取成功
    if (res.code === 200) {
      // 设置数据
      ProblemList.data = res.data;
    }
  };

  return {
    ProblemList,
    getProblem
  };
};
