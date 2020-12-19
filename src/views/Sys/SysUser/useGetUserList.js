//导入 reactive 对象
import {
  reactive
} from "vue";

//导入 API 接口
import {
  sys
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//#region 定义方法  获取账号列表
export const useGetUserList = (sysUsersTable) => {

  //#region 分页参数 
  const userPagination = reactive({
    //列表所在页数
    current: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ['10'],
    //一共多少条数据
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion

  //#region 根据后台接口地址发送请求获取权限组数据
  const getUserList = () => {
    //请求地址 /admin/sys/user/list
    httpGet(sys.GetUserList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          sysUsersTable.data = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变 
    userPagination.current = pagination.current;
    userPagination.pageSize = pagination.pageSize;
    //刷新列表
    getUserList();
  }
  //#endregion

  //返回数据
  return {
    userPagination,
    getUserList,
    pageChange
  };
};
//#endregion