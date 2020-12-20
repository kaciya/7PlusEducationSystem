import { onMounted, reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const useGetList = () => {
  // #region 表单数据
  const userData = reactive({
    // 表格数据
    data: []
  });
  // #endregion 表单数据
  //#region 分页配置项
  const userPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion 分页配置项
  //#region 输入框数据
  const userModel = reactive({
    userName: "",
    mobile: "",
    id: ""
  });
  //#endregion 输入框数据
  //#region 获取（查询）数据
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getUserListData = async () => {
    const res = await httpGet(user.GetUserPage, {
      // 降序
      descColumns: "createTime",
      pageNum: userPagination.current,
      pageSize: userPagination.pageSize,
      id: userModel.id,
      mobile: userModel.mobile,
      userName: userModel.userName
    });
    if (res.success) {
      // 数据
      userData.data = res.data.records;
      // 数据总数
      userPagination.total = res.data.total;
      // 查询成功 把状态设置为true
      isSuccess.value = true;
    }
  };
  // 页码改变回调
  const onTableChange = pagination => {
    userPagination.current = pagination.current;
    userPagination.pageSize = pagination.pageSize;
    getUserListData();
  };
  // 初始化
  onMounted(() => {
    getUserListData();
  });

  //#endregion

  //#region 查询
  // 点击查询事件
  const getUserList = () => {
    // 判断id是为数字
    if (isNaN(userModel.id)) {
      message.warning("ID为数字");
      return;
    }
    // 判断请求是否发送成功
    if (isSuccess.value) {
      // 点击查询跳转第一页
      userPagination.current = 1;
      // 刷新页面
      getUserListData();
      // 全局提示
      message.success("查询成功");
      // 改为默认状态
      isSuccess.value = false;
    }
  };
  //#endregion
  return {
    userModel,
    userData,
    getUserListData,
    getUserList,
    onTableChange,
    userPagination
  };
};
