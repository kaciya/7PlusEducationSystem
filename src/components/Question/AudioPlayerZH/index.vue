<template>
  <!-- 音频播发器-转化音频 -->
  <a-row>
    <a-col :span="22" class="audio-wrapper">
      <!-- 音频 -->
      <audio :ref="dom.audio" :src="audioModel.titleAudio"></audio>
      <!-- 播放器 -->
      <a-row>
        <a-col :span="5" class="audio-left">
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
        <a-col :span="18" class="audio-right">
          <!-- 播放进度条 -->
          <div class="progress-bar-bg" :ref="dom.progressBarBg">
            <i :ref="dom.progressDot"></i>
            <div class="progress-bar" :ref="dom.progressBar"></div>
          </div>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="2" class="audio-control">
      <a-button class="audio-del" @click="delAudio">删除</a-button>
    </a-col>
  </a-row>
</template>

<script>
// 导入icon图标
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons-vue";
// 导入音频播放控制
import { usePlayControl } from "./usePlayControl";
// 导入音频进度条调节控制
import { useProgressBarControl } from "./useProgressBarControl";
// 移除音频播放器
import { useDelAudio } from "./useDelAudio";
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
    // 移除音频播发器
    const { delAudio } = useDelAudio(props.audioModel);

    return {
      // DOM对象
      dom,
      // 音频对象
      audio,
      // 播放/暂停切换 功能
      playPauseSwitch,
      // 还原音频播放 功能
      audioEnded,
      // 移除音频播发器
      delAudio
    };
  },
  components: { PlayCircleFilled, PauseCircleFilled }
};
</script>

<style lang="scss" scoped>
// 定义通用高度
$height: 36px;
/* 音频播放器 */
.audio-wrapper {
  height: $height;
  margin: 4px 0;
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
  padding-left: 14px;

  /* 总进度条  */
  .progress-bar-bg {
    height: 8px;
    border-radius: 8px;
    background-color: #c0ece4;
    position: relative;
    top: 14px;
    cursor: pointer;

    /* 进度点 */
    i {
      width: 12px;
      height: 8px;
      background-color: #999;
      border-radius: 42%;
      // border: 6px solid #fff;
      box-sizing: content-box;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    &:hover {
      i {
        border: 6px solid #fff;
      }
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

/* 移除音频 */
.audio-control {
  .audio-del {
    color: red;
    margin-left: 8px;
  }
}
</style>
