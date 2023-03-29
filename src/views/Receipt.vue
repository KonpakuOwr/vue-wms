<template>
  <div>
    <div>
<!--      新增按钮-->
      <el-button
          type="primary"
          @click='handleAdd'
          size="medium"
          icon="el-icon-plus">
        新增
      </el-button>
<!--      选择按钮-->
      <el-button
          @click='onSelect'
          size="medium"
          icon="el-icon-edit-outline">
      </el-button>
<!--      删除按钮, 仅当选择启动后显示-->
      <el-button v-if="isSelect"
                 type="danger"
                 @click='handleDelete'
                 size="medium"
                 icon="el-icon-close">
        删除
      </el-button>
    </div>
    <div>
      <el-table
          :data="receiptNotePageData.records"
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
            prop="receiptId"
            label="收货单ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="supplierId"
            label="供应商ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="warehouseId"
            label="仓库ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="创建者ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="receiptTime"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="receiptState"
            label="收货单状态"
            width="200">
        </el-table-column>
      </el-table>
    </div>
    <div>
<!--      分页组件-->
      <el-pagination
          background
          @current-change="getPage"
          layout="prev, pager, next, jumper"
          :total="this.receiptNotePageData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Receipt",
  data(){
    return {
      receiptNotePageData: {},
      selectData: [],
      isSelect: false
    }
  },
  methods:{
    // 跳转到新增用户页面
    handleAdd(){
      this.$router.push({name: 'receiptForm', params: {method: 'add'}});
    },
    onSelect(){
      this.isSelect = !this.isSelect;
    },
    // 点击行事件
    clickRow(thisRow){
      // 进入查看行的页
      this.$router.push({name: 'receiptForm', params: {method: 'check', data: thisRow}});
    },
    // 选择框事件: 返回选中的的项列表
    handleSelectionChange(val){
      this.selectData = val;
    },
    // 分页获取
    getPage(val=1){
      axios.get(`/receipt_notes/${val}`).then(
          response=>{
            // 分页查询数据
            this.receiptNotePageData = response.data.data;
          },
          error=>{
            console.log(error);
          }
      )
    },
    // 列表项删除
    handleDelete(){
      axios.delete('/receipt_notes', {data: this.selectData}).then(
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
    }
  },
  mounted() {
    this.getPage();
  }
}
</script>

<style scoped>

</style>
