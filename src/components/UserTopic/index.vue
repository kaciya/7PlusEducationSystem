<template>
  <div>
    <!-- 表格 -->
    <a-table
      bordered
      :columns="columns"
      :data-source="topicData.data"
      :pagination="topicPagination"
      :row-key="record => record.id"
      @change="onTableChange"
    >
      <!-- 序号 -->
      <template #index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <!-- 相关 -->
      <template #relevant="{ record }">
        <div>收藏:{{ record.favoriteCount }}</div>
        <div>阅读:{{ record.readCount }}</div>
        <div>评论:{{ record.commentCount }}</div>
      </template>
      <!-- 操作 -->
      <template #operation="{ record }">
        <!-- 查看按钮 -->
        <span>
          <a-button type="primary" size="small">
            <router-link :to="'/topic/article/' + record.id">查看</router-link>
          </a-button>
        </span>
        <!-- 显示按钮 -->
        <span v-if="record.status == 0" class="shield">
          <!-- pass-btn 绿色按钮 -->
          <a-button
            size="small"
            type="primary"
            class="pass-btn"
            v-has="'topic:detail'"
            @click="topicShowModal(record.id)"
          >
            显示
          </a-button>
        </span>
        <!-- 屏蔽按钮 -->
        <span v-else-if="record.status == 1" class="shield">
          <a-button
            type="danger"
            @click="topicShieldModal(record.id)"
            size="small"
            v-has="'topic:edit'"
          >
            屏蔽
          </a-button>
        </span>
      </template>
    </a-table>
    <!-- 屏蔽模态框 start -->
    <a-modal
      v-model:visible="topicShieldVisible"
      title="屏蔽"
      @ok="confirmShieldModal(pageNum)"
      @cancel="cancelShieldModal"
    >
      <a-row>
        <a-col :span="24">
          <span> 请输入屏蔽理由 </span>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '15px' }">
        <a-col :span="24">
          <a-input v-model:value="shielFrameValue"></a-input>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 屏蔽模态框 end  -->
  </div>
</template>
<script>
// 柒加圈数据
import { useGetTopic } from "./useGetTopic";
// 柒加圈columns
import { useTopicColumns } from "./useTopicColumns";
// 引入屏蔽显示功能
import { useSetTopicShieldShow } from "@/views/SevenPlusCircle/useSetTopicShieldShow";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      topicData, // 表格数据
      topicPagination, //分页配置项
      onTableChange, //页码改变回调
      getTopicData //获取数据方法
    } = useGetTopic(prop.userID);
    // 柒加圈columns
    const { columns } = useTopicColumns();
    // 屏蔽显示
    const {
      topicShieldVisible, // 屏蔽模态框
      topicShieldModal, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      topicShowModal, // 显示框
      cancelShieldModal // 关闭模态框清空并提示
    } = useSetTopicShieldShow(getTopicData);
    return {
      //#region 柒加圈数据
      topicData,
      topicPagination,
      onTableChange,
      getTopicData,
      //#endregion
      // 柒加圈columns
      columns,
      //#region 显示屏蔽功能
      topicShieldVisible,
      topicShieldModal,
      shielFrameValue,
      confirmShieldModal,
      topicShowModal,
      cancelShieldModal
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped>
// 显示屏蔽按钮
.shield {
  margin-left: 20px;
}
</style>
