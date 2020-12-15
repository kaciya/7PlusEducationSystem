/**
 * 编辑功能
 * */
import { reactive, ref } from "vue";
// 引入api
import { exercise } from "@/api/operationAPI";;
import { httpPost } from "@/utils/http";

export const ExerciseEdit = (getExercise) => {

  // 获取用户id
  const userId = ref(null);
  // 获取对象名称
  const objectName = ref(null);
  // 设置模态框状态
  const editVisibility = ref(false);
  // 设置模态框按钮状态
  const confirmLoading = ref(false);

  // 显示模态框
  const editShow = (id,name) => {
    editVisibility.value = true;
    // 获取用户id
    userId.value = id;
    // 获取对象名称
    objectName.value = name;
  }

  // 获取表单的值
  const editMode = reactive({
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
  const editRule = {
    content: [
      { validator: validateContent, trigger: 'blur' }
    ]
  }

  // 更改数据
  const ExerciseEditSubmit = () => {
    confirmLoading.value = true;
    // 进行表单校验
    ExerciseEditRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(exercise.UpdateExerciseContent,{
          id: userId.value,
          content: editMode.content,
          name: objectName.value
        })
          .then(res => {
            console.log(res);
            confirmLoading.value = false;
            editVisibility.value = false;
            // 重新获取数据
            getExercise();
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
    editVisibility,
    editMode,
    editRule,
    ExerciseEditRef,
    confirmLoading,
    editShow,
    ExerciseEditSubmit
  }
}