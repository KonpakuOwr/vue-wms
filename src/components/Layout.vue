<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>

import Menu from "./Menu";
import Header from "./Header";

export default {
  name: "Layout",
  components: {
    Header,
    Menu,
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>
