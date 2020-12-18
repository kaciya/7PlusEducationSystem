// 引入请求方式
import { httpDelete } from "@/utils/http";
// 引入请求接口
import guide from "@/api/guideAPI";
//全局提示
import { message } from "ant-design-vue";
export const useDelGuide = getGuideData => {
  // 点击删除触发的事件
  let delGuide = id => {
    // 发送请求
    httpDelete(guide.DelGuide + id)
      .then(res => {
        // 判断请求是否成功
        if (res.success) {
          // 刷新列表
          getGuideData();
          message.success(res.message);
        } else {
          message.success(res.message);
        }
      })
      .catch(err => {
        // 请求失败的回调
        console.log(err);
      });
  };
  return {
    delGuide
  };
};
