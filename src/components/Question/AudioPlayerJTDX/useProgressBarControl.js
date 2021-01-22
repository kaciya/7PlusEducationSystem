//#region 音频进度条调节控制
// 导入响应api
import { onMounted } from "vue";
export function useProgressBarControl(dom, updateProgress) {
  // mounted周期 添加进度条调节事件
  onMounted(() => {
    // audio-DOM
    const audio = dom.audio.value;
    // 总进度条-DOM
    // const progressBarBg = dom.progressBarBg.value;
    // 点击按下进度条跳到指定点播放
    // progressBarBg.addEventListener("mousedown", (e) => {
    //     // 获取进度条的总宽度[number]
    //     const pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace("px", ""));
    //     // 比例 = 点击处的偏移距离 / 总宽度 = 当前播放时长 / 总时长
    //     const rate = e.offsetX / pgsWidth;
    //     // 当前播放时长 = 总时长 * 比例
    //     audio.currentTime = audio.duration * rate;
    //     // 同步进度条
    //     updateProgress(audio);
    // })

    // 拖动进度点调节进度条[启动]
    dragProgressDotEvent(audio);
  });

  //#region 鼠标拖动进度点时可以调节进度条
  /**
   *
   * @param {object} audio - audio对象
   */
  function dragProgressDotEvent(audio) {
    // 进度点-DOM
    const dot = dom.progressDot.value;
    // 总进度条-DOM
    const progressBarBg = dom.progressBarBg.value;
    // 拖动相关数据
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

    // 标记是否拖动开始
    let flag = false;

    //#region 拖动事件绑定
    // 鼠标按下-准备拖动
    dot.addEventListener("mousedown", down);
    // 鼠标移动-正在拖动
    document.addEventListener("mousemove", move);
    // 鼠标抬起-拖动结束
    document.addEventListener("mouseup", end);
    //#endregion

    //#region 准备拖动
    function down(e) {
      flag = true;
      // progressBarBg.children[0].style.border = "6px solid #fff";

      console.log("偏移:" + dot.offsetLeft, "x坐标:" + e.clientX);

      // 获取移动开始时进度点距离进度条的偏移值
      position.oriOffestLeft = dot.offsetLeft;
      // 获取移动开始时的x坐标
      position.oriX = e.clientX;
      // 向左最大可拖动距离
      position.maxLeft = position.oriOffestLeft;
      // 向右最大可拖动距离
      position.maxRight = progressBarBg.offsetWidth - position.oriOffestLeft;

      // 禁止默认事件和事件冒泡（避免鼠标拖拽进度点时选中文字）
      e.preventDefault();
      e.stopPropagation();
    }
    //#endregion

    //#region 拖动中..
    function move(e) {
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
          window.getComputedStyle(progressBarBg, null).width.replace("px", "")
        );
        // 比例 = (鼠标按下时的偏移值 + 拖动后的偏移差值) / 总宽度 = 当前播放时长 / 总时长
        const rate = (position.oriOffestLeft + length) / pgsWidth;
        // 当前播放时长 = 总时长 * 比例
        audio.currentTime = audio.duration * rate;
        // 同步进度条
        updateProgress(audio);
      }
    }
    //#endregion

    //#region 拖动结束
    function end() {
      flag = false;
      // progressBarBg.children[0].style.border = "";
    }
    //#endregion
  }
  //#endregion
}
//#endregion
