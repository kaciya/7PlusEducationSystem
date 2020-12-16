//#region 获取所有标签
// 引入 响应式API, 钩子函数
import { ref, onMounted } from "vue";
// 引入get请求
import { httpGet } from "@/utils/http.js";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";

export function useGetLabels() {
  // 声明 标签列表数据
  const labelList = ref([]);

  // 获取所有标签
  const getLabels = () => {
    httpGet(questionLabel.GetLabels)
      .then(res => {
        if (res.success == true) {
          labelList.value = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 初始化时
  onMounted(() => {
    // 获取所有标签
    getLabels();
  });

  return {
    getLabels,
    labelList
  };
}
//#endregion
