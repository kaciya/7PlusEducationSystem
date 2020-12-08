//导入 reactive 对象
import {
  reactive,
  ref
} from "vue";

//导入 API接口
import {
  log
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//导入 全局提示信息
import {
  message
} from 'ant-design-vue';


//#region 获取 操作日志 数据列表
export const showLogList = () => {

  //日期选择器发生改变时的 指定日期
  let dateModel = reactive([]);
  //日期选择器确定后的 指定日期
  let dateConfrim = reactive({});

  //创建变量  接受 返回的 账号名称
  let usernameModel = ref("");

  //#region 分页所需数据
  const pageInfo = reactive({
    //列表所在页数
    pageNum: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    //一共多少条数据
    total: 0,
  });
  //#endregion

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
    logData: []
  });


  //#region 发起请求  获取数据列表
  const getLogData = () => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: 1,
      pageSize: 10
    });
    //请求接口: /admin/log/page
    httpGet(log.sysLogList, params)
      .then(res => {
        if (res.success == true) {
          //获取操作日志数据
          logTable.logData = res.data.records;
          //获取多少条数据
          pageInfo.total = res.data.records.length;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //#region 点击下一页方法
  const pageChange = (page,pageSize) => {
    pageInfo.pageNum = page;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //#region 设置每页显示多少条数据
  const pageSizeChange = (current,pageSize) => {
    pageInfo.pageNum = current;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //#region 日期选择器发生变换方法
  const dateChange = (data, dataString) => {
    dateModel = dataString;
    console.log(dateModel);
  }
  //#endregion

  //#region 日期选择确定方法
  const dateChangeOk = (data) => {
    //将获取的日期存入dateModel中
    dateConfrim.startDate = data[0].format('YYYY-MM-DD HH:mm:ss');
    dateConfrim.endDate = data[1].format('YYYY-MM-DD HH:mm:ss');
  }
  //#endregion

  //#region 重置列表项 和 时间范围
  const resetClick = () => {
    //将双向绑定的 日期 和 账号名称 中的值 重置
    usernameModel.value = '';
    dateModel = [];
    dateConfrim = {};
    console.log(dateModel);
    message.success('日期选择 与 状态 已重置');
  }
  //#endregion

  //#region 查询列表
  const searchClick = () => {
    //创建变量  存储接口查询参数
    let params = reactive({});

    //获取日期范围
    //判断获取的日期是否为空
    if (dateModel.length != 0) {
      params.startDate = dateConfrim.startDate;
      params.endDate = dateConfrim.endDate;
    }

    //获取状态
    //判断账号名称是否为空
    if (dateModel.value) {
      params.username = dateModel.value;
    }

    //发起查询请求
    getFeedbackData(params);
  }
  //#endregion


  //返回
  return {
    usernameModel,
    logTable,
    pageInfo,
    dateModel,
    getLogData,
    pageChange,
    pageSizeChange,
    dateChange,
    dateChangeOk,
    resetClick,
    searchClick
  };
};
//#endregion