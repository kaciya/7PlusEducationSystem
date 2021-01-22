/**
 * @author Lemon
 * 获取联系列表
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useGetLinkList = () => {
  // 储存数据
  const linkList = reactive({});
  // 获取列表数据
  const getLinkList = () => {
    // 发送ajax请求
    httpGet(param.GetLinkList)
      .then(res => {
        // 判断数据是否获取成功
        if (res.success) {
          // 将数据存入到变量中
          linkList.data = res.data;
        } else {
          // 提示用户
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 挂载到钩子函数上
  onMounted(() => {
    getLinkList();
  });

  return {
    // 储存数据
    linkList,
    // 获取数据列表
    getLinkList
  };
};
