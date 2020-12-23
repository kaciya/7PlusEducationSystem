<template>
  <a-modal
    v-model:visible="getModalVisible.fib"
    title="查看"
    :maskClosable="false"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <a-form-item label="编号">{{ getFIB.no }}</a-form-item>
      <a-form-item label="题目">{{ getFIB.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getFIB.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getFIB.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->

      <!-- 题目音频 start -->
      <a-form-item label="题目音频">
        <div v-if="getFIB.titleAudio">
          <audio :src="getFIB.titleAudio" controls="controls"></audio>
          <a-tag color="success">已使用该音频</a-tag>
        </div>
        <a-tag v-else>无音频</a-tag>
      </a-form-item>
      <!-- 题目音频 end -->

      <!-- 题目原文 start -->
      <a-form-item label="题目原文">
        <p style="font-size: 16px; line-height: 24px; padding-top: 6px">
          <span v-for="(item, index) in getFIB.titleText" :key="index">
            <span v-text="item.text.trim()" style="margin-right: 8px"></span>
            <a-tag
              v-if="
                item.answer.trim().length != 0 ||
                index != getFIB.titleText.length - 1
              "
              >{{ item.answer }}</a-tag
            >
          </span>
        </p>
      </a-form-item>
      <!-- 题目原文 end -->
      <a-form-item label="备注">{{ getFIB.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入查看题目详情功能
import { useGetFIB } from "./useGetFIB";

export default {
  props: ["getModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { getModalVisible } = props;

    // 题目详情
    const questionDetail = inject("questionDetail");

    // 查看题目详情功能
    const { getFIB } = useGetFIB(questionDetail, getModalVisible);

    return {
      getFIB,
    };
  },
};
</script>

<style>
</style>