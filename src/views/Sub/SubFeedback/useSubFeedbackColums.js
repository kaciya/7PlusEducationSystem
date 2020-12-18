//导入 reactive 对象
import { reactive } from "vue";

//#region 创建变量  获取表格项
export const useSubFeedbackColums = () => {
  //创建列表所需数据
  const feedbackTable = reactive({
    feedbackColums: [
      {
        title: "索引",
        align: "center",
        key: "index",
        slots: {
          customRender: "index"
        },
        align: "center"
      },
      {
        title: "内容",
        align: "center",
        dataIndex: "content"
      },
      {
        title: "联系方式",
        align: "center",
        dataIndex: "mobile"
      },
      {
        title: "图片",
        align: "center",
        key: "picUrls",
        slots: {
          customRender: "picUrls"
        }
      },
      {
        title: "提交时间",
        align: "center",
        dataIndex: "createTime",
        //默认降序排列
        defaultSortOrder: "descend",
        //日期排序
        sorter: (a, b) => {
          let aTime = new Date(a.createTime);
          let bTime = new Date(b.createTime);
          return aTime - bTime;
        }
      },
      {
        title: "处理时间",
        align: "center",
        dataIndex: "updateTime"
      },
      {
        title: "状态",
        align: "center",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      {
        title: "操作",
        align: "center",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //列表数据
    feedbackData: []
  });

  //返回数据
  return {
    feedbackTable
  };
};
//#endregion
