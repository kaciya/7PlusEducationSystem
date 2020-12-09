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

//#region 渲染权限组标签列表 和 表头
export const showRoleList = () => {
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

  //定义 表格项
  const rolesTable = reactive({
    //表格列
    rolesColums: [{
        title: "索引",
        align: "center",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "权限组",
        align: "center",
        dataIndex: "roleName"
      },
      {
        title: "人员",
        align: "center",
        dataIndex: "count"
      },
      {
        title: "更新时间",
        align: "center",
        dataIndex: "updateTime",
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
        title: "启用",
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
    //表格数据
    rolesData: []
  });

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

  //返回
  return {
    rolesTable,
    pageInfo,
    getSysRolesData,
    pageChange,
    pageSizeChange,
  };
};
//#endregion