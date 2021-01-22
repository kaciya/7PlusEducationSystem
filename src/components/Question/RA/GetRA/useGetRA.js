//#region 查看RA题型
// 引入响应式API
import { ref, reactive } from "vue";

export function useGetRA() {
  // 题目详情布局
  const layout = reactive({
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 22
    }
  });

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    layout,
    audioPlayerRef
  };
}
//#endregion
