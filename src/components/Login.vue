<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">WMS系统</h1>
      <el-form-item>
        <el-row>
          <el-col :span="4">
            <span>账号:</span>
          </el-col>
          <el-col :span="20">
            <el-input type="text" placeholder="用户账号" v-model="username" autocomplete="off">
            </el-input>>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="4">
            <span>密码:</span>
          </el-col>
          <el-col :span="20">
            <el-input type="password" placeholder="用户密码" v-model="password" autocomplete="off">
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
      </el-form-item>
      <el-row style="text-align: center;margin-top: -10px;">
        <el-link type="primary" @click="toRegister">用户注册</el-link>
        <el-link type="primary">忘记密码</el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin:function(){
      let username=this.username;
      let password=this.password;
      /* let params={

      } */
      console.log("username=%s,password=%s",username,password);
    },
    toRegister:function(){
      this.$router.push('/Register');
    }
  }
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image:url("../assets/img/login-bg.jpg");
  /* background-color: #112346; */
  background-size:100% 100%;
  background-attachment:fixed;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
