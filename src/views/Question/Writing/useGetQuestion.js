//#region 选择题目分类

// 导入 get 请求
import { httpGet } from "@/utils/http";

// 导入接口配置文件
import question from "@/api/questionAPI";

// 引入响应式API
import { onMounted, ref, reactive, provide } from "vue";

export function useGetQuestion() {
  // 当前题目分类
  const category = ref("SWT");
  // 当前题目标签筛选（默认空字符串为全部）
  const labelId = ref("");
  // 加载状态
  const isLoading = ref(false);
  // 题目列表
  const questionList = ref([]);
  // 分页配置项
  const configPage = reactive({
    // 总条数
    total: 0,
    // 当前页
    current: 1,
    // 每页显示条数
    pageSize: 10,
    showSizeChanger: true
  });
  // 获取题目
  const getQuestion = goFirstPage => {
    // 开启加载状态
    isLoading.value = true;
    if (goFirstPage) {
      configPage.current = 1;
    }
    // 发起数据请求
    httpGet(question.GetQuestion, {
      // 二级分类
      category: category.value,
      // 标签
      labelId: labelId.value,
      // 页码
      pageNum: configPage.current,
      // 分页大小
      pageSize: configPage.pageSize,
      // 类型  4.写
      type: 4
    })
      .then(res => {
        // console.log(res);
        let { success, data } = res;
        if (success) {
          // 表格数据源赋值
          questionList.value = data.records;
          // 记录数据库中的数据总数
          configPage.total = data.total;
          // 判断是否超出最后一页，如果超出，重新请求
          // 此处注意data.pages!=0是为了避免出现因为没数据不停重复请求的情况
          if (data.current > data.pages && data.pages != 0) {
            configPage.current = data.pages;
            getQuestion();
          }
          // 关闭加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 向后代组件提供获取题目列表的方法
  provide("getQuestion", getQuestion);

  // 跳转页码
  const changePagenum = pagination => {
    configPage.current = pagination.current;
    configPage.pageSize = pagination.pageSize;
    getQuestion();
  };
  // 初始化
  onMounted(() => {
    // 获取题目列表
    getQuestion();
  });
  return {
    category,
    labelId,
    isLoading,
    questionList,
    configPage,
    getQuestion,
    changePagenum
  };
}

//#endregion
