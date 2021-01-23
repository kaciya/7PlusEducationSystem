//导入 reactive 对象
import { reactive } from "vue";

//#region 列表参数
export const useContactColums = () => {
  //创建表格项
  const contactTable = reactive({
    colums: [
      {
        title: "序号",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        ellipsis: true,
        slots: { customRender: "email" }
      },
      {
        title: "电话",
        dataIndex: "mobile",
        ellipsis: true,
        slots: { customRender: "mobile" }
      },
      {
        title: "QQ",
        dataIndex: "qq",
        ellipsis: true,
        slots: { customRender: "qq" }
      },
      {
        title: "内容",
        dataIndex: "content",
        ellipsis: true,
        slots: { customRender: "content" }
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
        key: "state",
        slots: {
          customRender: "state"
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
    contactTable
  };
};
//#endregion
