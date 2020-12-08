/**
 * 添加课程
 * */
import { reactive, ref } from "vue";
import { httpPost } from "../../../utils/http";
import { course } from "../../../api/operationAPI";
import { message } from "ant-design-vue";

export const CourseAdd = () => {
  // 模态框状态
  const addFormVisibility = ref(false);
  // 显示模态框方法
  const showAddForm = () => {
    addFormVisibility.value = true;
  }

  // 获取ref
  const AddFormRef = ref(null);

  // 创建表单数据
  const AddForm = reactive({
    name: '',
    introduce: '',
    fit: '',
    trait: '',
    isShow: false
  })

  // 创建规则
  const addFormRules = {
    name: [
      {min: 1,required: true,message: '课程名称必须填写',trigger: "change"},
    ],
    introduce: [
      {min: 1,required: true,message: '课程介绍必须填写',trigger: 'change'}
    ],
    fit: [
      {min: 1,required: true,message: '适合人群必须填写',trigger: 'change'}
    ],
    trait: [
      {min: 1,required: true,message: '课程特点必须填写',trigger: 'change'}
    ]
  }

  // 模态框点击确定的回调
  const handleAddSubmit = (callback) => {
    // 进行表单校验
    AddFormRef.value
      .validate()
      .then(() => {
        // 结构数据
        let { name,introduce, fit, trait, isShow } = AddForm;
        isShow = Number(isShow);
        // 发送请求
        httpPost(course.addCourseList,{
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
              AddFormRef.value.resetFields();
              // 执行回调
              callback();
            }
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return {
    addFormVisibility,
    AddForm,
    addFormRules,
    AddFormRef,
    showAddForm,
    handleAddSubmit
  }
}