import { ref, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const useGetDetail = id => {
  // 存放后台数据
  const userDetailData = ref([]);
  // 获取后台数据
  const getuserDetailData = async () => {
    const res = await httpGet(user.GetUserDetail + `/${id}`);
    if (res.success) {
      userDetailData.value = res.data;
    }
  };
  // 初始化获取数据
  onMounted(() => getuserDetailData());

  return {
    userDetailData
  };
};
