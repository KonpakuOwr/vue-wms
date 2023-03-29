<template>
  <div id="Meue" style="height:100%">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <h3 class="menu-title">{{isCollapse?'菜单':'WMS系统'}}</h3>
      <el-menu-item v-for="item in noChildList"
                    :key="item.pathName"
                    @click="clickMenu(item)"
                    :index="item.pathName">
        <i class="el-icon-s-home"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildList"
                    :key='item.pathName'
                    :index="item.pathName">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="childItem in item.child"
                      :key="childItem.path"
                      :index="childItem.path"
                      @click="clickMenu(childItem)">
          <i class="el-icon-s-home"></i>
          <span>{{childItem.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data(){
    return {
      noChildList:[
        {
          path: '/main/home',
          pathName: 'home',
          name: '首页',
        }
      ],
      hasChildList: [
        {
          pathName: 'material_msg',
          name: '库存管理',
          child: [
            {
              path: '/main/material',
              pathName: 'material',
              name: '库存信息'
            },
            {
              path: '/main/storage',
              pathName: 'storage',
              name: '库位信息'
            },
            {
              path: '/main/spu',
              pathName: 'spu',
              name: 'SPU信息'
            },
            {
              path: '/main/sku',
              pathName: 'sku',
              name: 'SKU信息'
            },
          ]
        },
        {
          pathName: 'receipt_msg',
          name: '收货管理',
          child: [
            {
              path: '/main/receipt',
              pathName: 'receipt',
              name: '收货单信息'
            }
          ]
        },
        {
          pathName: 'issue_msg',
          name: '出货管理',
          child: [
            {
              path: '/main/issue',
              pathName: 'issue',
              name: '出货单信息'
            }
          ]
        },
        {
          pathName: 'warehouse_msg',
          name: '仓库信息管理',
          child: [
            {
              path: '/main/user',
              pathName: 'user',
              name: '用户管理'
            },
            {
              path: '/main/supplier',
              pathName: 'supplier',
              name: '供货商管理'
            },
            {
              path: '/main/warehouse',
              pathName: 'warehouse',
              name: '仓库管理'
            }
          ]
        }
      ]
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    }
  },
  methods:{
    handleOpen(){
      console.log('打开事件');
    },
    handleClose(){
      console.log('关闭事件');
    },
    clickMenu(menuItem){
      // 防止重复跳转 条件: 1.路径相同 2.重定向后路径相同
      if (this.$route.path !== menuItem.path) {
        this.$router.push(menuItem.path);
      }
      this.$store.commit('addBreadMenu', menuItem)
    }
  }
}
</script>

<style scoped lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    border-right:none;
    height: 100vh;
    .menu-title{
      color:#ffffff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>
