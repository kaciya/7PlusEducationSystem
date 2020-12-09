//导入 reactive 对象
import {
  reactive,
  ref
} from "vue";

//导入 API接口
import {
  feedback
} from "@/api/subUserAPI";

//导入 GET请求方法
import {
  httpGet,
  httpPost
} from "@/utils/http";

//导入 全局提示信息
import {
  message
} from 'ant-design-vue';


//#region 获取 用户提交 联系记录列表
export const showFeedbackList = () => {
  //图片获取正则表达
  const matchReg = ref("\\[(.*?)\\]");

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

  //#region 创建变量  获取表格项
  const feedbackTable = reactive({
    feedbackColums: [{
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
        defaultSortOrder: 'descend',
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
    feedbackData: []
  });

  //#endregion

  //#region 根据后台接口地址发送请求联系记录
  const getFeedbackData = (params) => {
    //请求接口: /admin/feedback/page
    httpGet(feedback.feedbackList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //遍历获取到的数据列表
          res.data.records.forEach(element => {
            //获取每个图片  使用正则表达式将图片地址 切割出 重新存入图片参数中
            element.picUrls = element.picUrls.match(matchReg.value)[1];
          });
          //将获取到的数据列表存入变量中
          feedbackTable.feedbackData = res.data.records;
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

  //#region 操作处理 点击事件
  const manageClick = (feedId) => {
    //根据id 发送请求
    httpPost(feedback.feedbackHandle, {
        description: "aaa",
        feedbackId: feedId,
        status: 1
      })
      .then(res => {
        if (res.success) {
          message.success(res.message);
          //重新刷新列表
          getFeedbackData({});
        }
      })
      .catch(error => {
        message.error(error);
      })
  }
  //#endregion


  //返回数据
  return {
    feedbackTable,
    pageInfo,
    getFeedbackData,
    pageChange,
    pageSizeChange,
    manageClick,
  };
};
//#endregion