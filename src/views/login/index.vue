<template>
  <div class="container-login">
    <el-card class="box-card">
      <div>
        <img src="../../assets/logo_index.png" alt />
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
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
          <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-login",
  data() {
    //自定义校验函数
    const checkMobile = (rule, value, callback) => {
      //rule没有用，但是必须写，value是待校验的数据，callback是校验完毕后的回调函数，校验正确不传参，不正确传错误对象
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号不正确"));
      }
    };
    return {
      loginForm: {
        mobile: "",
        code: ""
      },
      loginRules: {
        mobile: [
          //必填项校验，因为有多重校验，所以需要一个数组
          { required: true, message: "请输入手机号", trigger: "blur" },
          //自定义校验手机号码,validator配置是用来做自定义校验的，这个配置的值为一个校验的函数
          { validator: "checkMobile", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          //输入字符长度为6位数
          { len: 6, message: "验证码是6位数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击提交时，需要验证整个表单是否符合要求
    login() {
      //this.$refs.loginForm获取表单实例，然后才能调用实例上封装的方法，来判断表单里面所有的内容是否验证成功
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post(
              "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
              this.loginForm
            )
            .then(res => {
              this.$router.push("/");
            })
            .catch(e => {
              this.$message.error("手机或验证码错误");
            });
        }
      });
    }
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