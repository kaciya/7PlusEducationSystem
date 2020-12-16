import { reactive, ref } from "vue";
// 引入api
import { teacherInfo } from "@/api/operationAPI";
// 引入http
import { httpPost } from "@/utils/http";
import { message } from 'ant-design-vue';

// 添加老师
export const useAddTeacherList = (options) => {

  // 模态框状态
  const addLabelVisible = ref(false);
  // 确定按钮loading
  const confirmLoading = ref(false);

  // 显示模态框
  const showModal = () => {
    addLabelVisible.value = true;
  }

  // 获取表单数据
  const addModel = reactive({
    name: '',
    photo: '',
    position: '',
    profiles: '',
    sort: ''
  })

  // 创建自定义校验规则
  let checkSort = async (addRule,value) => {
    // 判断用户是否输入的数字
    if (!Number(value)) {
      return Promise.reject("请输入输入一个正确的数字")
    }
  }
  // 创建简介校验规则
  let checkProfiles = async (addRule,value) => {
    // 判断用户输入的字数是否符合要求
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  }
  // 创建职位校验规则
  let checkPosition = async (addRule,value) => {
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  }

  // 创建表单校验规则
  const addRule = reactive({
    sort: [{validator: checkSort, trigger: 'blur'}],
    name: [{ required: true, message: '请输入老师名称', trigger: 'blur' }],
    profiles: [{validator: checkProfiles, trigger: 'blur' }],
    position: [{validator: checkPosition, trigger: "blur"}]
  })

  let addRef = ref(null);

  // 表单点击确定后的回调函数
  const handleSubmit = () => {
    confirmLoading.value = true;
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 发起ajax请求
        httpPost(teacherInfo.AddTeacherList,addModel)
          .then(res => {
            if (res.code === 200) {
              confirmLoading.value = false;
              // 消息提示
              message.success(res.message);
              // 关闭模态框
              addLabelVisible.value = false;
              // 清除表单里面的值
              addRef.value.resetFields();
              // 重新获取数据
              options.useGetTeacherList(options.pageNum,options.pageSize,() => {
                options.loadState.value = false;
              })
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
    addLabelVisible,
    // 显示模态框
    showModal,
    // 获取表单数据
    addModel,
    // 表单校验规则
    addRule,
    // 表单点击ok后的回调函数
    handleSubmit,
    addRef,
    // 确定按钮loading
    confirmLoading
  }
}