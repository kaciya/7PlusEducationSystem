//#region 清除表单密码（重置表单）
export function useResetForm(loginFormRef) {
  // 重置表单
  const resetForm = () => {
    loginFormRef.value.resetFields();
  };

  return {
    resetForm
  };
}
//#endregion
