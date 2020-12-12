//导入 reactive 对象
import {
    reactive
} from "vue";

//#region 创建变量  获取表格项
export const useSysLogColums = () => {
      //创建变量 渲染表格项
  const logTable = reactive({
    logColums: [{
        title: "索引",
        align: "center",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "日志时间",
        align: "center",
        dataIndex: "createTime",
        //默认降序排列
        defaultSortOrder: 'descend',
        //日期排序
        sorter: (a, b) => {
          let aTime = new Date(a.createTime);
          let bTime = new Date(b.createTime);
          return aTime - bTime;
        }
      },
      {
        title: "账号",
        align: "center",
        dataIndex: "username"
      },
      {
        title: "操作员名称",
        align: "center",
        dataIndex: "realName"
      },
      {
        title: "操作模块",
        align: "center",
        dataIndex: "title"
      },
      {
        title: "内容",
        align: "center",
        dataIndex: "params"
      }
    ],

    //获取列表数据
    logData: []
  });

  //返回数据
  return{
    logTable
  }
}
//#endregion