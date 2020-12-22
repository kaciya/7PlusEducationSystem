import { reactive, ref } from "vue";
// 导入接口
import notice from "@/api/noticeAPI";
// 导入请求方法
import { httpPost } from "@/utils/http";
// 引入提示方法
import { message } from "ant-design-vue";
// 引入日期处理
import moment from "moment";
export const useEditNotice = getNoticeData => {
  // 编辑模态框
  const editVisible = ref(false);

  // 表单内容
  const editModel = reactive({
    noticeTitle: "",
    endDate: null,
    noticeContent: ""
  });

  // id
  const editNoticeId = ref("");

  // 公告状态
  const editNoticeStatus = ref("");

  // 显示编辑模态框
  const editShowModal = text => {
    // 显示模态框
    editVisible.value = true;
    // id
    editNoticeId.value = text.id;
    // 状态
    editNoticeStatus.value = text.status;
    // 输入框回显
    editModel.noticeTitle = text.title;
    editModel.endDate = moment(text.createTime, "YYYY-MM-DD HH:mm:ss");
    editModel.noticeContent = text.content;
  };

  // 校验规则
  const editRules = ref({
    noticeTitle: [
      {
        required: true,
        whitespace: true,
        message: "公告标题不能为空",
        trigger: "blur"
      },
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
      {
        required: true,
        whitespace: true,
        message: "公告内容不能为空",
        trigger: "blur"
      }
    ]
  });

  // 表单ref
  const editFormRef = ref(null);

  // 关闭编辑模态框清空输入框
  const editCloselModal = () => {
    editFormRef.value.resetFields();
  };

  // 编辑公告点击确认
  const editConfirmModal = () => {
    editFormRef.value
      .validate()
      .then(res => {
        let { noticeTitle, endDate, noticeContent } = res;
        // 转换日期格式
        endDate = moment(res.endDate).format("YYYY-MM-DD HH:mm:ss");
        // 转JSON格式
        const param = JSON.stringify({
          id: editNoticeId.value,
          content: noticeContent,
          endTime: endDate,
          status: editNoticeStatus.value,
          title: noticeTitle
        });
        httpPost(notice.EditNotice, param)
          .then(res => {
            let { success } = res;
            if (success) {
              message.success("编辑成功");
              editVisible.value = false;
              // 重新渲染
              getNoticeData();
            }
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  return {
    editVisible,
    editModel,
    editShowModal,
    editRules,
    editFormRef,
    editCloselModal,
    editConfirmModal
  };
};
