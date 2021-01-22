/**
 * @author Lemon
 * 删除校区列表
 * */
import { httpDelete } from "@/utils/http";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useDelCampuTableList = getCampuTableList => {
  // 点击确定的回调函数
  const delSubmit = id => {
    // 发起ajax请求
    httpDelete(campus.DelCampuTableList(id))
      .then(res => {
        // 判断是否删除成功
        if (res.success === true) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getCampuTableList();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    delSubmit
  };
};
