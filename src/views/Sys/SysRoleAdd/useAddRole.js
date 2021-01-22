//导入 reactive 对象
import { ref, reactive } from "vue";

//导入 请求方法
import { httpPost } from "@/utils/http";

// 导入router
import { useRouter } from "vue-router";

//导入 API 接口
import { role } from "@/api/sysUserAPI";

// 引入提示框
import { message } from "ant-design-vue";

//#region 权限组添加 功能
export const useAddRole = () => {
  //使用useRouter
  const router = useRouter();

  //定义布尔值 判断是否获取选中的权限ID
  const getTreeChecked = ref(false);

  //定义表单
  const addRoleFormRef = ref(null);

  //#region 权限组添加 表单校验规则
  const addRoleRules = reactive({
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
  const addRoleForm = reactive({
    roleName: ""
  });
  //#endregion

  //定义方法 获取子组件传入的值
  const getDefKeys = defKeys => {
    addRoleForm.permissionIds = defKeys;
  };

  //#region 创建提交事件
  const addRoleConfirm = () => {
    //触发子组件的获取所选权限ID的方法
    getTreeChecked.value = true;

    //获取表单验证的值
    addRoleFormRef.value.validate().then(() => {
      //获取请求所需参数
      const params = {
        permissionIds: addRoleForm.permissionIds,
        roleName: addRoleForm.roleName
      };

      //发起请求
      httpPost(role.AddRoles, params)
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
    //判断是否获取选中的权限ID
    getTreeChecked,
    //定义表单
    addRoleFormRef,
    //添加表单校验规则
    addRoleRules,
    //表单数据模型对象
    addRoleForm,
    //提交事件
    addRoleConfirm,
    //获取子组件传入的值方法
    getDefKeys
  };
};
//#endregion
