// 引入请求方式
import { httpDelete } from "@/utils/http";
// 引入请求接口
import guide from "@/api/guideAPI";
// 字体图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const userDelGuide = getUserGuideList => {
  // 点击删除触发的事件
  let handleRemoveGuide = id => {
    // 确认框
    Modal.confirm({
      title: "你确定要删除吗",
      icon: createVNode(ExclamationCircleOutlined),
      okText: "确认",
      cancelText: "取消",
      // 点击确定事件
      onOk() {
        // 发送请求
        httpDelete(guide.DelGuide + id)
          .then(res => {
            // 判断请求是否成功
            if (res.code == 200) {
              // 刷新列表
              getUserGuideList();
            }
          })
          .catch(err => {
            // 请求失败的回调
            console.log(err);
          });
      }
    });
  };
  return {
    handleRemoveGuide
  };
};
