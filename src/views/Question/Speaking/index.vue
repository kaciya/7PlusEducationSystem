<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '口语题库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px">
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
        v-has="'question:speak:page'"
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
          <!-- 批量上传组件（只在RA、RS和ASQ中存在） -->
          <span v-has="'question:speak:import'"
            ><BatchUpload :uploadFile="uploadFile"
          /></span>
          <!-- 添加题目按钮 -->
          <a-button
            type="primary"
            @click="showAddModal"
            v-has="'question:speak:edit'"
            >添加</a-button
          >
          <!-- 添加题目模态框 -->
          <!-- 添加题目模态框 start -->
          <AddRAModal :addModalVisible="addModalVisible"></AddRAModal>
          <AddRSModal :addModalVisible="addModalVisible"></AddRSModal>
          <AddDIModal :addModalVisible="addModalVisible"></AddDIModal>
          <AddRLModal :addModalVisible="addModalVisible"></AddRLModal>
          <AddASQModal :addModalVisible="addModalVisible"></AddASQModal>
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->

      <!-- 题目列表 start -->
      <a-table
        bordered
        :columns="category == 'DI' ? questionColumns2 : questionColumns"
        :data-source="questionList"
        row-key="id"
        :loading="isLoading"
        :pagination="questionPagination"
        @change="changePagenum"
        v-has="'question:speak:page'"
      >
        <!-- 题目音频 -->
        <template #titleAudio="{ text }">
          <a-tooltip placement="bottomLeft">
            <template #title>
              {{ text }}
            </template>
            {{ text }}
          </a-tooltip>
        </template>
        <!-- 题目图片 -->
        <template #pics="{ record }">
          <img
            :src="item"
            v-for="(item, index) in record.pics"
            :key="index"
            class="describe-img"
          />
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
            @change="editLabels(record.id, record.labels)"
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
          <a-button
            type="primary"
            size="small"
            @click="showGetModal(record.id)"
            v-has="'question:speak:detail'"
            >查看</a-button
          >
          <!-- 上传音频按钮-->
          <span
            ><UploadAudioBtn
              :id="record.id"
              v-has="'question:speak:edit'"
            ></UploadAudioBtn
          ></span>
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            style="margin-left: 10px"
            @click="showEditModal(record.id)"
            v-has="'question:speak:edit'"
            >编辑</a-button
          >
          <a-popconfirm
            title="确定删除这个题目吗？"
            @confirm="delQuestion(record.id)"
            @cancel="cancelDelQuestion"
          >
            <a-button
              type="danger"
              style="margin-left: 10px"
              size="small"
              v-has="'question:speak:delete'"
            >
              删除
            </a-button>
          </a-popconfirm>
        </template>
        <!-- 题目操作区 end -->
        <!-- 题目列表 end -->
      </a-table>
      <!-- 查看模态框 start -->
      <!-- 查看ra -->
      <GetRAModal :getModalVisible="getModalVisible" />
      <!-- 查看rs -->
      <GetRSModal :getModalVisible="getModalVisible" />
      <!-- 查看di -->
      <GetDIModal :getModalVisible="getModalVisible" />
      <!-- 查看rl -->
      <GetRLModal :getModalVisible="getModalVisible" />
      <!-- 查看asq -->
      <GetASQModal :getModalVisible="getModalVisible" />
      <!-- 查看模态框 end -->

      <!-- 编辑模态框 start -->
      <!-- 编辑ra -->
      <EditRAModal :editModalVisible="editModalVisible" />
      <!-- 编辑rs -->
      <EditRSModal :editModalVisible="editModalVisible" />
      <!-- 编辑di -->
      <EditDIModal :editModalVisible="editModalVisible" />
      <!-- 编辑rl -->
      <EditRLModal :editModalVisible="editModalVisible" />
      <!-- 编辑asq -->
      <EditASQModal :editModalVisible="editModalVisible" />
      <!-- 编辑模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入上传音频按钮组件
import UploadAudioBtn from "@/components/Question/UploadAudioBtn";
// 引入批量上传功能组件
import BatchUpload from "@/components/BatchUpload";
// 引入icons图标
import { UploadOutlined } from "@ant-design/icons-vue";

//#region 查看模态框
// 引入 查看ra题目模态框
import GetRAModal from "@/components/Question/RA/GetRA";
// 引入 查看rs题目模态框
import GetRSModal from "@/components/Question/RS/GetRS";
// 引入 查看di题目模态框
import GetDIModal from "@/components/Question/DI/GetDI";
// 引入 查看rl题目模态框
import GetRLModal from "@/components/Question/RL/GetRL";
// 引入 查看asq题目模态框
import GetASQModal from "@/components/Question/ASQ/GetASQ";
//#endregion

