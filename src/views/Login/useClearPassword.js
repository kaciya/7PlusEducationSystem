//#region 清除表单密码（重置）
export function useClearPassword(loginModel) {
  // 清除密码
  const clearPassword = () => {
    loginModel.password = "";
  }

  return {
    clearPassword
  }
}
//#endregion