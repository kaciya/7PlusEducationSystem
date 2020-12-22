<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '口语题库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 题型选择 start -->
      <a-radio-group
        v-model:value="category"
        button-style="solid"
        @change="getQuestion(true)"
      >
        <a-radio-button value="RA">RA（朗读橘子）</a-radio-button>
        <a-radio-button value="RS">RS（重复橘子）</a-radio-button>
        <a-radio-button value="DI">DI（描述图片）</a-radio-button>
        <a-radio-button value="RL">RL（复述讲座）</a-radio-button>
        <a-radio-button value="ASQ">ASQ（短问答）</a-radio-button>
      </a-radio-group>
      <!-- 题型选择 end -->

      <!-- 题目列表头部 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="题目列表"
        :backIcon="false"
      >
        <!-- 利用tags插槽位置  -->
        <template #tags>
          <!-- 标签类型 下拉筛选器 start  -->
          <a-select
            size="small"
            v-model:value="labelId"
            style="min-width: 90px"
            @change="getQuestion(true)"
          >
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option
              :value="item.id"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
          <!-- 标签类型 下拉筛选器 end  -->
        </template>

        <!-- 操作区域 start -->
        <template #extra>
          <!-- 批量上传按钮（只在SST和WED中存在） -->
          <a-button
            v-if="category == 'RA' || category == 'RS' || category == 'ASQ'"
            @click="showBulkUpload"
            >批量上传
          </a-button>
          <!-- 添加题目按钮 -->
          <a-button type="primary" @click="showAddModal">添加</a-button>
          <!-- 添加题目模态框 -->
          <!-- <AddSSTModal></AddSSTModal> -->
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->

      <!-- 批量上传模态框 start -->
      <a-modal
        v-model:visible="bulkUpload.visible"
        title="批量上传"
        centered
        okText="上传"
        @ok="clickBulkUpload"
        @cancel="cancelBulkUpload"
      >
        <!-- 批量上传 -->
        <a-upload
          v-model:fileList="bulkUpload.fileList"
          :beforeUpload="beforeBulkUpload"
          @change="bulkUploadChange"
        >
          <a-button> <upload-outlined /> 选择文件 </a-button>
        </a-upload>
        <!-- 说明提示 -->
        <a-alert type="info" show-icon style="margin-top: 10px">
          <template #message>
            <p style="margin: 0px">
              说明：<br />1. 文件格式必须是xls、xlsx <br />2.
              单词字段对应列数据不能为空
            </p>
          </template>
        </a-alert>
        <!-- 模板下载 -->
        <p style="margin-top: 5px">
          模版下载：
          <a-button type="link">
            <a :href="downloadTemplateUrl">题库SST.xlsx</a>
          </a-button>
        </p>
      </a-modal>
      <!-- 批量上传模态框 end -->

      <!-- 题目列表 start -->
      <a-table
        bordered
        :columns="category == 'DI' ? questionColumns2 : questionColumns"
        :data-source="questionList"
        row-key="id"
        :loading="isLoading"
        :pagination="questionPagination"
        @change="changePagenum"
      >
        <template #pics="{ record }">
          <img :src="item" v-for="(item, index) in record.pics" :key="index" />
        </template>
        <!-- 题目标签选择器 start -->
        <template #labels="{ record }">
          <!-- 设置标签时，将 题目id和选中标签 传给功能函数 -->
          <a-select
            v-model:value="record.labels"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择标签，最多可以选择3项"
            option-label-prop="label"
            @change="setLabels(record.id, record.category, record.labels)"
          >
            <!-- 渲染所有标签 -->
            <a-select-option
              :value="item.name"
              :label="item.name"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
        <!-- 题目标签选择器 end -->

        <!-- 题目操作区 start -->
        <template #operation="{ record }">
          <a-button type="primary" size="small" @click="showGetModal(record.id)"
            >查看</a-button
          >
          <!-- 上传音频按钮-->
          <UploadAudioBtn :id="record.id"></UploadAudioBtn>
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            style="margin-left: 10px"
            >编辑</a-button
          >
          <a-popconfirm
            title="确定删除这个题目吗？"
            @confirm="delQuestion(record.id)"
            @cancel="cancelDelQuestion"
          >
            <a-button type="danger" style="margin-left: 10px" size="small">
              删除
            </a-button>
          </a-popconfirm>
        </template>
        <!-- 题目操作区 end -->
        <!-- 题目列表 end -->
      </a-table>
      <!-- 查看模态框 -->
      <GetRAModal :getModalVisible="getModalVisible" />
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入上传音频按钮组件
import UploadAudioBtn from "@/components/Question/UploadAudioBtn";
// 引入icons图标
import { UploadOutlined } from "@ant-design/icons-vue";