//#region 添加题目模态框
// 引入 添加ra题目模态框
import AddRAModal from "@/components/Question/RA/AddRA";
// 引入 添加rs题目模态框
import AddRSModal from "@/components/Question/RS/AddRS";
// 引入 添加di题目模态框
import AddDIModal from "@/components/Question/DI/AddDI";
// 引入 添加rl题目模态框
import AddRLModal from "@/components/Question/RL/AddRL";
// 引入 添加asq题目模态框
import AddASQModal from "@/components/Question/ASQ/AddASQ";
//#endregion

//#region 编辑题目模态框
// 引入 编辑ra题目模态框
import EditRAModal from "@/components/Question/RA/EditRA";
// 引入 编辑rs题目模态框
import EditRSModal from "@/components/Question/RS/EditRS";
// 引入 编辑di题目模态框
import EditDIModal from "@/components/Question/DI/EditDI";
// 引入 编辑rl题目模态框
import EditRLModal from "@/components/Question/RL/EditRL";
// 引入 编辑asq题目模态框
import EditASQModal from "@/components/Question/ASQ/EditASQ";
//#endregion

// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
// 导入 获取题目列表
import { useGetQuestion } from "./useGetQuestion";
// 导入 获取 全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";
// 导入 设置题目标签功能
import { useEditLabels } from "./useEditLabels";
// 导入 打开批量上传模态框的功能
import { useBulkUpload } from "./useBulkUpload";
// 导入 显示查看题目模态框 功能
import { useShowModal } from "./useShowModal";
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
      changePagenum
    } = useGetQuestion();

    // 获取全部标签类型
    const { labelList } = useGetLabels();

    // 题目列表 列配置
    const { questionColumns, questionColumns2 } = useQuestionColumns();

    // 设置 题目标签
    const { editLabels } = useEditLabels(labelList, getQuestion);

    // 批量上传 功能
    const { uploadFile } = useBulkUpload(category, getQuestion);

    // 显示模态框 功能
    const {
      getModalVisible,
      showGetModal,
      addModalVisible,
      showAddModal,
      editModalVisible,
      showEditModal
    } = useShowModal(category);

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
      editLabels,
      //#endregion

      //#region 批量上传功能
      uploadFile,
      //#endregion

      //#region 显示查看模态框功能
      // 查看模态框的显示隐藏
      getModalVisible,
      // 显示查看模态框
      showGetModal,
      //#endregion

      //#region 显示添加模态框功能
      // 添加模态框的显示与隐藏
      addModalVisible,
      // 显示添加模态框
      showAddModal,
      //#endregion

      //#region 显示编辑模态框功能
      // 编辑模态框的显示与隐藏
      editModalVisible,
      // 显示编辑模态框
      showEditModal,
      //#endregion

      //#region 删除题目功能
      delQuestion,
      // 取消删除
      cancelDelQuestion
      //#endregion
    };
  },
  // 使用组件
  components: {
    // 面包屑
    Crumbs,
    // 上传音频按钮组件
    UploadAudioBtn,
    // 批量上传功能组件
    BatchUpload,
    // 上传图标
    UploadOutlined,
    //#region 查看模态框
    // 查看RA题目模态框
    GetRAModal,
    // 查看RS题目模态框
    GetRSModal,
    // 查看DI题目模态框
    GetDIModal,
    // 查看RL题目模态框
    GetRLModal,
    // 查看ASQ题目模态框
    GetASQModal,
    //#endregion

    //#region 添加题目模态框
    // 添加RA题目模态框
    AddRAModal,
    // 添加RS题目模态框
    AddRSModal,
    // 添加DI题目模态框
    AddDIModal,
    // 添加RL题目模态框
    AddRLModal,
    // 添加ASQ题目模态框
    AddASQModal,
    //#endregion

    //#region 编辑题目模态框
    // 编辑RA题目模态框
    EditRAModal,
    // 编辑RS题目模态框
    EditRSModal,
    // 编辑DI题目模态框
    EditDIModal,
    // 编辑RL题目模态框
    EditRLModal,
    // 编辑ASQ题目模态框
    EditASQModal
    // #endregion
  }
};
</script>

<style lang="scss" scoped>
.describe-img {
  width: 100%;
}
</style>
