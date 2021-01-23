//#region 获取片段数据
// 导入响应api
import { ref, reactive } from "vue";

export function useGetFData() {
  // 定义片段对象(含片段名和片段色)（上限5）
  const fragments = {
    f1: {
      name: "片段一",
      color: "#FF7F00" //橙
    },
    f2: {
      name: "片段二",
      color: "#FFFF00" //黄
    },
    f3: {
      name: "片段三",
      color: "#00FF00 " //绿
    }, //青
    f4: {
      name: "片段四",
      color: "#0000FF" //蓝
    },
    f5: {
      name: "片段五",
      color: "#8B00FF" //紫
    }
  };
  // 定义片段数据
  const fData = reactive({
    // 片段名+色
    fragments: fragments,
    // 片段列表数据
    source: [
      {
        index: 0,
        id: "f1",
        color: fragments["f1"].color,
        fileName: fragments["f1"].name,
        extractTime: 0, //提取时长
        startTime: 0,
        endTime: 0,
        extractTimeText: "00:00:00", //提取时长-文本
        startTimeText: "00:00:00",
        endTimeText: "00:00:00"
      },
      {
        index: 1,
        id: "f2",
        color: fragments["f2"].color,
        fileName: fragments["f2"].name,
        extractTime: 0, //提取时长
        startTime: 0,
        endTime: 0,
        extractTimeText: "00:00:00", //提取时长-文本
        startTimeText: "00:00:00",
        endTimeText: "00:00:00"
      }
    ],
    // 片段音频数据
    fAudio: [
      {
        index: 0,
        id: "f1",
        color: fragments["f1"].color,
        bLeft: "10%",
        eLeft: "15%",
        fWidth: "5%"
      },
      {
        index: 1,
        id: "f2",
        color: fragments["f2"].color,
        bLeft: "20%",
        eLeft: "25%",
        fWidth: "5%"
      }
    ]
  });

  return {
    fragments,
    fData
  };
}

//#endregion
