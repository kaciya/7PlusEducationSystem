import { reactive, ref } from "vue";
// 导入接口
import notice from "@/api/noticeAPI";
// 导入get请求方法
import { httpPost } from "@/utils/http";
// 引入日期处理
import moment from "moment";
export const useNoticeAdd = () => {
  // 添加模态框
  const addVisible = ref(false);
  // 表单内容
  const addModel = reactive({
    noticeTitle: "",
    endDate: null,
    noticeContent: ""
  });
  // 显示添加模态框
  const addShowModal = () => {
    addVisible.value = true;
  };
  // 校验规则
  const addRules = ref({
    noticeTitle: [
      { required: true, message: "公告标题不能为空", trigger: "blur" },
      { min: 1, max: 20, message: "长度在1-20之间", trigger: "blur" }
    ],
    endDate: [
      {
        type: "date",
        required: true,
        message: "截止时间不能为空",
        trigger: "blur"
      }
    ],
    noticeContent: [
      { required: true, message: "公告内容不能为空", trigger: "blur" }
    ]
  });

  // 关闭添加模态框
  const cancelAddModal = () => {
    addModel.endDate = null;
    addModel.noticeTitle = "";
    addModel.noticeContent = "";
  };
  // ref
  const addForm = ref(null);
  // 添加公告点击确认
  const confirmAddModal = () => {
    addForm.value
      .validate()
      .then(res => {
        let { noticeTitle, endDate, noticeContent } = res;
        // 转换日期格式
        endDate = moment(res.endDate).format("YYYY-MM-DD");
        // 转JSON格式
        const param = JSON.stringify({
          content: noticeContent,
          endTime: endDate,
          status: 1,
          title: noticeTitle
        });
        // 发起添加请求
        httpPost(notice.addNotice, param)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  return {
    addVisible,
    addShowModal,
    addModel,
    addRules,
    cancelAddModal,
    confirmAddModal,
    addForm
  };
};
