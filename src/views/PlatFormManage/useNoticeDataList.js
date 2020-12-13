import { ref, onMounted } from "vue";
// 导入get请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import notice from "@/api/noticeAPI";
export const useNoticeDataList = () => {
  // 定义内容
  const noticeData = ref();
  // 数据总条数
  const noticeTotal = ref(0);
  // 发起请求获取数据
  const noticeGetData = (pageNum = 1, pageSize = 20, status, title) => {
    const params = {
      descColumns: "createTime",
      pageNum: pageNum,
      pageSize: pageSize,
      status: status,
      title: title
    };
    httpGet(notice.getDataList, params)
      .then(res => {
        const { data } = res;
        noticeTotal.value = data.total;
        if (res.code == 200) {
          noticeData.value = res.data.records;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 获取数据
  onMounted(() => {
    noticeGetData();
  });
  return {
    noticeGetData,
    noticeData,
    noticeTotal
  };
};
