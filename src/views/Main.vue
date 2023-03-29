<template>
  <div>
    <Tag></Tag>
    <router-view></router-view>
  </div>
</template>

<script>
import Tag from '../components/Tag'
export default {
  name: "Main",
  components:{
    Tag
  }
}
</script>

<style scoped>

</style>
