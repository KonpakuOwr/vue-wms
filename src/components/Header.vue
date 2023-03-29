<template>
  <div>
    <div class="head-content">
      <div class="left-content">
        <el-button
            @click="handleMenu()"
            type="primary"
            icon="el-icon-menu"
            size="mini" plain>
        </el-button>
        <el-breadcrumb separator="/">
<!--          未解决面包屑重复点击的路由问题-->
          <el-breadcrumb-item
              v-for="item in tableList"
              :key="item.path"
              @click="handleTest"
              :to="{ path: item.path }">
            {{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right-content">
        <el-dropdown class="user-menu">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleTest(){
      console.log('Test')
    }
  },
  computed: {
    tableList() {
      return this.$store.state.tab.tableList;
    }
  }
}
</script>

<style scoped lang="less">
.head-content{
  padding: 0 20px;
  background-color:#333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item{
    .el-breadcrumb__inner {
      &.is-link {
        color: #666;
      }
      &:last-child{
        color: white;
      }
    }
  }
}
.head-title{
  font-size: 14px;
  margin-left: 10px;
  color: #ffffff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.user-menu{
  margin-right: 20px
}
</style>
