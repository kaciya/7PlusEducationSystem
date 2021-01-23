<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '听力题库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px">
      <!-- 题型选择 start -->
      <a-radio-group
        v-model:value="category"
        button-style="solid"
        @change="getQuestion(true)"
      >
        <a-radio-button value="SST">SST（录音总结）</a-radio-button>
        <a-radio-button value="WFD">WFD（听写句子）</a-radio-button>
        <a-radio-button value="FIB">FIB（听力填空）</a-radio-button>
        <a-radio-button value="MCS">MCS（听力单选）</a-radio-button>
        <a-radio-button value="MCM">MCM（听力多选）</a-radio-button>
        <a-radio-button value="HCS">HCS（摘要选择）</a-radio-button>
        <a-radio-button value="SMW">SMW（补全对话）</a-radio-button>
        <a-radio-button value="HIW">HIW（识别错词）</a-radio-button>
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
          <!-- 导出按钮 -->
          <ExportBtn :questionType="1" :category="category"></ExportBtn>
          <span v-has="'question:listen:import'">
            <!-- 批量上传组件 -->
            <BatchUpload :uploadFile="bulkUpload"></BatchUpload>
          </span>
          <!-- 添加题目按钮 -->
          <a-button
            type="primary"
            @click="showAddModal"
            v-has="'question:listen:edit'"
            >添加</a-button
          >
          <!-- 添加题目模态框 start -->
          <AddSSTModal :addModalVisible="addModalVisible"></AddSSTModal>
          <AddWFDModal :addModalVisible="addModalVisible"></AddWFDModal>
          <AddFIBModal :addModalVisible="addModalVisible"></AddFIBModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="mcs"
          ></AddMCSModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="smw"
          ></AddMCSModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="hcs"
          ></AddMCSModal>
          <AddMCMModal :addModalVisible="addModalVisible"></AddMCMModal>
          <AddHIWModal :addModalVisible="addModalVisible"></AddHIWModal>
          <!-- 添加题目模态框 end -->
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->

      <!-- 题目列表 start -->
      <a-table
        bordered
        :columns="questionColumns"
        :data-source="questionList"
        row-key="id"
        :loading="isLoading"
        :pagination="questionPagination"
        @change="changePagenum"
      >
        <template #titleAudio="{ text }">
          <a-tooltip placement="bottomLeft">
            <template #title>
              {{ text }}
            </template>
            {{ text }}
          </a-tooltip>
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
            v-has="'question:listen:detail'"
            >查看</a-button
          >
          <!-- 上传音频按钮-->
          <span v-has="'question:listen:edit'">
            <UploadAudioBtn :id="record.id"></UploadAudioBtn>
          </span>
          <a-button
            type="primary"
            style="margin-left: 10px"
            class="modify-btn"
            size="small"
            @click="showEditModal(record.id)"
            v-has="'question:listen:edit'"
            >编辑</a-button
          >
          <a-popconfirm
            placement="topRight"
            title="确定删除这个题目吗？"
            @confirm="delQuestion(record.id)"
            @cancel="cancelDelQuestion"
          >
            <a-button
              type="danger"
              style="margin-left: 10px"
              size="small"
              v-has="'question:delete'"
              >删除</a-button
            >
          </a-popconfirm>
        </template>
        <!-- 题目操作区 end -->
      </a-table>
      <!-- 题目列表 end -->

      <!-- 编辑题目模态框 start -->
      <!-- 编辑sst -->
      <EditSSTModal :editModalVisible="editModalVisible"></EditSSTModal>
      <!-- 编辑wfd -->
      <EditWFDModal :editModalVisible="editModalVisible"></EditWFDModal>
      <!-- 编辑fib -->
      <EditFIBModal :editModalVisible="editModalVisible"></EditFIBModal>
      <!-- 编辑mcm -->
      <EditMCMModal :editModalVisible="editModalVisible"></EditMCMModal>
      <!-- 编辑mcs -->
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="mcs"
      ></EditMCSModal>
      <!-- 编辑smw -->
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="smw"
      ></EditMCSModal>
      <!-- 编辑hcs -->
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="hcs"
      ></EditMCSModal>
      <!-- 编辑hiw -->
      <EditHIWModal :editModalVisible="editModalVisible"></EditHIWModal>
      <!-- 编辑题目模态框 end -->

      <!-- 查看题目模态框 start -->
      <!-- 查看sst -->
      <GetSSTModal :getModalVisible="getModalVisible"></GetSSTModal>
      <!-- 查看wfd -->
      <GetWFDModal :getModalVisible="getModalVisible"></GetWFDModal>
      <!-- 查看fib -->
      <GetFIBModal :getModalVisible="getModalVisible"></GetFIBModal>
      <!-- 查看mcm -->
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="mcm"
      ></GetMCSModal>
      <!-- 查看mcs -->
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="mcs"
      ></GetMCSModal>
      <!-- 查看smw -->
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="smw"
      ></GetMCSModal>
      <!-- 查看hcs -->
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="hcs"
      ></GetMCSModal>
      <!-- 查看hiw -->
      <GetHIWModal :getModalVisible="getModalVisible"></GetHIWModal>
      <!-- 查看题目模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入上传音频按钮组件
