/**
 * @author Lemon
 * 课程编辑
 * */
import { reactive, ref } from "vue"
// 引入api
import { course } from "../../../api/operationAPI"
import { httpPost } from "../../../utils/http";
import { message } from "ant-design-vue";

export const courseEdit = () => {
  // 设置模态框的状态
  const Editvisible = ref(false);
  // 课程id
  const courseId = ref(null);

  // 创建表单数据
  const EditForm = reactive({
    name: '',
    introduce: '',
    fit: '',
    trait: '',
    isShow: false
  })

  // 显示模态框
  const handleShowEdit = (record) => {
    // 设置表单数据
    EditForm['name'] = record.name;
    EditForm['introduce'] = record.introduce;
    EditForm['fit'] = record.fit;
    EditForm['trait'] = record.trait;
    EditForm['isShow'] = Boolean(record.isShow);
    courseId.value = record.id;
    Editvisible.value = true;
  }

  // 获取ref
  const EditFormRef = ref(null);

  // 创建规则
  const EditFormRules = {
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

  // 点击确定的回调
  const handleEditSubmit = (callback) => {
    EditFormRef.value
      .validate()
      .then(async () => {
        // 结构数据
        let { name,introduce, fit, trait, isShow } = EditForm;
        isShow = Number(isShow);
        // 发送请求
        let res = await httpPost(course.editCourseList,{
          name,
          introduce,
          fit,
          trait,
          isShow,
          id:courseId.value
        });
        // 判断是否操作成功
        if (res.code === 200) {
          message.success(res.message);
          // 关闭模态框
          Editvisible.value = false;
          // 清空表单数据
          EditFormRef.value.resetFields();
          // 执行回调
          callback();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return {
    Editvisible,
    EditForm,
    EditFormRules,
    EditFormRef,
    handleShowEdit,
    handleEditSubmit
  }
}
