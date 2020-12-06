import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
export const lexiconSort = () => {
  // 表格数据
  const lexiconSortData = reactive({
    // 表格数据
    Data: [],
    // 表格标题
    Columns: [
      {
        title: "词库名称",
        align: "center",
        dataIndex: "name"
      },
      {
        title: "操作",
        align: "center",
        slots: { customRender: "operation" }
      }
    ]
  });

  // 获取后台数据
  const getlexiconSortData = async () => {
    const res = await httpGet(wordType.LexiconSortList);
    // 数据获取成功
    if (res.code == 200) {
      lexiconSortData.Data = res.data;
    }
  };

  // 初始化获取数据
  onMounted(() => {
    getlexiconSortData();
  });
  return {
    getlexiconSortData,
    lexiconSortData
  };
};
