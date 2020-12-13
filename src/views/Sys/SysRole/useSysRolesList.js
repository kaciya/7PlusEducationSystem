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
import { useRouter } from "vue-router";

//#region 渲染权限组标签列表 和 表头
export const showRoleList = (rolesTable) => {
  //使用useRouter
  const router = useRouter();

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

  //#region 根据后台接口地址发送请求获取权限组数据
  const getSysRolesData = () => {
    //请求地址 /admin/role/list
    httpGet(role.sysRolesList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          rolesTable.rolesData = res.data;
          //获取多少条数据
          pageInfo.total = res.data.length;
        }
      })
      .catch(error => {
        console.log("error", error);
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

  //#region 添加路由跳转
  const handleAddRouter = () => {
    router.push("/sys/role/add");
  }
  //#endregion

    //#region 编辑路由跳转
    const handleEditRouter = (roleId) => {
      router.push("/sys/role/edit/"+roleId);
    }
    //#endregion

  //返回
  return {
    pageInfo,
    getSysRolesData,
    pageChange,
    pageSizeChange,
    handleAddRouter,
    handleEditRouter,
  };
};
//#endregion