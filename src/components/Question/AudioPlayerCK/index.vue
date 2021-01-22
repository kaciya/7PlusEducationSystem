<template>
  <!-- 音频播发器-查看 -->
  <div class="audio-wrapper">
    <!-- 音频 -->
    <audio :ref="dom.audio" :src="audioUrl"></audio>
    <!-- 播放器 -->
    <a-row>
      <a-col :span="5" class="audio-left">
        <!-- 音频按钮 -->
        <div class="audio-btn" @click="playPauseSwitch">
          <PlayCircleFilled :style="audio.audioBtnCss" v-if="audio.isPaused" />
          <PauseCircleFilled :style="audio.audioBtnCss" v-else />
        </div>
        <!-- 播放时间 -->
        <div class="audio-time">
          <span :ref="dom.audioCurTime">00:00</span>
          <span> / </span>
          <span :ref="dom.audioDurTime">00:00</span>
        </div>
      </a-col>
      <a-col :span="13" class="audio-right">
        <!-- 播放进度条 -->
        <div class="progress-bar-bg" :ref="dom.progressBarBg">
          <i :ref="dom.progressDot"></i>
          <div class="progress-bar" :ref="dom.progressBar"></div>
        </div>
      </a-col>
      <a-col :span="6" class="audio-control">
        <a-space :size="10">
          <!-- 播放速度选择 -->
          <a-select
            v-model:value="audio.playbackSpeed"
            size="small"
            class="speed-control"
            @change="speedChange"
          >
            <a-select-option value="2.0"> 2.0 X </a-select-option>
            <a-select-option value="1.5"> 1.5 X </a-select-option>
            <a-select-option value="1.0"> 1.0 X </a-select-option>
          </a-select>
          <!-- 声音选择 -->
          <a-select
            v-model:value="audio.playbackVoice"
            size="small"
            class="voice-control"
          >
            <a-select-option value="OV"> 原声 </a-select-option>
            <a-select-option value="US"> US </a-select-option>
            <a-select-option value="AU"> AU </a-select-option>
          </a-select></a-space
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
// 导入icon图标
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons-vue";
// 导入音频播放控制
import { usePlayControl } from "./usePlayControl";
// 导入音频进度条调节控制
import { useProgressBarControl } from "./useProgressBarControl";
// 导入音频播放速度控制
import { usePlaybackSpeed } from "./usePlaybackSpeed";
export default {
  props: ["audioUrl"],
  setup() {
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
    // 音频播放速度调节 功能
    const { speedChange } = usePlaybackSpeed(dom);

    return {
      // DOM对象
      dom,
      // 音频对象
      audio,
      // 播放/暂停切换 功能
      playPauseSwitch,
      // 还原音频播放 功能
      audioEnded,
      // 播放速度调节 功能
      speedChange
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
  margin: 4px auto;
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
    padding: 2px 8px 0 12px;
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
  margin-left: -14px;

  /* 总进度条  */
  .progress-bar-bg {
    height: 8px;
    border-radius: 8px;
    background-color: #c0ece4;
    position: relative;
    top: 16px;
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

// 音频播放控制
.audio-control {
  padding-left: 20px;

  // 播放速度调节
  .speed-control {
    width: 72px;
    color: #999;
  }

  // 播放声音调节
  .voice-control {
    width: 80px;
    color: #000;
  }
}
</style>
<style lang="scss">
// 播放速度选择器
.speed-control {
  .ant-select-arrow {
    font-size: 10px;
  }
}
</style>
