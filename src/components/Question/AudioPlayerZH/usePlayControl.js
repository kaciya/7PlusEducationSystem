//#region 音频播放控制
// 导入响应api
import { onMounted, reactive, toRefs } from "vue";

export function usePlayControl() {
  // 定义dom对象
  const domState = reactive({
    audio: null,
    progressBarBg: null,
    progressBar: null,
    progressDot: null,
    audioCurTime: null,
    audioDurTime: null
  });
  // 将响应式对象转为普通对象(ref)
  const dom = toRefs(domState);

  // 定义音频对象 存储相关数据
  const audio = reactive({
    // 播放/暂停按钮样式
    audioBtnCss: "color: #fff; font-size: 18px",
    // 播放状态
    isPaused: true
  });

  // mounted周期 执行初始化
  onMounted(() => {
    // 监听音频时长的更改
    dom.audio.value.addEventListener("durationchange", () => {
      // 获取音频总时长
      if (dom.audio.value)
        dom.audioDurTime.value.innerText = transTime(dom.audio.value.duration);
    });
  });

  //#region 播放/暂停[切换]
  const playPauseSwitch = () => {
    // 监听音频播放时间并更新进度条
    dom.audio.value.addEventListener("timeupdate", () => {
      // 调用更新方法
      updateProgress(dom.audio.value);
    });

    // 监听播放完成事件
    dom.audio.value.addEventListener("ended", function() {
      // 调用完成方法
      audioEnded();
    });

    // 判断当前是否为暂停状态
    if (dom.audio.value.paused) {
      // 播放音频
      dom.audio.value.play();
      // 音频为播放状态
      audio.isPaused = false;
    } else {
      // 暂停音频
      dom.audio.value.pause();
      // 音频为暂停状态
      audio.isPaused = true;
    }
  };
  //#endregion

  //#region 更新和完成 方法
  /**
   * 更新进度条与当前播放时间
   * @param {object} audio - audio对象
   */
  function updateProgress(audio) {
    // 计算进度条 比例
    const value = audio.currentTime / audio.duration;
    // 当前已播放的进度条的百分比
    dom.progressBar.value.style.width = value * 100 + "%";
    // 当前进度点的位置百分比
    dom.progressDot.value.style.left = value * 100 + "%";
    // 当前时长
    dom.audioCurTime.value.innerText = transTime(audio.currentTime);
  }

  // 播放完成时还原进度条等数据
  function audioEnded(isClose) {
    // 如果关闭模态框
    if (isClose) {
      // 播放速度还原
      dom.audio.value.playbackRate = 1;
      // 播放速度还原1.0
      audio.playbackSpeed = "1.0";
      // 播放声音还原原声
      audio.playbackVoice = "OV";
    }
    // 还原进度条、进度点和当前播放时长
    dom.audio.value.pause(); //暂停
    dom.audio.value.currentTime = 0; //播放时长归0
    dom.progressBar.value.style.width = 0; //进度条还原
    dom.progressDot.value.style.left = 0; //进度点还原
    dom.audioCurTime.value.innerText = transTime(0); //时长text归0
    // 播放按钮 还原暂停状态
    audio.isPaused = true;
  }
  //#endregion

  //#region 播放时间 格式化方法
  /**
   * 音频播放时间换算
   * @param {number} value - 音频当前播放时间，单位秒
   */
  function transTime(value) {
    var time = "";
    var h = parseInt(value / 3600);
    value %= 3600;
    var m = parseInt(value / 60);
    var s = parseInt(value % 60);
    if (h > 0) {
      time = formatTime(h + ":" + m + ":" + s);
    } else {
      time = formatTime(m + ":" + s);
    }
    return time;
  }

  /**
   * 格式化时间显示，补零对齐
   * eg：2:4  -->  02:04
   * @param {string} value - 形如 h:m:s 的字符串
   */
  function formatTime(value) {
    var time = "";
    var s = value.split(":");
    var i = 0;
    for (; i < s.length - 1; i++) {
      time += s[i].length == 1 ? "0" + s[i] : s[i];
      time += ":";
    }
    time += s[i].length == 1 ? "0" + s[i] : s[i];
    return time;
  }
  //#endregion

  return {
    // DOM对象
    dom,
    // 音频对象
    audio,
    // 播放/暂停切换 功能
    playPauseSwitch,
    // 更新同步进度条
    updateProgress,
    // 还原音频播放
    audioEnded
  };
}
//#endregion
