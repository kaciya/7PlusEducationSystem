//#region 获取所有标签

// 引入get请求
import { httpGet } from "@/utils/http.js";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";
export function useGetLabels() {
  // 获取所有标签
  let getLabels = () => {
    console.log(httpGet);
    console.log(questionLabel.GetLabels);
    httpGet(questionLabel.GetLabels).then(res => {
      console.log(res);
    });
  };

  return {
    getLabels
  };
}
//#endregion
