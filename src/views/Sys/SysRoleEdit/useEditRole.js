//导入 reactive 对象
import { ref, reactive } from "vue";

//导入 API 接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet, httpPost } from "@/utils/http";

// 导入router
import { useRouter } from "vue-router";

// 引入提示框
import { message } from "ant-design-vue";

//#region 权限组编辑 功能
export const useEditRole = () => {
  //使用useRouter
  const router = useRouter();

  //定义布尔值 判断是否获取选中的权限ID
  const getTreeChecked = ref(false);

  //定义表单
  const editRoleFormRef = ref(null);

  //创建变量 获取编辑此项的id
  const roleId = router.currentRoute.value.params.id;

  //#region 权限组编辑 表单校验规则
  const editRoleRules = reactive({
    roleName: [
      {
        required: true,
        message: "操作员名称不能为空",
        trigger: "blur"
      }
    ]
  });
  //#endregion

  //#region 定义表单数据模型对象
  const editRoleForm = reactive({
    roleName: ""
  });
  //#endregion

  //定义方法 获取子组件传入的值
  const getDefKeys = defKeys => {
    editRoleForm.permissionIds = defKeys;
  };

  //#region 获取权限组详情
  const getRolesDetail = () => {
    //发起请求 获取权限组详情
    httpGet(role.GetRoleDetail + "/" + roleId)
      .then(res => {
        if (res.success) {
          //将获取到的权限回显到表单中
          editRoleForm.roleName = res.data.roleName;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //#region 创建提交事件
  const editRoleConfirm = () => {
    //触发子组件的获取所选权限ID的方法
    getTreeChecked.value = true;

    //获取表单验证的值
    editRoleFormRef.value.validate().then(() => {
      //获取请求所需参数
      const params = {
        permissionIds: editRoleForm.permissionIds,
        roleId: roleId,
        roleName: editRoleForm.roleName
      };

      //发起请求
      httpPost(role.EditRole, params)
        .then(res => {
          //判断如果请求成功
          if (res.success) {
            //显示全局提示框
            message.success(res.message);

            //跳转页面
            router.push("/sys/role/" + new Date().getTime());
          }
        })
        .catch(err => {
          throw err;
        });
    });
  };
  //#endregion

  //返回参数 和 方法
  return {
    //编辑项id
    roleId,
    //判断是否获取选中的权限ID
    getTreeChecked,
    //编辑表单校验规则
    editRoleRules,
    //表单数据模型对象
    editRoleForm,
    //定义表单
    editRoleFormRef,
    //提交事件
    editRoleConfirm,
    //获取权限组详情
    getRolesDetail,
    //获取子组件传入的值方法
    getDefKeys
  };
};
//#endregion
