import { ref, onMounted, reactive } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import notice from "@/api/noticeAPI";
export const useNoticeDataList = () => {
  // 定义内容
  const noticeData = ref([]);

  // 输入查询
  let noticeTitle = ref("");

  // 公告状态
  let noticeStatus = ref("");

  // 发布人
  let noticeUserName = ref("");

  // 表格分页
  const tablePagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10"],
    total: 0,
    showSizeChanger: true
  });

  // 清空输入框方法
  const clearInput = () => {
    noticeTitle.value = "";
    noticeStatus.value = "";
    noticeUserName = "";
    tablePagination.current = 1;
  };

  // 发起请求获取数据
  const getNoticeData = () => {
    const params = {
      descColumns: "createTime",
      pageNum: tablePagination.current,
      pageSize: tablePagination.pageSize,
      status: noticeStatus.value,
      title: noticeTitle.value,
      username: noticeUserName.value
    };
    httpGet(notice.GetDataList, params)
      .then(res => {
        const { data, success } = res;
        if (success) {
          noticeData.value = data.records;
          tablePagination.total = data.total;
          // 判断是否超出最后一页，如果超出，重新请求
          if (data.current > data.pages && data.pages != 0) {
            tablePagination.current = data.pages;
            getNoticeData();
          }
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // 获取数据
  onMounted(() => {
    getNoticeData();
  });

  return {
    noticeData,
    noticeTitle,
    noticeStatus,
    noticeUserName,
    tablePagination,
    clearInput,
    getNoticeData
  };
};
