//关于 权限组 接口
export const role = {
  //渲染权限列表
  GetRolesList: "/role/list",
  //删除列表项
  DelRoles: "/role/delete",
  //更改启用状态
  EditRolesStatus: "/role/status",
  //渲染权限列表
  GetRolesPermissions: "/role/permissions",
  //添加权限组
  AddRoles: "/role/add",
  //权限组详情
  GetRoleDetail: "/role/detail",
  //修改权限组
  EditRole: "/role/update"
};

//关于 账号管理 接口
export const sys = {
  //渲染账号列表
  GetUserList: "/sys/user/list",
  //删除账号
  DelUser: "/sys/user/delete",
  //更改启用状态
  EditUserStatus: "/sys/user/status",
  //添加账号
  AddUser: "/sys/user/add",
  //重置账号密码
  ResetUser: "/sys/user/resetPwd",
  //[初登录]修改密码
  UpdatePwd: "/sys/user/updatePwd"
};

//关于 操作日志 接口
export const log = {
  //渲染操作日志
  GetLogList: "/log/page"
};
