//导入 reactive 对象
import {
  reactive,
  ref
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
    pageNum: 2,
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
    rolesColums: [{
        title: "索引",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "权限组",
        dataIndex: "roleName"
      },
      {
        title: "人员",
        dataIndex: "count"
      },
      {
        title: "更新时间",
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
    ],
    rolesData: []
  });

  //#region 根据后台接口地址发送请求获取权限组数据
  const getSysRolesData = () => {
    //请求地址 /admin/role/list
    httpGet(role.sysRolesList)
      .then(results => {
        //判断相应状态
        if (results.success) {
          rolesTable.rolesData = results.data;
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