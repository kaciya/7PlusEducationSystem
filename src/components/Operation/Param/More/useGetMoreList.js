/**
 * @author Lemon
 * 获取更多服务列表数据
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "../../../../utils/http";
import { param } from "../../../../api/operationAPI";

export const useGetMoreList = () => {
  // 创建数据
  const moreList = reactive({
    len: 0
  });
  // 获取数据列表
  const getMoreList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("MOBILE_MORE"))
      .then(res => {
        // 判断数据是否获取成功
        if (res.success) {
          // 设置数据
          moreList.data = res.data;
          moreList.len = res.data.length;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  // 使用钩子函数
  onMounted(() => {
    getMoreList();
  });

  return {
    // 列表数据
    moreList,
    // 获取列表数据
    getMoreList
  };
};
