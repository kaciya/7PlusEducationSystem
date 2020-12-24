<template>
  <a-modal
    v-model:visible="getModalVisible.wfd"
    title="查看"
    :maskClosable="false"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <a-form-item label="编号">{{ getWFD.no }}</a-form-item>
      <a-form-item label="题目">{{ getWFD.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getWFD.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getWFD.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->

      <!-- 题目音频 start -->
      <a-form-item label="题目音频">
        <div v-if="getWFD.titleAudio">
          <audio :src="getWFD.titleAudio" controls="controls"></audio>
          <a-tag color="success">已使用该音频</a-tag>
        </div>
        <a-tag v-else>无音频</a-tag>
      </a-form-item>
      <!-- 题目音频 end -->

      <!-- 题目原文 start -->
      <a-form-item label="题目原文">
        <p style="font-size: 16px; line-height: 24px; padding-top: 6px">
          you have enough happiness to make you sweet,enough trials to make you
          strong,enough sorrow to keep you human,enough hope to make you happy?
          Always put yourself in others’shoes.If you feel that it hurts you,it
          probably hurts the other person, too.
        </p>
      </a-form-item>
      <!-- 题目原文 end -->
      <a-form-item label="备注">{{ getWFD.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入查看题目详情功能
import { useGetWFD } from "./useGetWFD";

export default {
  props: ["getModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { getModalVisible } = props;

    // 题目详情
    const questionDetail = inject("questionDetail");

    // 查看题目详情功能
    const { getWFD } = useGetWFD(questionDetail, getModalVisible);

    return {
      getWFD,
    };
  },
};
</script>

<style>
</style>