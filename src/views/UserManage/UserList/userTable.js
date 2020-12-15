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
  });
  // #endregion 表单数据
  //#region 分页配置项
  const userTablePagination = reactive({
    current: 1,
    pageSize: 20,
    pageSizeOptions: ["20"],
    total: 0,
    showSizeChanger: true,
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
      pageNum: userTablePagination.current,
      pageSize: userTablePagination.pageSize,
      id: userModel.id,
      mobile: userModel.mobile,
      userName: userModel.userName,
    });
    if (res.code == 200) {
      // 数据
      userTableData.tableData = res.data;
      // 数据总数
      userTablePagination.total = res.data.total;
      // 查询成功 把状态设置为true
      isSuccess.value = true;
    }
  };
  let handleTableChange = (pagination) => {
    userTablePagination.current = pagination.current;
    userTablePagination.pageSize = pagination.pageSize;
    getUserTabelData();
  };
  // 初始化
  onMounted(() => {
    getUserTabelData();
  });

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
    userModel,
    isSuccess,
    userTableData,
    getUserTabelData,
    queryUserList,
    handleTableChange,
    userTablePagination,
  };
};
