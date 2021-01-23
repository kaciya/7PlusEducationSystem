//#region 题目列表 列配置
import { reactive } from "vue";

export function useQuestionColumns() {
  // 题目列配置
  const questionColumns = reactive([
    {
      title: "编号",
      dataIndex: "no"
    },
    {
      title: "题目",
      dataIndex: "title"
    },
    {
      title: "题目音频",
      dataIndex: "titleAudio",
      ellipsis: true,
      slots: { customRender: "titleAudio" }
    },
    {
      title: "标签",
      key: "labels",
      slots: { customRender: "labels" },
      width: "250px"
    },
    {
      title: "最近更新时间",
      dataIndex: "updateTime"
    },
    {
      title: "备注",
      dataIndex: "remark"
    },
    {
      title: "累计练习",
      dataIndex: "totalNum"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" },
      width: "300px"
    }
  ]);
  // 题目列配置 题目音频->图片
  const questionColumns2 = reactive([
    {
      title: "编号",
      dataIndex: "no"
    },
    {
      title: "题目",
      dataIndex: "title"
    },
    {
      title: "图片",
      key: "pics",
      width: 200,
      slots: { customRender: "pics" }
    },
    {
      title: "标签",
      key: "labels",
      slots: { customRender: "labels" },
      width: "250px"
    },
    {
      title: "最近更新时间",
      dataIndex: "updateTime"
    },
    {
      title: "备注",
      dataIndex: "remark"
    },
    {
      title: "累计练习",
      dataIndex: "totalNum"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    questionColumns,
    questionColumns2
  };
}
//#endregion
