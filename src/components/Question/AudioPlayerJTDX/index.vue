<template>
  <!-- 音频播发器-精听读写 -->
  <div class="audio-jtdx">
    <!-- 音频播放器区 -->
    <div class="audio-wrapper">
      <!-- 主-音频 -->
      <audio
        class="audio-main"
        :ref="dom.audio"
        :src="audioModel.titleAudio"
      ></audio>
      <!-- 播放器 -->
      <a-row>
        <a-col :span="4" class="audio-left">
          <!-- 音频按钮 -->
          <div class="audio-btn" @click="playPauseSwitch">
            <PlayCircleFilled
              :style="audio.audioBtnCss"
              v-if="audio.isPaused"
            />
            <PauseCircleFilled :style="audio.audioBtnCss" v-else />
          </div>
          <!-- 播放时间 -->
          <div class="audio-time">
            <span :ref="dom.audioCurTime">00:00</span>
            <span> / </span>
            <span :ref="dom.audioDurTime">00:00</span>
          </div>
        </a-col>
        <a-col :span="19" class="audio-right">
          <!-- 播放进度条 -->
          <div class="progress-bar-bg" :ref="dom.progressBarBg">
            <i :ref="dom.progressDot" class="dot-main"></i>
            <div class="progress-bar" :ref="dom.progressBar"></div>
            <!-- 音频片段盒 start -->
            <div class="fragment-box">
              <!-- 音频片段 start -->
              <div
                class="fragment-item"
                :class="ele.id"
                v-for="ele in fData.fAudio"
                :key="ele"
              >
                <!-- 片段-音频 -->
                <audio
                  class="f-audio"
                  :data-index="ele.index"
                  :src="audioModel.titleAudio"
                ></audio>
                <!-- 片段-条 -->
                <div
                  class="f-progress-bar"
                  :style="{
                    backgroundColor: ele.color,
                    left:
                      parseFloat(ele.eLeft) > parseFloat(ele.bLeft)
                        ? ele.bLeft
                        : ele.eLeft,
                    width: ele.fWidth
                  }"
                ></div>
                <!-- 片段-点 -->
                <i
                  class="dot-begin"
                  data-left="bLeft"
                  :style="{ backgroundColor: ele.color, left: ele.bLeft }"
                ></i>
                <i
                  class="dot-end"
                  data-left="eLeft"
                  :style="{ backgroundColor: ele.color, left: ele.eLeft }"
                ></i>
              </div>
              <!-- 音频片段 end -->
            </div>
            <!-- 音频片段盒 end -->
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 片段操作区 start -->
    <div class="fragment-coutrol">
      <!-- 添加片段指针 -->
      <a-button
        type="primary"
        shape="round"
        class="add-fragment-btn"
        @click="addAudioClip"
        >添加片段指针</a-button
      >
      <!-- 片段表格 start -->
      <a-table
        bordered
        size="small"
        :pagination="false"
        :row-key="record => record.id"
        :columns="fColumns"
        :data-source="fData.source"
        class="fragment-table"
      >
        <!-- 文件名 -->
        <template #fileName="{ record }">
          <i class="fN-dot" :style="{ backgroundColor: record.color }"></i>
          <span>{{ record.fileName }}</span>
        </template>
        <!-- 提取时长 -->
        <template #extractTime="{ record }">
          <span>{{ record.extractTimeText }}</span>
        </template>
        <!-- 音频内时间 -->
        <template #audioTime="{ record }">
          <span>{{ record.startTimeText }} / {{ record.endTimeText }}</span>
        </template>
        <!-- 操作 -->
        <template #operation="{ record }">
          <a-button type="primary" size="small" @click="playAudioClip(record)"
            >播放</a-button
          >
          <a-button
            type="danger"
            style="margin-left: 10px"
            size="small"
            @click="delAudioClip(record)"
          >
            删除
          </a-button>
        </template>
      </a-table>
      <!-- 片段表格 end -->
    </div>
    <!-- 片段操作区 end -->
  </div>
</template>

