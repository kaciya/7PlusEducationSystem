import { ref, createVNode } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入get请求方法
import { httpPost } from "@/utils/http";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useTopicShieldShow = topicGetData => {
  // 屏蔽模态框
  const topicShieldVisible = ref(false);
  // 屏蔽用户的id
  const topicUserId = ref(null);
  // 屏蔽模态框内容
  const shielFrameValue = ref("");
  // 显示屏蔽模态框
  const topicShield = id => {
    topicShieldVisible.value = true;
    topicUserId.value = id;
  };
  // 屏蔽模态框确认
  const confirmShieldModal = pageNum => {
    const params = {
      id: topicUserId.value,
      reason: shielFrameValue.value
    };
    httpPost(topic.shieldShowUser, params)
      .then(res => {
        if (res.code == 200) {
          message.success("屏蔽成功");
          topicShieldVisible.value = false;
          shielFrameValue.value = "";
          topicGetData(pageNum);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 关闭模态框清空并提示
  const cancelShieldModal = () => {
    shielFrameValue.value = "";
    message.info("已取消屏蔽");
  };
  // 显示框及确认
  const topicShow = (id, pageNum) => {
    Modal.confirm({
      title: "你是否要执行显示",
      icon: createVNode(ExclamationCircleOutlined),
      okText: "确认",
      cancelText: "取消",
      onOk() {
        httpPost(topic.shieldShowUser, {
          id: id
        })
          .then(res => {
            if (res.code == 200) {
              message.success("显示成功");
              topicShieldVisible.value = false;
              topicGetData(pageNum);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      onCancel() {
        message.info("已取消显示");
      }
    });
  };

  return {
    topicShieldVisible,
    shielFrameValue,
    topicShield,
    confirmShieldModal,
    topicShow,
    cancelShieldModal
  };
};
