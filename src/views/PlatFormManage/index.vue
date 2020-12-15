<template>
  <!-- 主体 start -->
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        {
          route: '',
          name: '平台管理',
        },
        {
          route: '',
          name: '公告管理',
        },
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>输入查询：</span>
              </a-col>
              <a-col :span="17">
                <a-input
                  v-model:value="noticeInputQuery"
                  placeholder="公告标题"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>公告状态：</span>
              </a-col>
              <a-col :span="17">
                <a-select v-model:value="noticeStatus" placeholder="全部">
                  <a-select-option value="1"> 已发布 </a-select-option>
                  <a-select-option value="0"> 已结束 </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>对象：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="noticeObj" placeholder="全部" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="3" :offset="2">
            <a-row>
              <a-col :span="12">
                <a-button type="primary" @click="noticeRead"> 查询 </a-button>
              </a-col>
              <a-col :span="12">
                <a-button @click="noticeReset">重置</a-button>
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
          <!-- 添加模态框 start -->
          <a-modal
            v-model:visible="addVisible"
            title="发布公告"
            width="950px"
            @cancel="cancelAddModal"
            @ok="confirmAddModal"
          >
            <a-form :model="addModel" :rules="addRules" ref="addForm">
              <a-form-item
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                label="公告标题："
                name="noticeTitle"
              >
                <a-input
                  v-model:value="addModel.noticeTitle"
                  placeholder="请填写公告标题"
                />
              </a-form-item>
              <a-form-item
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                label="截止时间："
                name="endDate"
              >
                <a-date-picker
                  format="YYYY-MM-DD"
                  :disabled-date="DisabledDate"
                  v-model:value="addModel.endDate"
                />
              </a-form-item>
              <a-form-item
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                label="公告内容："
                name="noticeContent"
              >
                <ckeditor
                  :editor="editor"
                  v-model="addModel.noticeContent"
                ></ckeditor>
              </a-form-item>
            </a-form>
          </a-modal>
          <!-- 添加模态框 end -->
        </div>
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="noticeData"
          :row-key="(record) => record.id"
          :pagination="false"
        >
          <template #status="{ text }">
            <span v-if="text.status == 1">已发布</span>
            <span v-else>已结束</span>
          </template>
          <template #operation="{ text }">
            <div v-if="text.status == 0">
              <a-button
                type="primary"
                @click="
                  handleShowUpdateModal(
                    text.id,
                    text.title,
                    text.content,
                    text.createTime,
                    text.status
                  )
                "
                style="margin-right: 10px"
                >编辑</a-button
              >
              <a-button type="danger" @click="delOneNotice(text.id)"
                >删除</a-button
              >
            </div>
            <div v-else>
              <a>删除</a>
            </div>
          </template>
        </a-table>
        <!-- 表格 end -->
        <!-- 编辑模态框 start -->
        <a-modal
          v-model:visible="updateVisible"
          title="编辑公告"
          width="950px"
          @cancel="handleCancelUpdateModal"
          @ok="handleConfirmUpdateModal"
        >
          <a-form :model="updateModel" :rules="updateRules" ref="updateForm">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="公告标题："
              name="noticeTitle"
            >
              <a-input
                v-model:value="updateModel.noticeTitle"
                placeholder="请填写公告标题"
              />
            </a-form-item>
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="截止时间："
              name="endDate"
            >
              <a-date-picker
                format="YYYY-MM-DD"
                :disabled-date="DisabledDate"
                v-model:value="updateModel.endDate"
              />
            </a-form-item>
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="公告内容："
              name="noticeContent"
            >
              <ckeditor
                :editor="editor"
                v-model="updateModel.noticeContent"
              ></ckeditor>
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- 编辑模态框 end -->
        <!-- 分页 start -->
        <a-pagination
          @change="onChangePage"
          show-size-changer
          :page-size-options="['20']"
          v-model:current="pageNum"
          :pageSize="20"
          :total="noticeTotal"
        />
        <!-- 分页 end -->
      </div>
      <!-- 数据列表 end -->
    </div>
  </a-layout-content>
  <!-- 主体 end -->
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格配置
import { useNoticeDataList } from "./useNoticeDataList";
import { useNoticeGetColumns } from "./useNoticeGetColumns";
// 引入查询重置
import { useNoticeQuery } from "./useNoticeQuery";
// 引入添加公告
import { useNoticeAdd } from "./useNoticeAdd";
// 引入编辑公告
import { useNoticeModify } from "./useNoticeModify";
// 引入删除公告
import { useNoticeDel } from "./useNoticeDel";
// 引入富文本编辑器
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// 引入日期处理
import moment from "moment";
import { ref } from "vue";
export default {
  setup() {
    // 数据列表
    // columns：表格列的配置
    // noticeData：数据列表
    // noticeGetData：获取数据
    // noticeTotal：数据总条数
    const { noticeData, noticeGetData, noticeTotal } = useNoticeDataList();
    const { columns } = useNoticeGetColumns();
    // 点击换页
    const onChangePage = (page, pageSize) => {
      noticeGetData(page, pageSize);
    };

    // 查询重置
    const {
      noticeInputQuery, // 输入查询
      noticeStatus, // 公告状态
      noticeObj, // 发布人员对象
      pageNum, // 当前页
      noticeReset, // 重置
      noticeRead, // 查询
    } = useNoticeQuery(noticeGetData);

    // 添加公告
    const {
      addVisible, // 模态框绑定
      addShowModal, // 显示添加模态框
      addModel, // 表单内容
      addRules, // 校验规则
      cancelAddModal, // 关闭模态框
      confirmAddModal, // 确认添加
      addForm, // 表单ref
    } = useNoticeAdd();

    // 编辑公告
    const {
      updateVisible, // 模态框绑定
      handleShowUpdateModal, // 显示编辑模态框
      updateModel, // 表单内容
      updateRules, // 校验规则
      handleCancelUpdateModal, // 关闭模态框
      handleConfirmUpdateModal, // 确认编辑
      updateForm, // 表单ref
    } = useNoticeModify();

    // 日期选择设置
    const DisabledDate = (current) => {
      // 不能选择今天和今天之前的日期
      return current && current < moment().endOf("day");
    };

    // 删除公告
    const { delOneNotice } = useNoticeDel();

    // 使用富文本编辑器
    const editor = ref(ClassicEditor);
    return {
      // 数据列表
      noticeData,
      noticeGetData,
      noticeTotal,
      onChangePage,
      columns,
      // 查询重置
      noticeInputQuery,
      noticeStatus,
      noticeObj,
      pageNum,
      noticeReset,
      noticeRead,
      // 添加公告
      addVisible,
      addShowModal,
      addModel,
      addRules,
      cancelAddModal,
      confirmAddModal,
      addForm,
      // 编辑
      updateVisible,
      handleShowUpdateModal,
      updateModel,
      updateRules,
      handleCancelUpdateModal,
      handleConfirmUpdateModal,
      updateForm,
      // 日期选择设置
      DisabledDate,
      // 删除
      delOneNotice,
      // 富文本编辑器
      editor,
    };
  },
  // 使用组件
  components: {
    Crumbs,
  },
};
</script>

<style lang="scss" scoped>
.query {
  height: 100px;
  margin-bottom: 15px;
  > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
  span {
    font-size: 12px;
  }
  .ant-select {
    width: 100%;
  }
  .ant-btn {
    width: 70px;
  }
  .right {
    text-align: right;
  }
}
.border {
  border: 1px solid #ddd;
  .border-bottom {
    height: 50px;
    border-bottom: 1px solid #ddd;
    > span {
      line-height: 50px;
      color: #333;
      font-weight: 700;
      margin-left: 11px;
    }
    & > .ant-btn {
      float: right;
      margin: 9px 16px;
    }
  }
  .ant-table-wrapper {
    padding: 16px;
  }
  .ant-pagination {
    text-align: right;
    padding: 16px;
  }
  .ant-pagination-next {
    margin-right: 8px;
  }
}
</style>
