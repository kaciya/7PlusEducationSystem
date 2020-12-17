//关于 权限组 接口
export const role = {
  //渲染权限列表
  sysRolesList: "/role/list",
  //删除列表项
  removeSysRoles: "/role/delete",
  //更改启用状态
  changeSysRolesStatus: "/role/status",
  //渲染权限列表
  sysRolesPermissions: "/role/permissions"
};

//关于 账号管理 接口
export const sys = {
  //渲染账号列表
  sysUserList: "/sys/user/list",
  //删除账号
  removeSysUser: "/sys/user/delete",
  //更改启用状态
  changeSysUserStatus: "/sys/user/status",
  //添加账号
  addSysUser: "/sys/user/add",
  //重置账号密码
  resetSysUser: "/sys/user/resetPwd"
};

//关于 操作日志 接口
export const log = {
  //渲染操作日志
  sysLogList: "/log/page"
};
