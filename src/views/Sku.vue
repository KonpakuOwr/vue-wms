<template>
  <div>
    <div>
      <!--    头部按钮组件-->
      <el-button
          type="primary"
          @click='handleAdd'
          size="medium"
          icon="el-icon-plus">
        新增
      </el-button>
      <!--      编辑选择-->
      <el-button
          @click='onSelect'
          size="medium"
          icon="el-icon-edit-outline">
      </el-button>
      <el-button v-if="isSelect"
                 type="danger"
                 @click='handleDelete'
                 size="medium"
                 icon="el-icon-close">
        删除
      </el-button>
    </div>
    <div>
      <!--    表格组件-->
      <el-table
          :data="skuPageData.records"
          stripe
          border
          highlight-current-row
          @current-change="clickRow"
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <el-table-column v-if="isSelect"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column
            prop="skuId"
            label="SKUID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="skuName"
            label="SKU名"
            width="200">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!--    分页组件-->
      <el-pagination
          background
          @current-change="getPage"
          layout="prev, pager, next, jumper"
          :total="this.skuPageData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sku",
  data(){
    return {
      // 表格数据
      skuPageData: {},
      // 已选择行
      selectData: [],
      // 是否进入选择
      isSelect: false
    }
  },
  methods:{
    // 跳转到新增表单
    handleAdd(){
      this.$router.push({name: 'skuForm', params: {method: 'add'}});
    },
    // 点击删除
    handleDelete(){
      axios.delete('/skus', {data: this.selectData}).then(
          (response)=>{
            console.log(response)
          },
          (error)=>{
            console.log(error);
          }
      )
      // 刷新数据
      this.getPage();
      // 隐藏删除按钮
      this.onSelect();
    },
    // 点击选择按钮
    onSelect(){
      this.isSelect = !this.isSelect;
    },
    // 点击行
    clickRow(thisRow){
      // 进入查看行的页
      this.$router.push({name: 'skuForm', params: {method: 'check', data: thisRow}});
    },
    // 点击选择框
    handleSelectionChange(val){
      console.log(val)
      this.selectData = val;
    },
    // 获取分页数据
    getPage(val=1){
      axios.get(`/skus/${val}`).then(
          response=>{
            // 写入缓存
            this.skuPageData = response.data.data;
          },
          error=>{
            console.log(error);
          }
      )
    },
  },
  mounted() {
    this.getPage();
  }
}
</script>

<style scoped>

</style>
