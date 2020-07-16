<template>
  <div class="container-login">
    <el-card class="box-card">
      <div>
        <img src="../../assets/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-login",
  data() {
    return {
      loginForm: {
        mobile: "",
        code: ""
      },
      loginRules: {
        mobile: [
          //必填项校验，因为有多重校验，所以需要一个数组
          { required: true, message: "请输入手机号", trigger: "blur" },
          {}
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          //输入字符长度为6位数
          { len: 6, message: "验证码是6位数", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style scoped lang='less'>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center/cover;
  .box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>