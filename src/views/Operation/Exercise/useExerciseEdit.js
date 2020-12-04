/**
 * 编辑功能
 * */
import { reactive, ref } from "vue";
// 引入api
import { Exercise } from "@/api/Operation/Exercise";
import { httpPost } from "@/utils/http";

export const ExerciseEdit = () => {

  // 获取用户id
  const userId = ref(null);
  // 获取对象名称
  const objectName = ref(null);
  // 设置模态框状态
  const ExerciseModalState = ref(false);
  // 设置模态框按钮状态
  const confirmLoading = ref(false);

  // 显示模态框
  const showExerciseModal = (id,name) => {
    ExerciseModalState.value = true;
    // 获取用户id
    userId.value = id;
    // 获取对象名称
    objectName.value = name;
  }

  // 获取表单的值
  const ExerciseEditModel = reactive({
    content: ''
  })

  // 获取ref
  let ExerciseEditRef = ref(null);
  // 创建自定义校验规则
  let validateContent = async (rule,value) => {
    // 判断用户是否输入了内容
    if (value.trim().length === 0) {
      return Promise.reject("内容不能为空")
    }
  }
  // 创建表单校验规则
  const ExerciseEditModelRule = {
    content: [
      { validator: validateContent, trigger: 'change' }
    ]
  }

  // 更改数据
  const ExerciseEditSubmit = (callback) => {
    confirmLoading.value = true;
    // 进行表单校验
    ExerciseEditRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(Exercise.UpdateExerciseContent,{
          id: userId.value,
          content: ExerciseEditModel.content,
          name: objectName.value
        })
          .then(res => {
            console.log(res);
            confirmLoading.value = false;
            ExerciseModalState.value = false;
            // 重新获取数据
            callback();
          })
          .catch(err => {
            console.log(err);
            confirmLoading.value = false;
          })

      })
      .catch(error => {
        console.log('error', error);
        confirmLoading.value = false;
      });
  }

  return {
    ExerciseModalState,
    ExerciseEditModel,
    ExerciseEditModelRule,
    ExerciseEditRef,
    confirmLoading,
    showExerciseModal,
    ExerciseEditSubmit
  }
}