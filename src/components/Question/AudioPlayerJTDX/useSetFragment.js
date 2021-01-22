//#region 设置(操作)片段音频
import { onMounted } from "vue";

/**
 * 音频片段的操作(设置)
 * @author Gsgzs
 */
export function useSetFragment(fData) {
  // mounted时期
  onMounted(() => {
    // 初始化2个片段
    for (let i = 0; i < fData.source.length; i++) {
      // 初始化音频片段
      initAudioClip(i);
    }
  });

  //#region 拖动片段点-功能
  function dragFragmentDotEvent(audio, dot) {
    // 总进度条
    const progressBar = audio.parentNode.parentNode;
    // 定义拖动相关数据
    const position = {
      // 移动开始时进度点距离进度条的偏移值
      oriOffestLeft: 0,
      // 移动开始时的x坐标
      oriX: 0,
      // 向左最大可拖动距离
      maxLeft: 0,
      // 向右最大可拖动距离
      maxRight: 0
    };

    // 标记片段点拖动开始
    let flag = false;

    //#region 拖动事件绑定
    // 鼠标按下-准备拖动
    dot.addEventListener("mousedown", fDown);
    // 鼠标移动-正在拖动
    document.addEventListener("mousemove", fMove);
    // 鼠标抬起-拖动结束
    document.addEventListener("mouseup", fEnd);
    //#endregion

    //#region 准备拖动
    function fDown(e) {
      flag = true;
      dot.classList.add("dot-hover");
      // 暂停所有音频
      pauseAudioAll();

      // 获取移动开始时进度点距离进度条的偏移值
      position.oriOffestLeft = dot.offsetLeft;
      // 获取移动开始时的x坐标
      position.oriX = e.clientX;
      // 向左最大可拖动距离
      position.maxLeft = position.oriOffestLeft;
      // 向右最大可拖动距离
      position.maxRight = progressBar.offsetWidth - position.oriOffestLeft;

      // 禁止默认事件和事件冒泡（避免鼠标拖拽进度点时选中文字）
      e.preventDefault();
      e.stopPropagation();
    }
    //#endregion

    //#region 拖动中..
    function fMove(e) {
      if (flag) {
        // 获取进度点偏移值
        const clientX = e.clientX;
        // 计算进度点拖动时的偏移与准备拖动时的偏移差值 [屏幕偏移]
        let length = clientX - position.oriX;
        // 如果差值大于向右最大拖动距离
        if (length > position.maxRight) {
          // 赋值向右最大偏移值
          length = position.maxRight;
        }
        // 如果差值小于向左最大拖动距离
        else if (length < -position.maxLeft) {
          // 赋值向左最大偏移值
          length = -position.maxLeft;
        }
        // 获取进度条的总宽度[number]
        const pgsWidth = parseFloat(
          window.getComputedStyle(progressBar, null).width.replace("px", "")
        );
        // 比例 = (鼠标按下时的偏移值 + 拖动后的偏移差值) / 总宽度 = 当前播放时长 / 总时长
        const rate = (position.oriOffestLeft + length) / pgsWidth;
        // 当前播放时长 = 总时长 * 比例
        audio.currentTime = audio.duration * rate;
        // 同步音频片段数据
        updateFData(audio, dot);
      }
    }
    //#endregion

    //#region 拖动结束
    function fEnd() {
      flag = false;
      dot.classList.remove("dot-hover");
    }
    //#endregion
  }
  //#endregion

  //#region 拖动片段-同步数据
  function updateFData(audio, dot) {
    // 计算偏移值 比例
    const value = audio.currentTime / audio.duration;

    // 音频片段索引index
    const aIndex = audio.dataset["index"];
    // 音频列表对象
    const fSObj = fData.source[aIndex];
    // 音频片段对象
    const fAObj = fData.fAudio[aIndex];
    // 比例百分数（number）
    const dotLeft = value * 100;
    // 获取偏移值（number）
    const bLeft = parseFloat(fAObj.bLeft);
    const eLeft = parseFloat(fAObj.eLeft);

    // 同步片段点偏移（left）
    fAObj[dot.dataset["left"]] = dotLeft + "%";
    // 同步片段width
    fAObj.fWidth = Math.abs(bLeft - eLeft) + "%";

    //#region 同步音频列表-时长数据
    // 判断修改起始或终止时间（修改起始：正时且拖动dotBegin || 反时且拖动dotEnd）
    if (
      (bLeft <= eLeft && dot.dataset["left"] === "bLeft") ||
      (bLeft >= eLeft && dot.dataset["left"] === "eLeft")
    ) {
      // 赋值起始时间（左）
      fSObj.startTime = audio.currentTime;
    } else {
      // 赋值终止时间（右）
      fSObj.endTime = audio.currentTime;
    }
    // 音频片段-提取时长
    fSObj.extractTime = fSObj.endTime - fSObj.startTime;
    // 音频片段-时长数据文本
    fSObj.extractTimeText = transTime(fSObj.extractTime);
    fSObj.startTimeText = transTime(fSObj.startTime);
    fSObj.endTimeText = transTime(fSObj.endTime);
    console.log(fSObj);
    //#endregion
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
    var ms = value.toFixed(2).replace(/\d+\.(\d*)/, "$1"); //获取小数点后2位 [毫秒]
    if (h > 0) {
      time = formatTime(h + ":" + m + ":" + s + ":" + ms);
    } else {
      time = formatTime(m + ":" + s + ":" + ms);
    }
    return time;
  }

  /**
   * 格式化时间显示，补零对齐
   * eg：2:4  -->  02:04
   * @param {string} value - 形如 h:m:s:ms 的字符串
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

  //#region 暂停所有音频 功能
  function pauseAudioAll() {
    // 获取所有音频dom
    const audios = document.querySelectorAll("audio");
    // 暂停所有音频
    for (let i = 0; i < audios.length; i++) {
      audios[i].pause();
    }
  }
  //#endregion

  //#region 初始化音频片段
  /**
   * 初始化音频片段功能
   * @param {*} index 初始化的片段索引
   */
  function initAudioClip(index) {
    // 音频对象
    const audio = document.querySelector(".audio-main");
    // console.log(fData);
    // 音频列表对象
    const fSObj = fData.source[index];
    // 音频片段对象
    const fAObj = fData.fAudio[index];
    // 获取片段比例
    const bLeft = parseFloat(fAObj.bLeft);
    const eLeft = parseFloat(fAObj.eLeft);

    // 判断音频就绪状态 0-4（0无就绪信息 4可用数据足以开始播放）
    if (audio.readyState === 4) {
      // 初始化片段列表
      initSourceData();
    }

    //#region 初始化拖动功能
    const fItem = `.fragment-item.${fData.source[index].id}`;
    const audioDom = document.querySelector(`${fItem} .f-audio`);
    const bDotDom = document.querySelector(`${fItem} .dot-begin`);
    const eDotDom = document.querySelector(`${fItem} .dot-end`);

    // 添加-拖动功能
    dragFragmentDotEvent(audioDom, bDotDom);
    dragFragmentDotEvent(audioDom, eDotDom);
    //#endregion

    //#region 监听音频时长的更改
    audio.addEventListener("durationchange", () => {
      // 初始化片段列表
      initSourceData();
    });
    //#endregion

    //#region 初始化片段列表功能
    function initSourceData() {
      // 初始化音频列表数据
      // *-时长数据
      fSObj.startTime = (bLeft * audio.duration) / 100;
      fSObj.endTime = (eLeft * audio.duration) / 100;
      // *-提取时长
      fSObj.extractTime = fSObj.endTime - fSObj.startTime;
      // *-时长数据文本
      fSObj.extractTimeText = transTime(fSObj.extractTime);
      fSObj.startTimeText = transTime(fSObj.startTime);
      fSObj.endTimeText = transTime(fSObj.endTime);
    }
    //#endregion
  }
  //#endregion

  return {
    // 拖动片段功能
    dragFragmentDotEvent,
    // 停止所有音频
    pauseAudioAll,
    // 初始化音频片段
    initAudioClip
  };
}
//#endregion
