<template>
  <!-- 编辑FIBW题目模态框 -->
  <a-modal
    class="modify-modal"
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.fibw"
    @ok="confirmEditFIBW"
    @cancel="cancelEditFIBW"
  >
    <p>我是编辑模态框FIBW</p>
  </a-modal>
</template>

<script>
// 引入 编辑FIBW题目 功能
import { useEditFIBW } from "./useEditFIBW";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑FIBW题目
    const { confirmEditFIBW, cancelEditFIBW } = useEditFIBW(editModalVisible);
    return {
      // 编辑FIBW题目
      confirmEditFIBW,
      // 取消编辑FIBW题目
      cancelEditFIBW,
    };
  },
};
</script>

<style lang="scss">
.add-modal,
.modify-modal,
.check-modal {
  width: 880px !important;
}
</style>
