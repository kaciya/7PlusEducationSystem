<template>
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
    <a-card style="min-height: 93%">
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>输入查询：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="noticeTitle" placeholder="公告标题" />
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
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="1"> 已发布 </a-select-option>
                  <a-select-option value="0"> 已结束 </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>发布人员：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="noticeUserName" placeholder="全部" />
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
      <div class="table border">
        <a-page-header style="border-bottom: 1px solid #ddd" title="数据列表">
          <template #extra>
            <a-button type="primary" @click="addShowModal"> 添加 </a-button>
            <!-- 添加模态框 start -->
            <a-modal
              v-model:visible="addVisible"
              title="发布公告"
              width="950px"
              :afterClose="addCloselModal"
              @ok="addConfirmModal"
            >
              <a-form :model="addModel" :rules="addRules" ref="addFormRef">
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
                    format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate"
                    :show-time="{
                      defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }"
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
          </template>
        </a-page-header>
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="noticeData"
          :row-key="(record) => record.id"
          :pagination="tablePagination"
          @change="tablePageChange"
        >
          <template #status="{ text }">
            <span v-if="text.status == 1">已发布</span>
            <span v-else>已结束</span>
          </template>
          <template #operation="{ text }">
            <div v-if="text.status == 1">
              <a-button
                class="modify-btn"
                type="primary"
                style="margin-right: 10px"
                @click="editShowModal(text)"
                >编辑</a-button
              >
              <a-popconfirm
                title="此操作将永久删除该用户, 是否继续?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="delOneNotice(text.id)"
                @cancel="cancelDel"
              >
                <a-button type="danger"> 删除 </a-button>
              </a-popconfirm>
            </div>
            <div v-else>
              <a-popconfirm
                title="此操作将永久删除该用户, 是否继续?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="delOneNotice(text.id)"
                @cancel="cancelDel"
              >
                <a-button type="danger"> 删除 </a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <!-- 表格 end -->
        <!-- 编辑模态框 start -->
        <a-modal
          v-model:visible="editVisible"
          title="编辑公告"
          width="950px"
          :afterClose="editCloselModal"
          @ok="editConfirmModal"
        >
          <a-form :model="editModel" :rules="editRules" ref="editFormRef">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="公告标题："
              name="noticeTitle"
            >
              <a-input
                v-model:value="editModel.noticeTitle"
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
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
                :show-time="{
                  defaultValue: moment('00:00:00', 'HH:mm:ss'),
                }"
                v-model:value="editModel.endDate"
              />
            </a-form-item>
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="公告内容："
              name="noticeContent"
            >
              <!-- @ready="onReady" -->
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                v-model="editModel.noticeContent"
              ></ckeditor>
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- 编辑模态框 end -->
      </div>
      <!-- 数据列表 end -->
    </a-card>
  </a-layout-content>
</template>

<script>
import { ref } from "vue";
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格配置
import { useNoticeDataList } from "./useNoticeDataList";
import { useGetNoticeColumns } from "./useGetNoticeColumns";
// 引入查询重置
import { useGetNoticeList } from "./useGetNoticeList";
// 引入添加公告
import { useAddNotice } from "./useAddNotice";
// 引入编辑公告
import { useEditNotice } from "./useEditNotice";
// 引入删除公告
import { useDelNotice } from "./useDelNotice";
// 引入富文本编辑器
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// 中文化富文本
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// 上传图片处理文件
// import MyUploadAdapter from "./MyUploadAdapter.js";
// 引入日期处理
import moment from "moment";
export default {
  setup() {
    // 数据列表
    // getNoticeData：获取数据
    // noticeData：数据列表
    // tablePagination：分页
    const { getNoticeData, noticeData, tablePagination } = useNoticeDataList();

    // columns：表格列的配置
    const { columns } = useGetNoticeColumns();

    // 查询重置
    const {
      noticeTitle, // 输入查询
      noticeStatus, // 公告状态
      noticeUserName, // 发布人员对象
      noticeReset, // 重置
      noticeRead, // 查询
      noticeModel, // 查询存下的输入框内容
    } = useGetNoticeList(getNoticeData, tablePagination);

    // 点击切换页面
    const tablePageChange = (pagination) => {
      tablePagination.current = pagination.current;
      tablePagination.pageSize = pagination.pageSize;
      // 重新渲染
      getNoticeData(
        noticeModel.status,
        noticeModel.title,
        noticeModel.username
      );
    };

    // 添加公告
    const {
      addVisible, // 模态框绑定
      addShowModal, // 显示添加模态框
      addModel, // 表单内容
      addRules, // 校验规则
      addCloselModal, // 关闭模态框
      addConfirmModal, // 确认添加
      addFormRef, // 表单ref
    } = useAddNotice(getNoticeData);

    // 编辑公告
    const {
      editVisible, // 模态框绑定
      editShowModal, // 显示编辑模态框
      editModel, // 表单内容
      editRules, // 校验规则
      editCloselModal, // 关闭模态框
      editConfirmModal, // 确认编辑
      editFormRef, // 表单ref
    } = useEditNotice(getNoticeData);

    // 日期选择设置
    const disabledDate = (current) => {
      // 不能选择今天和今天之前的日期
      return current && current < moment().endOf("day");
    };

    // delOneNotice：删除公告
    // cancelDel：取消删除
    const { delOneNotice, cancelDel } = useDelNotice(getNoticeData);

    // 使用富文本编辑器
    const editor = ref(ClassicEditor);

    // 中文化富文本
    const editorConfig = ref({
      language: "zh-cn",
    });

    // const onReady = (editor) => {
    //   // 自定义上传图片插件
    //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    //     return new MyUploadAdapter(loader);
    //   };
    // };
    return {
      // 数据列表
      getNoticeData,
      noticeData,
      tablePagination,
      columns,
      tablePageChange,
      // 查询重置
      noticeTitle,
      noticeStatus,
      noticeUserName,
      noticeReset,
      noticeRead,
      noticeModel,
      // 添加公告
      addVisible,
      addShowModal,
      addModel,
      addRules,
      addCloselModal,
      addConfirmModal,
      addFormRef,
      // 编辑
      editVisible,
      editShowModal,
      editModel,
      editRules,
      editCloselModal,
      editConfirmModal,
      editFormRef,
      // 日期选择设置
      disabledDate,
      moment,
      // 删除
      delOneNotice,
      // 取消删除
      cancelDel,
      // 富文本编辑器
      editor,
      // 中文化富文本
      editorConfig,
      // onReady,
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
.table {
  .ant-table-wrapper {
    padding: 24px;
  }
}
.border {
  border: 1px solid #ddd;
}
</style>
