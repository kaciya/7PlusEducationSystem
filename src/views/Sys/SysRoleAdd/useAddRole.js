//导入 reactive 对象
import { reactive } from "vue";

//导入 API 接口
import { role } from "@/api/sysUserAPI";

//#region 权限组添加 功能
export const useAddRole = () => {
  //#region 权限组添加 表单校验规则
  const addRoleRules = reactive({
    realName: [
      {
        required: true,
        message: "操作员名称不能为空",
        trigger: "blur"
      }
    ]
  });
  //#endregion

  //#region 定义表单数据模型对象
  const addRoleForm = reactive({
    roleName: "",
    permissionIds: []
  });
  //#endregion

  //#region 复选框

  //#endregion

  //返回参数 和 方法
  return {
    //添加表单校验规则
    addRoleRules,
    //表单数据模型对象
    addRoleForm
  };
};
//#endregion
