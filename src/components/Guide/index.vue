<template>
  <div class="container-table">
    <!-- 备考指南表格 start-->
    <a-table
      bordered
      :columns="columns"
      :data-source="guideData.data"
      :pagination="false"
      :row-key="(record) => record.id"
    >
      <!-- 操作 -->
      <template #operation="{ record }">
        <!-- 编辑按钮 modify-btn:改变按钮颜色(黄色) -->
        <a-button type="primary" size="small" class="modify-btn">
          编辑
        </a-button>
        <!-- 删除按钮 传id进行删除-->
        <!-- 气泡确认框 -->
        <a-popconfirm title="您确定要删除吗？" @confirm="delGuide(record.id)">
          <a-button type="danger" size="small" class="guide-delete">
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <!-- 备考指南表格 end-->
  </div>
</template>

<script>
// 备考指南列表
import { useGetGuide } from "./useGetGuide";
// 删除备考指南
import { useDelGuide } from "./useDelGuide";
// 表格columns
import { useGuideColumns } from "./useGuideColumns";
export default {
  // 接收选择对应的题型Type值
  props: ["guideType"],
  setup(prop) {
    // 备考指南列表
    let { guideData, getGuideData } = useGetGuide(prop.guideType);
    // 删除
    let { delGuide } = useDelGuide(getGuideData);
    // 表格columns
    let { columns } = useGuideColumns();
    return {
      guideData, // 表格数据
      columns, //表格columns
      getGuideData, // 获取后台数据
      delGuide, //删除
    };
  },
};
</script>

<style lang="scss" scoped>
// 删除按钮
.guide-delete {
  margin-left: 8px;
}
</style>
