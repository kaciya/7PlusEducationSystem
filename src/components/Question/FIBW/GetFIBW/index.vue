<template>
  <!-- 查看FIBW题目模态框 -->
  <a-modal
    class="check-modal"
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.fibw"
    @ok="confirmGetFIBW"
    @cancel="cancelGetFIBW"
  >
    <p>我是查看模态框FIBW</p>
  </a-modal>
</template>

<script>
// 引入 查看FIBW题目 功能
import { useGetFIBW } from "./useGetFIBW";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看FIBW题目
    const { confirmGetFIBW, cancelGetFIBW } = useGetFIBW(getModalVisible);
    return {
      // 查看FIBW题目
      confirmGetFIBW,
      // 取消查看FIBW题目
      cancelGetFIBW,
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
