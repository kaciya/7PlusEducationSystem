//导入 reactive 对象
import {
  reactive
} from "vue";

//#region 创建变量  获取表格项
export const useFeedbackColums = () => {
  //创建列表所需数据
  const feedbackTable = reactive({
    colums: [{
        title: "序号",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "内容",
        dataIndex: "content",
        ellipsis: true,
        slots: {
          customRender: "content"
        }
      },
      {
        title: "联系方式",
        dataIndex: "mobile"
      },
      {
        title: "图片",
        width: 400,
        key: "pics",
        slots: {
          customRender: "pics"
        }
      },
      {
        title: "提交时间",
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
        dataIndex: "updateTime"
      },
      {
        title: "状态",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      {
        title: "操作",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //列表数据
    data: []
  });

  //返回数据
  return {
    feedbackTable
  };
};
//#endregion