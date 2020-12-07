/**
 * 获取表格数据
 * */

// 引入api
import { exercise } from "@/api/operationAPI";
// 引入http模块
import { httpGet } from "@/utils/http";
import { reactive } from "vue";
// 引入列表数据
import { columns } from "./useExerciseColumns"

// 获取表格数据
export const getExerciseList = () => {
  // 储存请求数据
  const ExerciseData = reactive({columns});
  // 发送请求
  const getExercise = () => {
    httpGet(exercise.GetExerciseList)
      .then(res => {
        console.log(res);
        if (res.code === 200) {
          ExerciseData.data = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 导出数据
  return {
    ExerciseData,
    getExercise
  }
}