import UploadAudioBtn from "@/components/Question/UploadAudioBtn";
// 引入批量上传按钮组件
import BatchUpload from "@/components/BatchUpload";
// 引入导出按钮组件
import ExportBtn from "@/components/Question/ExportBtn";

//#region 添加题目模态框
// 引入 添加sst题目模态框
import AddSSTModal from "@/components/Question/SST/AddSST";
// 引入 添加wfd题目模态框
import AddWFDModal from "@/components/Question/WFD/AddWFD";
// 引入 添加fib题目模态框
import AddFIBModal from "@/components/Question/FIB/AddFIB";
// 引入 添加mcs、smw、hcs题目模态框
import AddMCSModal from "@/components/Question/MCS/AddMCS";
// 引入 添加mcm题目模态框
import AddMCMModal from "@/components/Question/MCM/AddMCM";
// 引入 添加hiw题目模态框
import AddHIWModal from "@/components/Question/HIW/AddHIW";
//#endregion

//#region 编辑题目模态框
// 引入 编辑sst题目模态框
import EditSSTModal from "@/components/Question/SST/EditSST";
// 引入 编辑wfd题目模态框
import EditWFDModal from "@/components/Question/WFD/EditWFD";
// 引入 编辑fib题目模态框
import EditFIBModal from "@/components/Question/FIB/EditFIB";
// 引入 编辑mcm题目模态框
import EditMCMModal from "@/components/Question/MCM/EditMCM";
// 引入 编辑mcs、smw、hcs题目模态框
import EditMCSModal from "@/components/Question/MCS/EditMCS";
// 引入 编辑hiw题目模态框
import EditHIWModal from "@/components/Question/HIW/EditHIW";
//#endregion

//#region 查看题目模态框
// 引入 查看wfd题目模态框
import GetWFDModal from "@/components/Question/WFD/GetWFD";
// 引入 查看fib题目模态框
import GetFIBModal from "@/components/Question/FIB/GetFIB";
// 引入 查看mcs、mcm、smw、hcs题目模态框
import GetMCSModal from "@/components/Question/MCS/GetMCS";
// 引入 查看hiw题目模态框
import GetHIWModal from "@/components/Question/HIW/GetHIW";
// 引入 查看sst题目模态框
import GetSSTModal from "@/components/Question/SST/GetSST";
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
// 导入 显示添加题目模态框 功能
import { useShowModal } from "./useShowModal";
// 导入 删除题目功能
import { useDelQuestion } from "./useDelQuestion";

export default {
  // setup响应api入口
  setup() {
    // 渲染题目列表
    let {
      questionPagination,
      category,
      labelId,
      getQuestion,
      questionList,
      isLoading,
      changePagenum
    } = useGetQuestion();

    // 获取全部标签类型
    let { labelList } = useGetLabels();

    // 题目列表 列配置
    let { questionColumns } = useQuestionColumns();

    // 批量上传按钮 配置对象
    const { bulkUpload } = useBulkUpload(category, getQuestion);

    // 设置 题目标签
    let { editLabels } = useEditLabels(labelList, getQuestion);

    // 显示添加、编辑、查看模态框 功能
    let {
      addModalVisible,
      showAddModal,
      editModalVisible,
      showEditModal,
      getModalVisible,
      showGetModal
    } = useShowModal(category, getQuestion);

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
      bulkUpload,
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

      //#region 显示查看模态框功能
      // 查看模态框的显示与隐藏
      getModalVisible,
      // 显示查看模态框
      showGetModal,
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
    // 批量上传按钮组件
    BatchUpload,
    // 导出按钮组件
    ExportBtn,
    //#region 添加题目模态框
    // 添加SST题目模态框
    AddSSTModal,
    // 添加WFD题目模态框
    AddWFDModal,
    // 添加FIB题目模态框
    AddFIBModal,
    // 添加mcs、smw、hcs题目模态框
    AddMCSModal,
    // 添加mcm题目模态框
    AddMCMModal,
    // 添加hiw题目模态框
    AddHIWModal,
    //#endregion

    //#region 编辑题目模态框
    // sst
    EditSSTModal,
    // wfd
    EditWFDModal,
    // fib
    EditFIBModal,
    // mcm
    EditMCMModal,
    // mcs、smw、hcs
    EditMCSModal,
    // hiw
    EditHIWModal,
    //#endregion

    //#region 查看题目模态框
    GetWFDModal,
    GetFIBModal,
    GetMCSModal,
    GetHIWModal,
    GetSSTModal
    //#endregion
  }
};
</script>
