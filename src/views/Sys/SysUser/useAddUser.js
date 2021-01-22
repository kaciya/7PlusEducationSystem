//导入 reactive 对象
import { reactive, ref } from "vue";

//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入 请求方法
import { httpPost } from "@/utils/http";

// 引入提示框
import { message } from "ant-design-vue";

//#region 添加账号
export const useAddUser = getUserList => {
  //#region 定义账号添加表单校验规则
  const sysUserRules = reactive({
    realName: [
      {
        required: true,
        whitespace: true,
        message: "操作员名称不能为空",
        trigger: "blur"
      }
    ],
    username: [
      {
        required: true,
        whitespace: true,
        message: "账号不能为空",
        trigger: "blur"
      }
    ],
    roleIds: [
      {
        required: true,
        message: "权限组不能为空",
        trigger: "blur",
        type: "number"
      }
    ]
  });
  //#endregion

  //显示添加账号模态框
  const addUserVisible = ref(false);

  //#region 定义表单
  const addUserFormRef = ref(null);
  //#endregion

  //显示添加账号模态框
  const showAddModal = () => {
    addUserVisible.value = true;
  };

  //#region 定义账号添加表单数据模型对象
  const sysUserForm = reactive({
    realName: "",
    username: "",
    roleIds: undefined
  });
  //#endregion

  //添加账号确定时的回调
  const addUserConfirm = () => {
    //发起请求 添加账号
    addUserFormRef.value
      .validate()
      .then(() => {
        //获取请求需要参数
        const params = {
          realName: sysUserForm.realName,
          roleIds: [sysUserForm.roleIds],
          username: sysUserForm.username
        };
        //发起请求  添加数据
        httpPost(sys.AddUser, params).then(res => {
          //判断如果请求成功
          if (res.success) {
            //显示确认加载
            message.success(res.message);
            //关闭加载与弹窗
            addUserVisible.value = false;
            //清空表单
            addUserFormRef.value.resetFields();
            //重新刷新页面
            getUserList();
          } else {
            message.error("添加失败: " + res.message);
          }
        });
      })
      .catch(err => {
        throw err;
      });
  };

  //添加账号取消时的回调
  const addUserCancel = () => {
    //清空表单
    addUserFormRef.value.resetFields();
    //关闭弹窗
    addUserVisible.value = false;
  };

  return {
    //返回账号添加表单校验规则
    sysUserRules,
    addUserVisible,
    addUserFormRef,
    sysUserForm,
    showAddModal,
    addUserConfirm,
    addUserCancel
  };
};
//#endregion
