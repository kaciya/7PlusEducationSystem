/**
 * @author Lemon
 * 获取文章列表
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { article } from "@/api/operationAPI";

export const useGetArticleList = () => {
  // 存储数据
  const articlList = reactive({});
  // 分页配置项
  const articlPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });

  // 获取数据
  const getArticl = async () => {
    // 发起ajax请求
    const res = await httpGet(article.GetArticleList, {
      pageNum: articlPagination["current"],
      pageSize: articlPagination["pageSize"]
    });
    // 结构数据
    let { current, size, total, records } = res.data;
    // 判断数据是否获取成功
    if (res.code === 200) {
      // 设置数据
      articlPagination.total = total;
      articlPagination.current = current;
      articlPagination.pageSize = size;
      articlList["data"] = records;
      // 判断最后一页是否有数据 如果没有跳转前一页
      if (res.data.current > res.data.pages && res.data.pages != 0) {
        articlPagination.current = res.data.pages;
        getArticl();
      }
    }
  };

  onMounted(() => {
    getArticl();
  });

  // 页码改变的回调
  const onTableChange = pagination => {
    articlPagination.current = pagination.current;
    articlPagination.pageSize = pagination.pageSize;
    getArticl();
  };

  return {
    // 文章数据
    articlList,
    // 获取文章数据
    getArticl,
    // 分页参数
    articlPagination,
    // 页面改变的回调
    onTableChange
  };
};
