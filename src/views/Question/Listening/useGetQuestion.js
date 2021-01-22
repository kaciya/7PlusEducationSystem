//#region 选择题目分类
// 导入get请求
import { httpGet } from "@/utils/http";
// 导入接口配置文件
import question from "@/api/questionAPI";
// 引入响应式API
import { ref, onMounted, reactive, provide } from "vue";

export function useGetQuestion() {
  // 当前题目分类
  const category = ref("SST");

  // 当前题目标签筛选（默认空字符串为全部）
  const labelId = ref("");

  // 加载状态
  const isLoading = ref(false);

  // 题目列表
  const questionList = ref([]);

  // 分页器配置
  const questionPagination = reactive({
    // 总页数
    total: 0,
    // 页码
    current: 1,
    // 每页多少条
    pageSize: 10,
    // 显示每页多少条设置器
    showSizeChanger: true,
    // 每页允许显示多少条
    pageSizeOptions: ["10"]
  });

  /**
   * 获取题目
   * @param {*} goFirstPage 是否前往第一页
   */
  const getQuestion = goFirstPage => {
    if (goFirstPage) {
      questionPagination.current = 1;
    }
    // 开启加载状态
    isLoading.value = true;
    // 发起数据请求
    httpGet(question.GetQuestion, {
      // 二级分类
      category: category.value,
      // 标签
      labelId: labelId.value,
      // 页码
      pageNum: questionPagination.current,
      // 分页大小
      pageSize: questionPagination.pageSize,
      // 类型  1.听
      type: 1
    })
      .then(res => {
        let { success, data } = res;
        // 如果数据获取成功
        if (success) {
          // 保存数据
          questionList.value = data.records;
          console.log(data);
          // 记录数据库中的数据总数
          questionPagination.total = data.total;
          // 判断是否超出最后一页，如果超出，重新请求
          // 此处注意data.pages!=0是为了避免出现因为没数据不停重复请求的情况
          if (data.current > data.pages && data.pages != 0) {
            questionPagination.current = data.pages;
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

  // 跳转页码时
  const changePagenum = ({ current, pageSize }) => {
    // 根据分页器的 page, size 刷新页面
    questionPagination.current = current;
    questionPagination.pageSize = pageSize;
    getQuestion();
  };

  // 初始化时
  onMounted(() => {
    // 获取题目列表
    getQuestion();
  });

  return {
    questionPagination,
    category,
    labelId,
    getQuestion,
    questionList,
    isLoading,
    changePagenum
  };
}
//#endregion
