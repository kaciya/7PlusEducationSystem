<template>
  <div>
    <!-- 标签管理表单 start -->
    <a-table bordered :columns="labelColumns"></a-table>
    <!-- 标签管理表单 end -->
  </div>
</template>

<script>
// 引入 钩子函数
import { onMounted } from "vue";
// 引入 标签管理表单列配置
import { useLabelColumns } from "./useLableColumns";
// 引入 获取所有标签方法
import { useGetLabels } from "./useGetLables";

export default {
  setup() {
    // 标签管理表单列配置
    let { labelColumns } = useLabelColumns();

    // 获取所有标签方法
    let { getLabels } = useGetLabels();

    // 在mounted时候
    onMounted(() => {
      // 获取所有标签
      getLabels();
    });

    return {
      // 标签管理表单列配置
      labelColumns
    };
  }
};
</script>

<style></style>
