//#region 清除表单密码（重置）
export function useClearPassword(loginData) {
  // 清除密码
  const clearPassword = () => {
    loginData.password = "";
  };

  return {
    clearPassword
  };
}
//#endregion
