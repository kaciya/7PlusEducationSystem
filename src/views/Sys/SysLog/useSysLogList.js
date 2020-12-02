//导入 reactive 对象
import { reactive, ref } from "vue";

//导入 API接口
import { log } from "@/api/sysAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 操作日志 数据列表
export const showLogList = () => {
  //创建 变量  接受 返回的 指定日期
  let dates = reactive([]);

  //创建变量  接受 返回的 账号名称
  let username = ref("");

  //创建变量 渲染表格项
  const logColums = [
    {
      title: "#",
      key: "index",
      slots: {
        customRender: "index"
      }
    },
    {
      title: "日志时间",
      dataIndex: "createTime"
    },
    {
      title: "账号",
      dataIndex: "username"
    },
    {
      title: "操作员名称",
      dataIndex: "realName"
    },
    {
      title: "操作模块",
      dataIndex: "title"
    },
    {
      title: "内容",
      dataIndex: "params"
    }
  ];

  //#region 发起请求  获取数据列表
  //创建变量  储存请求获取的数据列表
  let logData = reactive({});

  //创建变量params 将请求需要的参数传递给后台
  let params = reactive({
    pageNum: 1,
    pageSize: 10
  });

  httpGet(log.sysLogList, params)
    .then(res => {
      if (res.success == true) {
        logData.data = res.data.records;
      }
    })
    .catch(error => {
      console.log(error);
    });
  //#endregion

  //返回
  return {
    dates,
    username,
    logColums,
    logData
  };
};
//#endregion
