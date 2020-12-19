/**
 * 添加课程
 * */
import { reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { course } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useAddCourseList = getCourse => {
  // 模态框状态
  const addFormVisibility = ref(false);
  // 显示模态框方法
  const showAddForm = () => {
    addFormVisibility.value = true;
  };

  // 获取ref
  const addRef = ref(null);

  // 创建表单数据
  const addModel = reactive({
    name: "",
    introduce: "",
    fit: "",
    trait: "",
    isShow: false
  });

  // 创建规则
  const addRules = {
    name: [
      { min: 1, required: true, message: "课程名称必须填写", trigger: "blur" }
    ],
    introduce: [
      { min: 1, required: true, message: "课程介绍必须填写", trigger: "blur" }
    ],
    fit: [
      { min: 1, required: true, message: "适合人群必须填写", trigger: "blur" }
    ],
    trait: [
      { min: 1, required: true, message: "课程特点必须填写", trigger: "blur" }
    ]
  };

  // 模态框点击确定的回调
  const addSubmit = () => {
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 结构数据
        let { name, introduce, fit, trait, isShow } = addModel;
        isShow = Number(isShow);
        // 发送请求
        httpPost(course.AddCourseList, {
          name,
          introduce,
          fit,
          trait,
          isShow
        })
          .then(res => {
            // 判断是否添加成功
            if (res.code === 200) {
              message.success(res.message);
              // 隐藏模态框
              addFormVisibility.value = false;
              // 清空表单数据
              addRef.value.resetFields();
              // 重新获取数据
              getCourse();
            }
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消时候的回调函数
  const addCancel = () => {
    // 清空表单数据
    addRef.value.resetFields();
  };

  return {
    addFormVisibility,
    addModel,
    addRules,
    addRef,
    showAddForm,
    addSubmit,
    addCancel
  };
};
