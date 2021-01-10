import { reactive, ref, createVNode } from "vue";
// 导入接口
import notice from "@/api/noticeAPI";
// 导入请求方法
import { httpPost } from "@/utils/http";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入日期处理
import moment from "moment";
export const useAddNotice = getNoticeData => {
  // 添加模态框
  const addVisible = ref(false);

  // 表单内容
  const addModel = reactive({
    noticeTitle: "",
    endDate: null,
    noticeContent: "",
    status: undefined
  });

  // 显示添加模态框
  const addShowModal = () => {
    addVisible.value = true;
  };

  // 校验规则
  const addRules = ref({
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
  const addFormRef = ref(null);

  // 关闭添加模态框清空输入框
  const addCloselModal = () => {
    addFormRef.value.resetFields();
  };

  // 添加公告点击确认
  const addConfirmModal = () => {
    addFormRef.value
      .validate()
      .then(res => {
        // 二次确认
        Modal.confirm({
          title: "确认提示",
          icon: createVNode(ExclamationCircleOutlined),
          content: "您是否确定发布公告",
          onOk() {
            let { noticeTitle, endDate, noticeContent, status } = res;
            // 转换日期格式
            endDate = moment(res.endDate).format("YYYY-MM-DD HH:mm:ss");
            // 转JSON格式
            const param = JSON.stringify({
              content: noticeContent,
              endTime: endDate,
              status: Number(status),
              title: noticeTitle
            });
            // 发起添加请求
            httpPost(notice.AddNotice, param)
              .then(res => {
                let { success } = res;
                if (success) {
                  message.success("添加成功");
                  addVisible.value = false;
                  // 重新渲染
                  getNoticeData();
                }
              })
              .catch(err => {
                throw new Error(err);
              });
          },
          onCancel() {
            message.info("已取消");
          }
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  return {
    addVisible,
    addModel,
    addShowModal,
    addRules,
    addFormRef,
    addCloselModal,
    addConfirmModal
  };
};
