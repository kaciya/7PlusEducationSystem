import { ref, createVNode } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入请求方法
import { httpPost } from "@/utils/http";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useSetTopicShieldShow = getTopicData => {
  // 屏蔽模态框
  const topicShieldVisible = ref(false);

  // 屏蔽用户的id
  const topicUserId = ref(null);

  // 屏蔽模态框内容
  const shielFrameValue = ref("");

  // 显示屏蔽模态框
  const topicShieldModal = id => {
    topicShieldVisible.value = true;
    topicUserId.value = id;
  };

  // 屏蔽模态框确认
  const confirmShieldModal = () => {
    const params = {
      id: topicUserId.value,
      reason: shielFrameValue.value
    };
    httpPost(topic.ShieldShowUser, params)
      .then(res => {
        let { success } = res;
        if (success) {
          message.success("屏蔽成功");
          topicShieldVisible.value = false;
          shielFrameValue.value = "";
          // 重新渲染数据
          getTopicData();
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // 关闭模态框清空并提示
  const cancelShieldModal = () => {
    shielFrameValue.value = "";
    message.info("已取消屏蔽");
  };

  // 显示框及确认
  const topicShowModal = id => {
    Modal.confirm({
      title: "您是否要执行显示",
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        httpPost(topic.ShieldShowUser, {
          id: id
        })
          .then(res => {
            let { success } = res;
            if (success) {
              message.success("显示成功");
              topicShieldVisible.value = false;
              // 重新渲染数据
              getTopicData();
            }
          })
          .catch(err => {
            throw new Error(err);
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
    topicShieldModal,
    confirmShieldModal,
    topicShowModal,
    cancelShieldModal
  };
};
