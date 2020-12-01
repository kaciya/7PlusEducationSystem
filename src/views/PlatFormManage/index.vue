<template>
  <!-- 主体 start -->
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        {
          route: '',
          name: '平台管理'
        },
        {
          route: '',
          name: '公告管理'
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="6" class="right">
                <span>输入查询：</span>
              </a-col>
              <a-col :span="18">
                <a-input v-model:value="inputQuery" placeholder="公告标题" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="6" class="right">
                <span>公告状态：</span>
              </a-col>
              <a-col :span="18">
                <a-select v-model:value="noticeStatus" placeholder="全部">
                  <a-select-option value="1"> 已发布 </a-select-option>
                  <a-select-option value="0"> 已结束 </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="6" class="right">
                <span>对象：</span>
              </a-col>
              <a-col :span="18">
                <a-input v-model:value="noticeObj" placeholder="全部" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="3" :offset="2">
            <a-row>
              <a-col :span="12">
                <a-button type="primary" @click="inquire(getData)">
                  查询
                </a-button>
              </a-col>
              <a-col :span="12">
                <a-button @click="reset(getData)">重置</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <!-- 查询 end -->
      <!-- 数据列表 start -->
      <div class="border">
        <div class="border-bottom">
          <span>数据列表</span>
          <a-button type="primary" @click="addShowModal"> 添加 </a-button>
          <a-modal v-model:visible="addVisible" title="发布公告" width="750px">
            <a-form :model="addForm" :rules="addRules">
              <a-form-item
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                label="公告标题："
                name="title"
              >
                <a-input
                  v-model:value="addForm.title"
                  placeholder="请填写公告标题"
                />
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="data"
          :row-key="record => record.id"
          :pagination="false"
        >
          <template #status="{ text }">
            <span v-if="text.status == 1">已发布</span>
            <span v-else>已结束</span>
          </template>
          <template #operation="{ text }">
            <div v-if="text.status == 1">
              <a>编辑</a>
              <a>删除</a>
            </div>
            <div v-else>
              <a>删除</a>
            </div>
          </template>
        </a-table>
        <!-- 表格 end -->
        <!-- 分页 start -->
        <a-pagination
          @change="onChange"
          v-model:current="current"
          :pageSize="1"
          :total="2"
        />
        <!-- 分页 end -->
      </div>
      <!-- 数据列表 end -->
    </div>
  </a-layout-content>
  <!-- 主体 end -->
</template>

<script>
import { onMounted } from "vue";
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格配置
import { noticeDataList } from "./noticeDataList";
// 引入增删改查
import { noticeFunction } from "./noticeFn";

export default {
  setup() {
    // 数据列表
    const { columns, data, getData } = noticeDataList();
    // 获取数据
    onMounted(() => {
      getData();
    });
    // 点击换页
    function onChange(page, pageSize) {
      getData(page, pageSize);
    }
    // 增删改查
    const {
      inputQuery,
      noticeStatus,
      noticeObj,
      current,
      reset,
      inquire,
      addVisible,
      addShowModal,
      addForm,
      addRules
    } = noticeFunction();

    return {
      // 输入查询
      inputQuery,
      // 公告状态
      noticeStatus,
      //  对象
      noticeObj,
      // 数据列表
      data,
      columns,
      // 当前页
      current,
      // 换页
      onChange,
      // 获取数据
      getData,
      // 重置
      reset,
      // 查询
      inquire,
      // 模态框绑定
      addVisible,
      // 添加
      addShowModal,
      // 表单内容
      addForm,
      // 校验规则
      addRules
    };
  },
  // 使用组件
  components: {
    Crumbs
  }
};
</script>

<style>
.query {
  height: 100px;
  margin-bottom: 15px;
}
.query > .ant-row {
  margin-top: 30px;
  line-height: 40px;
}
.ant-select {
  width: 100%;
}
.ant-btn {
  width: 70px;
}
.query span {
  font-size: 12px;
}
.right {
  text-align: right;
}
.border {
  border: 1px solid #ddd;
}
.border-bottom {
  height: 50px;
  border-bottom: 1px solid #ddd;
}
.border-bottom > span {
  line-height: 50px;
  color: #333;
  font-weight: 700;
  margin-left: 11px;
}
.border-bottom > .ant-btn {
  float: right;
  margin: 9px 16px;
}
.ant-table-wrapper {
  padding: 16px;
}
.ant-pagination {
  text-align: right;
  padding: 16px;
}
.ant-pagination::after {
  content: "20条/页";
  display: inline;
  visibility: visible;
}
.ant-pagination-next {
  margin-right: 8px;
}
</style>
