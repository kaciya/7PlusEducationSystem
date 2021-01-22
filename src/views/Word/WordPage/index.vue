<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '词库管理' }, { name: '词库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 查询输入框 start -->
      <div class="query-box">
        <a-form :model="wordModel" ref="wordRef">
          <a-row>
            <!-- 输入搜索 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="7">
                  <span>输入搜索：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="wordKey">
                    <a-input
                      placeholder="单词 / 类目"
                      v-model:value="wordModel.wordKey"
                      type="userName"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 用户名称 end -->
            <!-- ID end -->
            <a-col :span="3" :offset="14">
              <a-row>
                <!-- 查询按钮 start -->
                <a-col :span="12">
                  <a-button type="primary" @click="getWord"> 查询 </a-button>
                </a-col>
                <!-- 查询按钮 end -->
                <!-- 重置按钮 start -->
                <a-col :span="12">
                  <a-button @click="resetWord">重置</a-button>
                </a-col>
                <!-- 重置按钮 start -->
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 查询输入框 end -->
      <!-- 页头 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="数据列表"
      >
        <template #extra>
          <a-button @click="delWords" v-has="'word:delete'">
            批量删除
          </a-button>
          <!-- 批量导入组件 -->
          <span v-has="'word:import'">
            <Batch-upload :uploadFile="uploadFile"></Batch-upload>
          </span>

          <a-button @click="addWord" v-has="'word:edit'"> 导入单词 </a-button>
        </template>
      </a-page-header>
      <!-- 表格 -->
      <a-table
        bordered
        :columns="columns"
        :data-source="wordData.data"
        :row-key="record => record.id"
        :pagination="wordPagination"
        :row-selection="{
          selectedRowKeys: wordKeys,
          onChange: onSelectChange
        }"
        @change="onTableChange"
      >
        <!-- 操作 -->
        <template #operation="{ record }">
          <!-- 编辑按钮 modify-btn:改变按钮颜色(黄色) -->
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            @click="editWord(record)"
            v-has="'word:edit'"
          >
            修改
          </a-button>
          <!-- 删除按钮 传id进行删除-->
          <!-- 气泡确认框 -->
          <a-popconfirm
            title="您确定要删除这个单词吗？"
            @confirm="delWord(record.id)"
          >
            <a-button
              type="danger"
              size="small"
              class="delete"
              v-has="'word:delete'"
            >
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <!-- 主体Main end -->
    <!-- 添加模态框 start -->
    <a-modal
      title="导入单词"
      v-model:visible="addVisible"
      @ok="addOK"
      :maskClosable="false"
      :afterClose="addEmpty"
    >
      <a-form
        :model="addModel"
        :rules="addRules"
        ref="addRef"
        :label-col="{ span: 4 }"
      >
        <!-- 所属类目 -->
        <a-form-item
          label="所属类目"
          required
          :wrapper-col="{ span: 18 }"
          name="wordCategory"
        >
          <!-- 下拉选择器 -->
          <a-select
            v-model:value="addModel.wordCategory"
            placeholder="请选择所属类目"
          >
            <a-select-option
              v-for="item in categoryData.data"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 单词 -->
        <a-form-item
          label="单词"
          required
          :wrapper-col="{ span: 18 }"
          name="wordName"
        >
          <a-input v-model:value="addModel.wordName" placeholder="请输入单词" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加模态框end -->
    <!-- 修改模态框start -->
    <a-modal
      title="修改单词"
      v-model:visible="editVisible"
      :afterClose="editEmpty"
      @ok="editOk"
      :maskClosable="false"
    >
      <a-form
        :model="editModel"
        :rules="addRules"
        ref="editRef"
        :label-col="{ span: 4 }"
      >
        <!-- 所属类目 -->
        <a-form-item
          label="所属类目"
          required
          :wrapper-col="{ span: 18 }"
          name="wordCategory"
        >
          <!-- 下拉选择器 -->
          <a-select
            v-model:value="editModel.wordCategory"
            placeholder="请选择所属类目"
          >
            <a-select-option
              v-for="item in categoryData.data"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 单词 -->
        <a-form-item
          label="单词"
          required
          :wrapper-col="{ span: 18 }"
          name="wordName"
        >
          <a-input
            v-model:value="editModel.wordName"
            placeholder="请输入单词"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改模态框end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 表格columns
import { useWordColumns } from "./useWordColumns";
// 获取（查询）数据
import { useGetWord } from "./useGetWord";
//重置
import { useResetWord } from "./useResetWord";
//导入单词
import { useAddWord } from "./useAddWord";
// 添加所属类目数据
import { useGetCategory } from "../WordCategory/useGetCategory";
// 删除
import { useDelWord } from "./useDelWord";
// 修改
import { useEditWord } from "./useEditWord";
//批量导入组件
import BatchUpload from "@/components/BatchUpload";
// 批量上传参数
import { useBulkUpload } from "./useBatchUpload";
export default {
  // 使用组件
  components: {
    Crumbs,
    BatchUpload
  },
  // setup响应api入口
  setup() {
    // 表格columns
    const { columns } = useWordColumns();
    //获取（查询）数据
    const {
      wordModel, // 表格model
      wordData, // 表格数据
      wordPagination, //分页配置项
      onTableChange, //页码改变的回调
      getWord, //查询
      getWordData //获取后台数据
    } = useGetWord();
    // 重置
    const { wordRef, resetWord } = useResetWord(getWordData, wordPagination);
    // 导入单词
    const {
      addVisible, // 控制模态框显示隐藏
      addWord, // 点击导入单词事件
      addModel, //表单model
      addOK, //点击确定事件
      addRules, //表单rules
      addRef, //表单ref
      addEmpty // 模态框关闭事件
    } = useAddWord(getWordData);
    // 添加所属类目数据
    const { categoryData } = useGetCategory();
    // 删除
    const {
      delWord, //删除单个
      wordKeys, //多选数据
      onSelectChange, //多选触发事件
      delWords //批量删除
    } = useDelWord(getWordData);
    // 编辑
    const {
      editVisible, //控制修改框显示隐藏
      editWord, // 点击修改事件
      editModel, //输入框model
      editRef, // 输入框ref
      editOk, //点击确定事件
      editEmpty // 模态框关闭事件
    } = useEditWord(getWordData);
    //#region 批量上传
    const { uploadFile } = useBulkUpload(getWordData);
    //#endregion
    return {
      //#region 获取（查询）数据
      wordModel,
      wordData,
      columns,
      wordPagination,
      onTableChange,
      getWord,
      getWordData,
      //#endregion
      //#region 重置
      wordRef,
      resetWord,
      //#endregion
      //#region 导入单词
      addVisible,
      addWord,
      addModel,
      addOK,
      addRules,
      addRef,
      addEmpty,
      //#endregion
      //#region 下拉菜单类目
      categoryData,
      //#endregion
      //#region 删除
      delWord,
      delWords,
      wordKeys,
      onSelectChange,
      //#endregion
      //#region 修改
      editVisible,
      editWord,
      editModel,
      editRef,
      editOk,
      editEmpty,
      //#endregion
      //#region 批量导入数据
      uploadFile
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped>
// 查询输入框样式 start
.query-box {
  margin-bottom: 15px;
  border: 1px solid #ddd;

  .ant-form > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
}
// 查询输入框样式 end
// 删除按钮
.delete {
  margin-left: 10px;
}
</style>
