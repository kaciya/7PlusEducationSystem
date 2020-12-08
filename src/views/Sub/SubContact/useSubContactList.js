//导入 reactive 对象
import {
  reactive,
  ref
} from "vue";

//导入 API接口
import {
  contact
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
export const showContactList = () => {

  //日期选择器发生改变时的 指定日期
  let dateModel = reactive([]);
  //日期选择器确定后的 指定日期
  let dateConfrim = reactive({});

  //下拉列表 选择
  let selectModel = ref('2');

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

  //创建变量  获取表格项
  const contactTable = reactive({
    contactColums: [{
        title: "索引",
        key: "index",
        slots: {
          customRender: "index"
        },
        align: "center"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "mobile"
      },
      {
        title: "QQ",
        dataIndex: "qq"
      },
      {
        title: "内容",
        dataIndex: "content"
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
    contactData: []
  });

  //#region 根据后台接口地址发送请求联系记录
  const getContactData = (params) => {
    //请求接口: /admin/contact/page
    httpGet(contact.contactList,params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //获取列表数据
          contactTable.contactData = res.data.records;
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

  //#region 选择项改变
  const selectChange = (value) => {
    //将改变的项 属性值储存 到 双向绑定的selectModel中
    selectModel.value = value;
  }
  //#endregion

  //#region 日期选择确定方法
  const dateChangeOk = (data) => {
    //将获取的日期存入dateModel中
    dateConfrim.startDate = data[0].format('YYYY-MM-DD HH:mm:ss');
    dateConfrim.endDate = data[1].format('YYYY-MM-DD HH:mm:ss');
  }
  //#endregion

  //#region 日期选择器发生变换方法
  const dateChange = (data, dataString) => {
    dateModel = dataString;
    console.log(dateModel);
  }
  //#endregion

  //#region 重置列表项 和 时间范围
  const resetClick = () => {
    //将双向绑定的 日期 和 选择项 中的值 重置
    selectModel.value = "2";
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
    //判断状态值是否为 2
    if (selectModel == "1" || selectModel == "0") {
      params.status = selectModel.value;
    }

    //发起查询请求
    getContactData(params);
  }
  //#endregion

    //#region 操作处理 点击事件
    const manageClick = (contactId) => {
      //根据id 发送请求
      httpPost(`${contact.contactHandle}/${contactId}`)
        .then(res => {
          if (res.success) {
            message.success(res.message);
            //重新刷新列表
            getContactData({});
          }
        })
        .catch(error => {
          message.error(error);
        })
    }
    //#endregion


  //返回
  return {
    contactTable,
    dateModel,
    selectModel,
    pageInfo,
    pageChange,
    pageSizeChange,
    getContactData,
    dateChangeOk,
    dateChange,
    selectChange,
    resetClick,
    searchClick,
    manageClick,
  };
};
//#endregion