<script>
// 导入icon图标
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons-vue";
// 导入音频播放控制
import { usePlayControl } from "./usePlayControl";
// 导入音频进度条调节控制
import { useProgressBarControl } from "./useProgressBarControl";
// 导入片段columns
import { useColumns } from "./useColumns";
// 导入片段data
import { useGetFData } from "./useGetFData";
// 导入片段音频操作设置
import { useSetFragment } from "./useSetFragment";
// 导入播放音频片段功能
import { usePlayAudioClip } from "./usePlayAudioClip";
// 导入添加音频片段功能
import { useAddAudioClip } from "./useAddAudioClip";
// 导入删除音频片段功能
import { useDelAudioClip } from "./useDelAudioClip";

export default {
  props: ["audioModel"],
  setup(props) {
    // 播放控制 功能
    const {
      dom,
      audio,
      playPauseSwitch,
      updateProgress,
      audioEnded
    } = usePlayControl();
    // 进度条调节 功能
    useProgressBarControl(dom, updateProgress);
    // 片段音频columns
    const { fColumns } = useColumns();
    // 片段音频data
    const { fData } = useGetFData();
    // 片段音频操作
    const { pauseAudioAll, initAudioClip } = useSetFragment(fData);
    // 音频片段播放
    const { playAudioClip } = usePlayAudioClip(pauseAudioAll);
    // 音频片段添加
    const { addAudioClip } = useAddAudioClip(fData, initAudioClip);
    // 音频片段删除
    const { delAudioClip } = useDelAudioClip(fData);

    return {
      // DOM对象
      dom,
      // 音频对象
      audio,
      // 播放/暂停切换 功能
      playPauseSwitch,
      // 还原音频播放 功能
      audioEnded,
      // 片段音频columns
      fColumns,
      // 片段音频data
      fData,
      // 音频片段播放
      playAudioClip,
      // 音频片段添加
      addAudioClip,
      // 音频片段删除
      delAudioClip
    };
  },
  components: { PlayCircleFilled, PauseCircleFilled }
};
</script>

<style lang="scss" scoped>
// 定义通用高度
$height: 40px;
/* 音频播放器 */
.audio-wrapper {
  height: $height;
  margin: 12px 0;
  line-height: $height;
  border-radius: 10px;
  color: #fff;
  background-color: rgba(26, 188, 156, 0.55);
}

.audio-left {
  height: $height;
  /* 播放/暂停 按钮 */
  .audio-btn {
    float: left;
    height: 100%;
    padding: 2px 6px 0 12px;
    // display: initial; /* 解除与app的样式冲突 */
    cursor: pointer;
  }
  /* 播放时间 当前/总时  */
  .audio-time {
    float: left;
    font-size: 14px;
    font-weight: 600;
  }
}

.audio-right {
  float: left;
  height: $height;
  padding-left: 2px;

  /* 总进度条  */
  .progress-bar-bg {
    height: 8px;
    border-radius: 8px;
    background-color: #c0ece4;
    position: relative;
    top: 16px;
    // cursor: pointer;

    /* 进度点 */
    .dot-main {
      width: 12px;
      height: 8px;
      background-color: #999;
      border-radius: 44%;
      border: 6px solid #fff;
      box-sizing: content-box;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 999; /* 最高层级 */
    }

    // &:hover {
    //   .dot-main {
    //     border: 6px solid #fff;
    //   }
    // }

    .fragment-box {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  /* 当前进度条  */
  .progress-bar {
    width: 0;
    height: 8px;
    border-radius: 8px;
    background-color: #64b9aa;
  }
}

/* 添加片段指针 */
.add-fragment-btn {
  border-color: #fff;
  background: linear-gradient(
    90deg,
    rgb(128, 216, 209) 0%,
    rgb(10, 205, 175) 100%
  );
}

/* 片段表格 */
.fragment-table {
  padding: 10px 0;

  .fN-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 2px;
    border-radius: 50%;
  }
}

/* 片段音频盒 */
.fragment-box {
  .fragment-item {
    height: 100%;

    /* 片段条 */
    .f-progress-bar {
      height: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    /* 片段点 */
    .dot-begin,
    .dot-end {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      cursor: pointer;

      &:hover {
        background-color: #ff0000 !important;
      }

      /* 当前选中点 */
      &.dot-hover {
        background-color: #ff0000 !important;
        z-index: 100;
      }
    }
  }
}
</style>
