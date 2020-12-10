import { onMounted, reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const userTable = () => {
  // #region 表单数据
  const userTableData = reactive({
    // 表格数据
    tableData: [],
    // 表格标题
    tableColumns: [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "用户昵称",
        dataIndex: "userName",
        width: "18%",
      },
      {
        title: "手机号",
        dataIndex: "mobile",
        width: "18%",
      },
      {
        title: "注册时间",
        dataIndex: "createTime",
        width: "18%",
      },
      {
        title: "来源",
        slots: { customRender: "channel" },
        align: "center",
        width: "18%",
      },
      {
        title: "操作",
        align: "center",
        width: "18%",
        slots: { customRender: "operation" },
      },
    ],
  });

  // #endregion 表单数据
  //#region 分页数据
  const pagination = reactive({
    // 第几页
    pageNum: 1,
    // 每页显示几条
    pageSize: 20,
    // 数据总数
    total: 0,
    // 每页可以显示多少条
    pageSizeOptions: ["20"],
  });
  //#endregion 分页数据
  //#region 输入框数据
  const userModel = reactive({
    userName: "",
    mobile: "",
    id: "",
  });
  //#endregion 输入框数据
  //#region 获取（查询）数据
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getUserTabelData = async () => {
    const res = await httpGet(user.UserPage, {
      // 降序
      descColumns: "createTime",
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      id: userModel.id,
      mobile: userModel.mobile,
      userName: userModel.userName,
    });
    if (res.code == 200) {
      // 数据
      userTableData.tableData = res.data;
      // 数据总数
      pagination.total = res.data.total;
      // 查询成功 把状态设置为true
      isSuccess.value = true;
    }
  };
  // 初始化
  onMounted(() => {
    getUserTabelData();
  });
  //#endregion 获取（查询）数据
  // 点击页码显示对应数据
  const handlePageChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTabelData();
  };
  // 选择每页显示多少条数据显示对应条数
  const onShowSizeChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTabelData();
  };

  //#endregion

  //#region 查询
  // 点击查询事件
  const queryUserList = () => {
    // 判断id是为数字
    if (isNaN(userModel.id)) {
      message.warning("ID为数字");
      return;
    }
    // 判断请求是否发送成功
    if (isSuccess.value) {
      // 全局提示
      message.success("查询成功");
      // 改为默认状态
      isSuccess.value = false;
    }
    getUserTabelData();
  };
  //#endregion
  return {
    pagination,
    userModel,
    isSuccess,
    userTableData,
    getUserTabelData,
    queryUserList,
    handlePageChange,
    onShowSizeChange,
  };
};
