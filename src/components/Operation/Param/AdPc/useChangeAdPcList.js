/**
 * @author Lemon
 * 更改广告位pc状态
 * */
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useChangeAdPcList = getAdPcList => {
  // 点击气泡框的回调
  const changeAdPcList = id => {
    // 发起ajax请求
    httpPost(param.ChangeAdList(id))
      .then(res => {
        // 判断是否操作成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getAdPcList();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };
  // 启用广告
  const enableAdPcList = id => {
    // 发起ajax请求
    httpPost(param.ChangeAdList(id))
      .then(res => {
        // 判断是否操作成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getAdPcList();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    // 点击气泡框的回调
    changeAdPcList,
    // 启用广告
    enableAdPcList
  };
};
