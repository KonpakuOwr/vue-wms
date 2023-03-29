<template>
  <div>
    <div>
      <el-button type="primary" @click='handleAdd' size="medium" icon="el-icon-plus">
        新增
      </el-button>
      <!--      编辑选择-->
      <el-button @click='onSelect' size="medium" icon="el-icon-edit-outline">
      </el-button>
      <el-button v-if="isSelect"  @click='handleDelete'
                 size="medium"
                 type="danger"
                 icon="el-icon-close">
        删除
      </el-button>
    </div>
    <div>
      <el-table
          :data="userPageData.records"
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
            prop="userId"
            label="用户ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="用户名"
            width="200">
        </el-table-column>
        <el-table-column
            prop="userLevel"
            label="权限等级"
            :formatter="formatLevel"
            width="200">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
          background
          @current-change="getPage"
          layout="prev, pager, next, jumper"
          :total="this.userPageData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data(){
    return {
      userPageData: {},
      selectData: [],
      isSelect: false
    }
  },
  methods:{
    // 跳转到新增用户页面
    handleAdd(){
      this.$router.push({name: 'userForm', params: {method: 'add'}});
    },
    onSelect(){
      this.isSelect = !this.isSelect;
    },
    // 点击行事件
    clickRow(thisRow){
      // 进入查看行的页
      this.$router.push({name: 'userForm', params: {method: 'check', data: thisRow}});
    },
    // 选择框事件: 返回选中的的项列表
    handleSelectionChange(val){
      this.selectData = val;
    },
    // 分页获取
    getPage(val=1){
      axios.get(`/users/${val}`).then(
          response=>{
            // 分页查询数据
            this.userPageData = response.data.data;
          },
          error=>{
            console.log(error);
          }
      )
    },
    // 格式化userLevel字段
    formatLevel(row){
      let level = this.$store.state.user.userLevelList.find(
          (item)=>{
            return item.levelId === row.userLevel;
          }
      );
      return level.levelName;
    },
    // 列表项删除
    handleDelete(){
      axios.delete('/users', {data: this.selectData}).then(
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
