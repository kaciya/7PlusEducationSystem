import { reactive, ref } from "vue";
// 导入接口
import notice from "@/api/noticeAPI";
// 导入请求方法
import { httpPost, httpGet } from "@/utils/http";
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
    noticeContent: "",
    status: undefined
  });

  // id
  const editNoticeId = ref("");

  // 显示编辑模态框并回显
  const editShowModal = record => {
    // 获取回显数据
    httpGet(notice.ShowEdit + "/" + record.id)
      .then(res => {
        const { success, data } = res;
        if (success) {
          editModel.noticeTitle = data.title;
          editModel.endDate = moment(data.endTime, "YYYY-MM-DD HH:mm:ss");
          editModel.noticeContent = data.content;
          editModel.status = data.status.toString();
          // id
          editNoticeId.value = data.id;
          // 显示模态框
          editVisible.value = true;
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // 校验规则
  const editRules = reactive({
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
    status: [
      {
        type: "string",
        required: true,
        message: "状态不能为空",
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
        let { noticeTitle, endDate, noticeContent, status } = res;
        // 转换日期格式
        endDate = moment(res.endDate).format("YYYY-MM-DD HH:mm:ss");
        // 转JSON格式
        const param = JSON.stringify({
          id: editNoticeId.value,
          content: noticeContent,
          endTime: endDate,
          status: Number(status),
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