// 引入 查看ra题目模态框
import GetRAModal from "@/components/Question/RA/GetRA";
// 引入 添加sst题目模态框
import AddSSTModal from "@/components/Question/SST/AddSST";

// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
// 导入 获取题目列表
import { useGetQuestion } from "./useGetQuestion";
// 导入 获取 全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";
// 导入 设置题目标签功能
import { useSetLabels } from "./useSetLabels";
// 导入 打开批量上传模态框的功能
import { useBulkUpload } from "./useBulkUpload";
// 导入 模板下载功能
import { useDownloadTemplate } from "./useDownloadTemplate";
// 导入 显示查看题目模态框 功能
import { useShowGetModal } from "./useShowGetModal";
// 导入 显示添加题目模态框 功能
import { useShowAddModal } from "./useShowAddModal";
// 导入 删除题目功能
import { useDelQuestion } from "./useDelQuestion";

export default {
  // setup响应api入口
  setup() {
    // 渲染题目列表
    const {
      questionPagination,
      category,
      labelId,
      getQuestion,
      questionList,
      isLoading,
      changePagenum,
    } = useGetQuestion();

    // 获取全部标签类型
    const { labelList } = useGetLabels();

    // 题目列表 列配置
    const { questionColumns, questionColumns2 } = useQuestionColumns();

    // 设置 题目标签
    const { setLabels } = useSetLabels(labelList);

    // 批量上传 功能
    const {
      bulkUpload,
      showBulkUpload,
      bulkUploadChange,
      beforeBulkUpload,
      clickBulkUpload,
      cancelBulkUpload,
    } = useBulkUpload();

    // 模板下载功能
    const { downloadTemplateUrl } = useDownloadTemplate(category);

    // 显示查看模态框 功能
    const { getModalVisible, showGetModal } = useShowGetModal(category);

    // 显示添加模态框 功能
    const { showAddModal } = useShowAddModal(category);

    // 删除题目 功能
    let { delQuestion, cancelDelQuestion } = useDelQuestion(getQuestion);

    // 返回
    return {
      //#region 渲染表格
      // 分页器配置
      questionPagination,
      // 当前题目分类
      category,
      // 当前选择的标签筛选
      labelId,
      // 所有标签
      labelList,
      // 题目列配置
      questionColumns,
      questionColumns2,
      // 获取题目列表
      getQuestion,
      // 题目列表
      questionList,
      // 加载状态
      isLoading,
      // 跳转页码时
      changePagenum,
      // 设置题目标签
      setLabels,
      //#endregion

      //#region 批量上传功能
      // 批量上传模态框
      bulkUpload,
      // 打开批量上传模态框
      showBulkUpload,
      // 批量上传文件改变时
      bulkUploadChange,
      // 文件上传前（阻止默认上传）
      beforeBulkUpload,
      // 点击上传
      clickBulkUpload,
      // 取消上传
      cancelBulkUpload,
      //#endregion

      //#region 模板下载功能
      downloadTemplateUrl,
      //#endregion

      //#region 显示查看模态框功能
      // 查看模态框的显示隐藏
      getModalVisible,
      // 显示查看模态框
      showGetModal,
      //#endregion

      //#region 显示添加模态框功能
      showAddModal,
      //#endregion

      //#region 删除题目功能
      delQuestion,
      // 取消删除
      cancelDelQuestion,
      //#endregion
    };
  },
  // 使用组件
  components: {
    // 面包屑
    Crumbs,
    // 上传音频按钮组件
    UploadAudioBtn,
    // 上传图标
    UploadOutlined,
    // 查看RA题目模态框
    GetRAModal,
    // 添加SST题目模态框
    AddSSTModal,
  },
};
</script>

<style lang="scss" scoped></style>