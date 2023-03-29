<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="物料类型ID" prop="skuName">
        <span>{{form.skuId}}</span>
      </el-form-item>
      <el-form-item label="物料类型名" prop="skuName">
        <el-input v-if="method !== 'check'" v-model="form.skuName"></el-input>
        <span v-else>{{form.skuName}}</span>
      </el-form-item>
      <el-form-item v-if="method !== 'check'">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-else>

        <el-button type="primary" @click="method = 'edit'">编辑</el-button>
        <el-button @click="$router.back()">后退</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WarehouseForm",
  data() {
    return {
      form: {
        skuId: '',
        skuName: '',
      },
      rules: {
        skuName: [
          { required: true, message: '请输入物料类型', trigger: 'blur' },
        ],
      },
      method: ''
    }
  },
  methods: {
    // 点击提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        // valid校验成功返回true, 否则为false
        if (valid) {
          if (this.method === 'add') {
            axios.post('/skus', this.form).then(
                (response) => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
            )
            // 提交后返回表格页面
            this.$router.back();
          }else if(this.method === 'edit'){
            axios.put('/skus', this.form).then(
                (response) => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
            )
            // 更新后返回查看状态
            this.method = 'check';
          }
        }
      })
    },
    onCancel(){
      if(this.method === 'add'){
        this.$router.back();
      }else if(this.method === 'edit'){
        // 如果是编辑取消, 返回到查看状态
        this.method = 'check';
      }
    },
  },
  mounted(){
    // 跳转到Form表单的方式
    this.method = this.$route.params.method;
    if(this.method === 'check'){
      let data = this.$route.params.data;
      this.form = JSON.parse(JSON.stringify(data));
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 20%;
}
.el-select{
  width: 20%;
}
</style>
