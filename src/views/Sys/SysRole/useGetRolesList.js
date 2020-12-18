//导入 reactive 对象
import {
  reactive
} from "vue";

//导入 API接口
import {
  role
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

// 导入router
import {
  useRouter
} from "vue-router";

//#region 渲染权限组标签列表 和 表头
export const useGetRolesList = (rolesTable) => {
  //使用useRouter
  const router = useRouter();

   //#region 分页参数 
   const rolePagination = reactive({
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
  const getSysRolesData = () => {
    //请求地址 /admin/role/list
    httpGet(role.GetRolesList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          rolesTable.data = res.data;
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  //#endregion

  //#region 添加路由跳转
  const addRouter = () => {
    router.push("/sys/role/add");
  }
  //#endregion

  //#region 编辑路由跳转
  const editRouter = (roleId) => {
    router.push("/sys/role/edit/" + roleId);
  }
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    rolePagination.current = pagination.current;
    rolePagination.pageSize = pagination.pageSize;
    getSysRolesData();
  }
  //#endregion

  //返回
  return {
    rolePagination,
    getSysRolesData,
    addRouter,
    editRouter,
    pageChange,
  };
};
//#endregion