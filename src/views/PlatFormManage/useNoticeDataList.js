import { ref, onMounted, reactive } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import notice from "@/api/noticeAPI";
export const useNoticeDataList = () => {
  // 定义内容
  const noticeData = ref([]);

  // 表格分页
  const tablePagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10"],
    total: 0,
    showSizeChanger: true
  });

  // 发起请求获取数据
  const getNoticeData = (status, title, username) => {
    const params = {
      descColumns: "createTime",
      pageNum: tablePagination.current,
      pageSize: tablePagination.pageSize,
      status: status,
      title: title,
      username: username
    };
    httpGet(notice.GetDataList, params)
      .then(res => {
        const { data } = res;
        if (res.code == 200) {
          noticeData.value = data.records;
          tablePagination.total = data.total;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 获取数据
  onMounted(() => {
    getNoticeData();
  });

  return {
    getNoticeData,
    noticeData,
    tablePagination
  };
};
