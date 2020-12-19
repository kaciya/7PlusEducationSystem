//导入 reactive 对象
import {
    reactive
} from "vue";

//导入 API 接口
import {
    role
} from "@/api/sysUserAPI";

//#region 权限组编辑 功能
export const useEditRole = () => {
    
    //#region 权限组编辑 表单校验规则
    const editRoleRules = reactive({
        realName: [{
            required: true,
            message: "操作员名称不能为空",
            trigger: "blur"
        }],
    })
    //#endregion

    //#region 定义表单数据模型对象
    const editRoleForm = reactive({
        roleName : "",
        permissionIds : []
    });
    //#endregion

    //返回参数 和 方法
    return{
        //编辑表单校验规则
        editRoleRules,
        //表单数据模型对象
        editRoleForm,
    }
}
//#endregion