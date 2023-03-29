<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户ID" prop="userName">
        <span>{{form.userId}}</span>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-if="method !== 'check'" v-model="form.userName"></el-input>
        <span v-if="method === 'check'">{{form.userName}}</span>
      </el-form-item>
      <el-form-item label="用户权限" prop="userLevel">
        <el-select v-if="method !== 'check'" v-model="form.userLevel" placeholder="请选择用户等级">
          <el-option v-for="item in userLevelList" :key="item.levelId"
                     :label="item.levelName"
                     :value="item.levelId">
          </el-option>
        </el-select>
        <span v-if="method === 'check'">{{form.userLevel}}</span>
      </el-form-item>
      <el-form-item v-if="method !== 'check'">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-if="method === 'check'">
        <el-button type="primary" @click="method = 'edit'">编辑</el-button>
        <el-button @click="$router.back()">后退</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserForm",
  data() {
    return {
      form: {
        userId: '',
        userName: '',
        userLevel: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        userLevel:[
          { required: true, message: '请选择用权限等级', trigger: 'change' }
        ]
      },
      method: ''
    }
  },
  computed:{
    userLevelList(){
      return this.$store.state.user.userLevelList;
    }
  },
  methods: {
    // 点击提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        // valid校验成功返回true, 否则为false
        if (valid) {
          if (this.method === 'add') {
            axios.post('/users', this.form).then(
                (response) => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
            )
            this.$router.back();
          }else if(this.method === 'edit'){
            axios.put('/users', this.form).then(
                (response) => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
            )
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
    this.method = this.$route.params.method;
    let data = this.$route.params.data;
    // 如果是查看, 则渲染数据
    if(this.method === 'check'){
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
