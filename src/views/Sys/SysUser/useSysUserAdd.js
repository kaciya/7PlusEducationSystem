//导入 reactive 对象
import {
    reactive,
    ref
} from "vue";

//导入 API 接口
import {
    sys,
    role
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
    httpPost,
    httpGet
} from "@/utils/http";

// 引入提示框
import { message } from "ant-design-vue";

//#region 定义账号添加表单校验规则
export const sysUserRules = reactive({
    realName: [{ 
        required: true,
        message: "操作员名称不能为空",
        trigger: "blur"
    }],
    username: [{
        required: true,
        message: "账号不能为空",
        trigger: "blur"
    }],
    roleIds: [{
        required: true,
        message: "权限组不能为空",
        trigger: "blur",
        type: "number"
    }],
})
//#endregion

//#region 渲染权限列表
export const getUserPermissions = () => {
    let RolesPermissionsList = reactive({});
    const getPermissions = () => {
        //发起请求  获取权限列表
        httpGet(role.sysRolesList).then(res => {
                if (res.success) {
                    //获取权限列表数据
                    RolesPermissionsList.data = res.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //返回
    return {
        RolesPermissionsList,
        getPermissions
    }
}
//#endregion


//#region 添加账号
export const addSysUser = () => {
    //显示添加账号模态框
    let addUserVisible = ref(false);
    //模态框确认时加载
    let confirmLoading = ref(false);

    //#region 定义表单
    const addUserForm = ref(null);
    //#endregion

    //显示添加账号模态框
    const showAddModal = () => {
        addUserVisible.value = true;
    }

    //#region 定义账号添加表单数据模型对象
    let sysUserForm = reactive({
        realName: "",
        username: "",
        roleIds: undefined
    })
    //#endregion

    //添加账号确定时的回调
    const handleAddOk = (callback) => {
        //发起请求 添加账号                     
        addUserForm.value.validate().then(() => {
                //获取请求需要参数
                let params = {
                    realName: sysUserForm.realName,
                    roleIds: sysUserForm.roleIds,
                    username: sysUserForm.username
                }
                //发起请求  添加数据
                httpPost(sys.addSysUser, params).then(res => {
                    //判断如果请求成功
                    if (res.success) {
                        //显示确认加载
                        confirmLoading.value = true;
                        message.success(res.message);
                        //设置定时器
                        setTimeout(() => {
                            //关闭加载与弹窗
                            addUserVisible.value = false;
                            confirmLoading.value = false;
                            //重新刷新页面
                            callback();
                        }, 700);
                    }else{
                        message.error("添加失败: "+ res.message);
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    //添加账号取消时的回调
    const handleAddCancel = () => {
        //清空表单
        addUserForm.value.resetFields();
        //关闭弹窗
        addUserVisible.value = false;
    }

    //返回数据
    return {
        addUserVisible,
        confirmLoading,
        addUserForm,
        sysUserForm,
        showAddModal,
        handleAddOk,
        handleAddCancel
    }
}
//#endregion