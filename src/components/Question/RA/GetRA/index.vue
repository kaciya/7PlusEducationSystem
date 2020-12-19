<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal title="查看" :visible="getRAVisible" @cancel="closeGetRA">
    <template #footer>
      <a-button style="display: none">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
// 导入关闭模态框
import { useCloseGetRA } from "./useCloseGetRA";
// 导入获取模态框
import { useGetRA } from "./useGetRA";
export default {
  setup() {
    console.log("getRAMODAL");
    // 关闭模态框
    const { getRAVisible, closeGetRA } = useCloseGetRA();

    return {
      // 模态框状态
      getRAVisible,
      // 关闭模态框
      closeGetRA
    };
  }
};
</script>

<style></style>
