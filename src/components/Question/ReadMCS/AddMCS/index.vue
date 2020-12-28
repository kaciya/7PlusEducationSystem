<template>
  <!-- 添加MCS题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.mcs"
    @ok="confirmAddMCS"
    @cancel="cancelAddMCS"
  >
    <p>我是添加模态框MCS</p>
  </a-modal>
</template>

<script>
// 引入 添加MCS题目 功能
import { useAddMCS } from "./useAddMCS";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加MCM题目
    const { confirmAddMCS, cancelAddMCS } = useAddMCS(addModalVisible);
    return {
      // 添加MCS题目
      confirmAddMCS,
      // 取消添加MCS题目
      cancelAddMCS,
    };
  },
};
</script>

<style scoped lang="scss"></style>
