<template>
  <!-- 添加SST题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.sst"
    title="添加"
    @ok="confirmAddSST"
    @cancel="cancelAddSST"
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
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addSST.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title">
        <a-input v-model:value="addSST.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addSST.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <!-- 题目标签复选框 end -->
      </a-form-item>
      <a-form-item label="题目音频">
        <!-- 上传音频 start -->
        <a-upload
          :action="uploadAudio.url"
          :headers="uploadAudio.headers"
          :file-list="uploadAudioList"
          @change="changeUploadAudio"
        >
          <a-button type="primary">上传音频</a-button>
        </a-upload>
        <!-- 上传音频 end -->
      </a-form-item>
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="addSST.model.titleText" :rows="4" />
        <a-button type="primary">转换为音频</a-button>
      </a-form-item>
      <a-form-item label="答案参考" name="answer">
        <a-textarea v-model:value="addSST.model.answer" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addSST.model.remark" :rows="2" />
      </a-form-item>
      <a-divider />
      <a-row>
        <a-col> <CheckCircleTwoTone /> 静听读写 </a-col>
      </a-row>
    </a-form>
    <!-- 添加sst题目表单 end -->
  </a-modal>
</template>

<script>
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
// 引入 添加SST题目 功能
import { addSST, useAddSST } from "./useAddSST";
// 引入 上传音频 功能
import { useUploadAudio } from "./useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";

export default {
  // 发送事件
  emits: ["getQuestion"],
  props: ["addModalVisible"],
  setup(props, { emit }) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;

    // 标签列表
    const { labelList } = useGetLabels();

    // 添加SST题目
    const {
      addSST,
      addSSTRef,
      changeLabels,
      confirmAddSST,
      cancelAddSST
    } = useAddSST(addModalVisible, emit);

    // 上传音频功能
    const { uploadAudio, uploadAudioList, changeUploadAudio } = useUploadAudio(
      addSST
    );

    // 返回
    return {
      // 标签列表
      labelList,
      uploadAudio,
      // 上传音频列表
      uploadAudioList,
      // 改变上传音频
      changeUploadAudio,
      // 添加题目的表单数据和校验规则
      addSST,
      // 添加题目表单
      addSSTRef,
      // 改变选择标签时
      changeLabels,
      // 添加sst题目
      confirmAddSST,
      // 取消添加sst题目
      cancelAddSST
    };
  },
  components: {
    CheckCircleTwoTone
  }
};
</script>

<style scoped lang="scss">
#labelIds {
  // 让本模态框中的标签复选框换行时保持对齐
  .ant-checkbox-wrapper:nth-child(6n) {
    margin-left: 0px;
  }
}
</style>
