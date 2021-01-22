<template>
  <!-- 编辑RL题目模态框 -->
  <a-modal
    class="modify-modal"
    v-model:visible="editModalVisible.rl"
    title="编辑"
    @ok="confirmEditRL"
    @cancel="cancelEditRL"
    :maskClosable="false"
  >
    <!-- 编辑RL题目表单 start -->
    <a-form
      :model="editRL.model"
      :rules="editRL.rules"
      ref="editRLRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editRL.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editRL.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="editRL.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <!-- 题目标签复选框 end -->
      </a-form-item>
      <a-form-item label="题目图片" :key="Math.random()">
        <!-- 上传图片 -->
        <ImageUpload />
        <div class="pics" v-if="!fileUrl">
          <img
            :src="item"
            v-for="item in editRL.model.pics"
            :key="item"
            style="width: 200px"
          />
        </div>
        <span class="pic-desc">图片上传5M以内</span>
      </a-form-item>
      <a-form-item label="题目音频" name="titleAudio">
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
        <a-textarea v-model:value="editRL.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="editRL.model"
          v-if="editRL.model.titleAudio"
        />
      </a-form-item>
      <a-form-item label="答案参考" name="answer">
        <a-textarea v-model:value="editRL.model.answer" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editRL.model.remark" :rows="2" />
      </a-form-item>
      <a-divider />
      <a-row>
        <a-col>
          <a-checkbox v-model:checked="editRL.model.isJtdx"></a-checkbox>
          精听读写
        </a-col>
      </a-row>
      <!-- 精听读写 -->
      <a-row>
        <a-col :span="24" v-show="editRL.model.isJtdx"
          ><AudioPlayerJTDX
            :audioModel="editRL.model"
            v-if="editRL.model.titleAudio"
        /></a-col>
      </a-row>
    </a-form>
    <!-- 编辑RL题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 编辑RL题目 功能
import { useEditRL } from "./useEditRL";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "@/components/Question/SST/AddSST/useAudioSynthetic";
// 引入 图片上传
import ImageUpload from "@/components/ImageUpload";
// 引入 音频播放器-转化
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 音频播放器-精听读写
import AudioPlayerJTDX from "@/components/Question/AudioPlayerJTDX";

export default {
  // 接收父组件传来的数据
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 获取要编辑的题目详情
    const questionDetail = inject("speak/questionDetail");

    // 标签列表
    const { labelList } = useGetLabels();

    // 上传音频列表
    const { uploadAudioList } = useUploadAudioList();

    // 编辑RL题目
    const {
      fileUrl,
      editRL,
      editRLRef,
      changeLabels,
      confirmEditRL,
      cancelEditRL
    } = useEditRL(
      editModalVisible,
      getQuestion,
      questionDetail,
      uploadAudioList
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      editRL,
      uploadAudioList
    );

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      editRL,
      uploadAudioList
    );

    // 返回
    return {
      // 标签列表
      labelList,
      // 上传音频功能
      uploadAudio,
      // 上传音频列表
      uploadAudioList,
      // 改变上传音频
      changeUploadAudio,
      // 音频合成状态
      synthesizing,
      // 音频合成功能
      audioSynthetic,
      // 图片url
      fileUrl,
      // 编辑题目的表单数据和校验规则
      editRL,
      // 编辑题目表单
      editRLRef,
      // 改变选择标签时
      changeLabels,
      // 编辑RL题目
      confirmEditRL,
      // 取消编辑RL题目
      cancelEditRL
    };
  },
  components: {
    ImageUpload,
    AudioPlayerZH,
    AudioPlayerJTDX
  }
};
</script>

<style lang="scss">
.add-modal .pic-desc {
  color: #aaa;
}
</style>
