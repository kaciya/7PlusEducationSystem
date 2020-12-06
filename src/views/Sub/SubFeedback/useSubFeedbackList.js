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
  httpGet
} from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const showContactList = () => {
  //创建 变量  接受 返回的 指定日期
  let dates = reactive({});

  //图片获取正则表达
  const matchReg = ref("\\[(.*?)\\]");

  //创建变量  获取表格项
  const feedbackColums = reactive([{
      title: "#",
      key: "index",
      slots: {
        customRender: "index"
      },
      align: "center"
    },
    {
      title: "内容",
      dataIndex: "content"
    },
    {
      title: "联系方式",
      dataIndex: "mobile"
    },
    {
      title: "图片",
      key: "picUrls",
      slots: {
        customRender: "picUrls"
      }
    },
    {
      title: "提交时间",
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
  ]);

  //#region 分页所需数据
  //列表所在页数
  let current = ref(1);
  //现在一页显示多少条数据
  let pageSize = ref(10);
  //一共多少条数据 
  let total = ref(0);
  //#endregion

  //#region 根据后台接口地址发送请求联系记录
  //创建变量 储存联系记录数据
  let feedbackData = reactive({});
  //请求接口: /admin/feedback/page
  httpGet(feedback.feedbackList)
    .then(res => {
      //判断是否获取成功
      if (res.success) {
        //遍历获取到的数据列表
        res.data.records.forEach(element => {
          //获取每个图片  使用正则表达式将图片地址 切割出 重新存入图片参数中
          element.picUrls = element.picUrls.match(matchReg.value)[1];
        });
        //将获取到的数据列表存入变量中
        feedbackData.data = res.data.records;
        total.value = res.data.records.length;
      }
    })
    .catch(error => {
      console.log(error);
    });
  //#endregion

  //返回数据
  return {
    dates,
    feedbackColums,
    feedbackData,
    current,
    pageSize,
    total
  };
};
//#endregion


//#region 点击下一页方法
export const pageChange = (pageNumber) => {
  console.log(current);
  current = pageNumber;
}
//#endregion