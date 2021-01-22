import { onMounted, reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const useGetWord = () => {
  // #region 表格
  const wordData = reactive({
    // 表格数据
    data: []
  });
  //  分页配置项
  const wordPagination = reactive({
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
  //#endregion 表格
  //#region 输入框数据
  const wordModel = reactive({
    wordKey: ""
  });
  //#endregion 输入框数据

  //#region 获取（查询）数据
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getWordData = async () => {
    const res = await httpGet(word.GetWord, {
      key: wordModel.wordKey,
      pageNum: wordPagination.current,
      pageSize: wordPagination.pageSize
    });
    if (res.success) {
      // 数据
      wordData.data = res.data.records;
      // 数据总数
      wordPagination.total = res.data.total;
      // 查询成功 把状态设置为true
      isSuccess.value = true;
      // 判断最后一页是否有数据 如果没有跳转前一页
      if (res.data.current > res.data.pages && res.data.pages != 0) {
        wordPagination.current = res.data.pages;
        getWordData();
      }
    }
  };
  //#endregion
  //#region 页码改变回调
  const onTableChange = pagination => {
    wordPagination.current = pagination.current;
    wordPagination.pageSize = pagination.pageSize;
    getWordData();
  };
  //#endregion
  // 初始化
  onMounted(() => {
    getWordData();
  });
  //#region 查询
  const getWord = () => {
    // 判断请求是否发送成功
    if (isSuccess.value) {
      // 点击查询跳转第一页
      wordPagination.current = 1;
      //刷新页面
      getWordData();
      // 全局提示
      message.success("查询成功");
      // 改为默认状态
      isSuccess.value = false;
    }
  };
  //#endregion 查询
  return {
    wordModel,
    wordData,
    wordPagination,
    onTableChange,
    getWordData,
    getWord
  };
};
