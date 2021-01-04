//#region 查看RA题型
// 引入响应式API
import {
  ref, reactive, inject
} from "vue";

export function useGetRA() {
  // 题目详情布局
  const layout = reactive({
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 22,
    },
  })
  // 获取[注入]查看详情
  const questionDetail = inject("speak/questionDetail");

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    layout,
    questionDetail,
    audioPlayerRef
  };
}
//#endregion