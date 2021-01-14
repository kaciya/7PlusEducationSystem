/**
 * @author Lemon
 * 课程编辑
 * */
import { reactive, ref } from "vue";
// 引入api
import { course } from "@/api/operationAPI";
import { httpPost } from "@/utils/http";
import { message } from "ant-design-vue";

export const useEditCourseList = getCourse => {
  // 设置模态框的状态
  const editvisible = ref(false);
  // 课程id
  const courseId = ref(null);

  // 创建表单数据
  const editModel = reactive({
    name: "",
    introduce: "",
    fit: "",
    trait: "",
    isShow: false
  });

  // 显示模态框
  const showEdit = record => {
    courseId.value = record.id;
    editModel.name = record.name;
    editModel.introduce = record.introduce;
    editModel.fit = record.fit;
    editModel.trait = record.trait;
    editModel.isShow = Boolean(record.isShow);
    editvisible.value = true;
  };

  // 获取ref
  const editRef = ref(null);

  // 创建规则
  const editRules = {
    name: [
      { min: 1, required: true, message: "课程名称必须填写", trigger: "change" }
    ],
    introduce: [
      { min: 1, required: true, message: "课程介绍必须填写", trigger: "change" }
    ],
    fit: [
      { min: 1, required: true, message: "适合人群必须填写", trigger: "change" }
    ],
    trait: [
      { min: 1, required: true, message: "课程特点必须填写", trigger: "change" }
    ]
  };

  // 点击确定的回调
  const editSubmit = () => {
    editRef.value
      .validate()
      .then(async () => {
        // 结构数据
        let { name, introduce, fit, trait, isShow } = editModel;
        isShow = Number(isShow);
        // 发送请求
        let res = await httpPost(course.EditCourseList, {
          name,
          introduce,
          fit,
          trait,
          isShow: Number(isShow),
          id: courseId.value
        });
        // 判断是否操作成功
        if (res.code === 200) {
          message.success(res.message);
          // 关闭模态框
          editvisible.value = false;
          // 清空表单数据
          editRef.value.resetFields();
          // 执行回调
          getCourse();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const editCancel = () => {
    // 清空表单数据
    editRef.value.resetFields();
  };

  return {
    editvisible,
    editModel,
    editRules,
    editRef,
    showEdit,
    editSubmit,
    editCancel
  };
};
