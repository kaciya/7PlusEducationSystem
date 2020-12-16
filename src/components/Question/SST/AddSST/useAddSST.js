//#region 添加SST题型
// 引入响应式API
import { reactive, ref } from "vue";

export function useAddSST(closeAddSST) {
  // 表单数据 校验规则
  let addSST = reactive({
    model: {},
    rules: {}
  });

  // 表单ref
  let addSSTRef = ref(null);

  // 添加SST题型
  let confirmAddSST = () => {
    // 关闭sst模态框
    closeAddSST();
  };

  return {
    addSST,
    addSSTRef,
    confirmAddSST
  };
}
//#endregion
