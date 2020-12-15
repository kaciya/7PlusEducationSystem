<template>
  <!-- 添加SST题目模态框 -->
  <!-- 注意：这里的visible不要使用v-model，
      因为我们的ant-design在有v-model时，会尝试直接给visible赋值flase实现关闭模态框，
      但是这里的visible是我们使用computed监听共享库的数据，
      computed没有写setter，也不提倡写setter直接给共享库中的数据直接赋值，
      所以ant-design给visiable直接赋值时会失败，警告visible是只读的 -->
  <a-modal
    :visible="addSSTVisible"
    title="添加"
    @ok="confirmAddSST"
    @cancel="closeAddSST"
    :maskClosable="false"
  >
    <!-- 添加sst题目表单 start -->
    <a-form
      :model="addSST.model"
      :rules="addSST.rules"
      ref="addSSTRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号">
        <a-input />
      </a-form-item>
      <a-form-item label="题目">
        <a-input />
      </a-form-item>
    </a-form>
    <!-- 添加sst题目表单 end -->
  </a-modal>
</template>

<script>
// 引入 关闭添加SST题目模态框 功能
import { useCloseAddSST } from "./useCloseAddSST";
// 引入 添加SST题目 功能
import { addSST, useAddSST } from "./useAddSST";

export default {
  setup() {
    // 关闭模态框
    let { closeAddSST, addSSTVisible } = useCloseAddSST();

    // 添加SST题目
    let { addSST, addSSTRef, confirmAddSST } = useAddSST(closeAddSST);

    // 返回
    return {
      // 关闭模态框
      closeAddSST,
      // 模态框的显示与隐藏
      addSSTVisible,
      // 添加题目的表单数据和校验规则
      addSST,
      // 添加题目表单
      addSSTRef,
      // 添加sst题目
      confirmAddSST,
    };
  },
};
</script>

<style>
</style>