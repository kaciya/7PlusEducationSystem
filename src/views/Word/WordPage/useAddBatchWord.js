import { ref } from "vue";

// 模板下载
import { useDownload } from "./useDownload";

export const useAddBatchWord = () => {
  // 控制模态框显示隐藏
  const addBatchVisible = ref(false);
  // 点击显示模态框
  const addBatchWord = () => {
    addBatchVisible.value = true;
  };
  // 下载模板请求
  const { download } = useDownload();
  // 点击模板下载下载模板
  const addTemplate = () => {
    download("单词", "/word/export/template");
  };

  return { addBatchVisible, addBatchWord, addTemplate };
};
