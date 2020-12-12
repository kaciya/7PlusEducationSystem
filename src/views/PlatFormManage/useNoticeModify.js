import { reactive, ref } from "vue";
// 导入接口
import notice from "@/api/noticeAPI";
// 导入get请求方法
import { httpPost } from "@/utils/http";
// 引入日期处理
import moment from "moment";
export const useNoticeModify = () => {
  // 表单内容
  const updateModel = reactive({
    noticeTitle: "",
    endDate: null,
    noticeContent: ""
  });
  const editNoticeId = ref("");
  const editNoticeStatus = ref("");
  // 编辑模态框
  const updateVisible = ref(false);
  // 显示编辑模态框
  const handleShowUpdateModal = (id, title, content, createTime, status) => {
    updateVisible.value = true;
    editNoticeId.value = id;
    editNoticeStatus.value = status;
    updateModel.noticeTitle = title;
    updateModel.endDate = moment(createTime, "YYYY-MM-DD");
    updateModel.noticeContent = content;
  };
  // 关闭编辑模态框
  const handleCancelUpdateModal = () => {
    updateModel.endDate = null;
    updateModel.noticeTitle = "";
  };

  // 校验规则
  const updateRules = ref({
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

  // 表单ref
  const updateForm = ref(null);
  // 编辑公告点击确认
  const handleConfirmUpdateModal = () => {
    updateForm.value
      .validate()
      .then(res => {
        let { noticeTitle, endDate, noticeContent } = res;
        // 转换日期格式
        endDate = moment(res.endDate).format("YYYY-MM-DD");
        // 转JSON格式
        const param = JSON.stringify({
          id: editNoticeId.value,
          content: noticeContent,
          endTime: endDate,
          status: editNoticeStatus.value,
          title: noticeTitle
        });
        httpPost(notice.editNotice, param)
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
    updateVisible,
    handleShowUpdateModal,
    updateModel,
    updateRules,
    handleCancelUpdateModal,
    handleConfirmUpdateModal,
    updateForm
  };
};
