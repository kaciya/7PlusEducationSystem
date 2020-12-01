import { reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import userList from "@/api/userListAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const userData = () => {
  //#region 表格标题
  let columns = reactive([
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "用户昵称",
      dataIndex: "userName",
      width: "18%"
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: "18%"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      width: "18%",
      // 排序 默认降序
      defaultSortOrder: "descend",
      // 排序规则
      sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
    },
    {
      title: "来源",
      slots: { customRender: "channel" },
      align: "center",
      width: "18%"
    },
    {
      title: "操作",
      align: "center",
      width: "18%",
      slots: { customRender: "operation" }
    }
  ]);
  // #endregion

  // #region 获取(查询)数据
  // 第几页
  let current = ref(1);
  // 每页显示多少条
  let pageSize = ref(20);
  // 存放用户信息
  // const data = ref([]);
  const data = ref({});
  // 表单数据
  const formUser = reactive({
    userName: "",
    mobile: "",
    id: ""
  });
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getData = async () => {
    const res = await httpGet(userList.UserData, {
      pageNum: current.value,
      pageSize: pageSize.value,
      id: formUser.id,
      mobile: formUser.mobile,
      userName: formUser.userName
    });
    if (res.code == 200) {
      data.value = res.data;
      console.log("data.value :>> ", data);
      // 查询成功 把状态设置为true
      isSuccess.value = true;
    }
  };
  getData();
  // 点击页码显示对应数据
  const handlePageChange = (page, pageSizes) => {
    pageSize.value = pageSizes;
    current.value = page;
    getData();
  };
  // 选择每页显示多少条数据显示对应条数
  const onShowSizeChange = (page, pageSizes) => {
    pageSize.value = pageSizes;
    current.value = page;
    getData();
  };
  // 每页可以显示多少条
  const pageSizeOptions = reactive(["20"]);

  //#endregion

  //#region 查询
  // 点击查询事件
  const handelQuery = () => {
    // 判断id是为数字
    if (isNaN(formUser.id)) {
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
    getData();
  };
  //#endregion
  return {
    columns,
    data,
    current,
    pageSize,
    pageSizeOptions,
    formUser,
    isSuccess,
    getData,
    handelQuery,
    handlePageChange,
    onShowSizeChange
  };
};
