<template>
  <div>
    <el-tag
        v-for="(tag,index) in breadList"
        :key="tag.path"
        :closable="tag.path !== homePath"
        @click="changeMenu(tag)"
        @close="closeMenu(tag, index)"
        :effect="$route.path === tag.path?'dark':'plain'">
      {{tag.name}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "Tag",
  data(){
    return {
      homePath: this.$store.state.tab.homePath
    }
  },
  computed: {
    breadList() {
      return this.$store.state.tab.breadList;
    }
  },
  methods:{
    // 增加tag
    changeMenu(tag){
      this.$router.push(tag.path);
    },
    // 删除tag
    closeMenu(tag, index){
      this.$store.commit('deleteBreadMenu', index);
      // 如果删除了当前页则
      if(this.$route.path === tag.path){
        this.$router.push(this.homePath);
      }
    }
  },
}
</script>

<style scoped>
.el-tag{
  margin-right: 10px;
}
</style>
