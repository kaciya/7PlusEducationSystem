// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import guide from "@/api/guideAPI";
import { reactive, ref } from "vue";
//全局提示
import { message } from "ant-design-vue";
export const useEditGuide = (getGuideData, guideType) => {
  //表单数据
  const editGuideModel = reactive({
    testRequires: "",
    grade: "",
    problemsNumber: "",
    examine: "",
    answerTime: "",
    keyPoints: ""
  });
  // 控制模态框显示隐藏
  const editVisible = ref(false);
  // 表单ref
  const editGuideRef = ref(null);
  // 用户id
  const id = ref();
  // 用户category
  const category = ref();
  // 点击编辑触发的事件
  const editGuide = record => {
    // 显示模态框
    editVisible.value = true;
    // 获取用户id
    id.value = record.id;
    // 获取用户category
    category.value = record.category;
    // 数据回显
    editGuideModel.testRequires = record.testRequires;
    editGuideModel.grade = record.grade;
    editGuideModel.problemsNumber = record.problemsNumber;
    editGuideModel.examine = record.examine;
    editGuideModel.answerTime = record.answerTime;
    editGuideModel.keyPoints = record.keyPoints;
  };
  // 点击确定的回调
  const editGuideOk = () => {
    // 发送请求修改数据
    httpPost(guide.EditGuide, {
      id: id.value,
      category: category.value,
      type: guideType,
      answerTime: editGuideModel.answerTime,
      grade: editGuideModel.grade,
      examine: editGuideModel.examine,
      keyPoints: editGuideModel.keyPoints,
      problemsNumber: editGuideModel.problemsNumber,
      testRequires: editGuideModel.testRequires
    })
      .then(res => {
        // 判断请求是否成功
        if (res.success) {
          // 刷新页面
          getGuideData();
          message.success(res.message);
          // 关闭模态框
          editVisible.value = false;
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 模态框关闭的回调
  const editGuideEmpty = () => {
    //清空文本框
    editGuideRef.value.resetFields();
  };
  return {
    editGuideModel,
    editVisible,
    editGuideRef,
    editGuide,
    editGuideOk,
    editGuideEmpty
  };
};
