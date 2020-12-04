import { reactive, ref } from "vue";
// 引入api
import teacher from "@/api/Operation/TeacherInfo";
// 引入http
import { httpPost } from "@/utils/http";
import { message } from 'ant-design-vue';

// 添加老师
export const addTeacher = () => {
  // 模态框状态
  const ModalState = ref(false);
  // 确定按钮loading
  const confirmLoading = ref(false);

  // 显示模态框
  const showModal = () => {
    ModalState.value = true;
  }

  // 获取表单数据
  const teacherModel = reactive({
    name: '',
    photo: '',
    position: '',
    profiles: '',
    sort: ''
  })

  // 创建自定义校验规则
  let checkSort = async (teacherFormRule,value) => {
    // 判断用户是否输入的数字
    if (!Number(value)) {
      return Promise.reject("请输入输入一个正确的数字")
    }
  }
  // 创建简介校验规则
  let checkProfiles = async (teacherFormRule,value) => {
    // 判断用户输入的字数是否符合要求
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  }
  // 创建职位校验规则
  let checkPosition = async (teacherFormRule,value) => {
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  }

  // 创建表单校验规则
  const teacherFormRule = reactive({
    sort: [{validator: checkSort, trigger: 'change'}],
    name: [{ required: true, message: '请输入老师名称', trigger: 'change' }],
    profiles: [{validator: checkProfiles, trigger: 'change' }],
    position: [{validator: checkPosition, trigger: "change"}]
  })

  let teacherModelRef = ref(null);

  // 表单点击确定后的回调函数
  const handleSubmit = (callback) => {
    confirmLoading.value = true;
    // 进行表单校验
    teacherModelRef.value
      .validate()
      .then(() => {
        // 发起ajax请求
        httpPost(teacher.AddTeacherList,teacherModel)
          .then(res => {
            if (res.code === 200) {
              confirmLoading.value = false;
              // 消息提示
              message.success(res.message);
              // 关闭模态框
              ModalState.value = false;
              // 清除表单里面的值
              teacherModelRef.value.resetFields();
              callback();
            }
          })
          .catch(err => {
            confirmLoading.value = false;
            console.log(err);
          })
      })
      .catch(error => {
        confirmLoading.value = false;
        console.log('error', error);
      });
  }

  return {
    // 模态框状态
    ModalState,
    // 显示模态框
    showModal,
    // 获取表单数据
    teacherModel,
    // 表单校验规则
    teacherFormRule,
    // 表单点击ok后的回调函数
    handleSubmit,
    teacherModelRef,
    // 确定按钮loading
    confirmLoading
  }
}