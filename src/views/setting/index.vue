<template>
  <div class="container-setting">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <!-- 表单 -->
            <el-form label-width="120px">
              <el-form-item label="编号:">{{user.id}}</el-form-item>
              <el-form-item label="手机号:">{{user.mobile}}</el-form-item>
              <!-- <el-form-item label="媒体名称:">
                <el-input placeholder="请输入媒体名称" v-model="user.name"></el-input>
              </el-form-item>-->
              <el-form-item label="媒体名称：">
                <el-input v-model="user.name" placeholder="请输入媒体名称"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                <el-input placeholder="请输入媒体介绍" type="textarea" :rows="3" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input placeholder="请输入邮箱" v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="saveSetting" type="primary">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <!-- 上传头像 -->
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :http-request="uploadAvatar"
            >
              <img v-if="user.photo" :src="user.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="text">修改头像</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
import auth from "@/utils/auth.js";
export default {
  name: "page-setting",
  data() {
    return {
      user: {
        id: "",
        mobile: "",
        name: "",
        intro: "",
        email: "",
        photo: "",
      },
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    //自定义上传图片
    async uploadAvatar({ file }) {
      try {
        const formData = new FormData();
        formData.append("photo", file);
        const res = await this.$http.patch("user/photo", formData);
        this.$message.success("上传图片成功");
        //预览图片
        this.user.photo = res.data.data.photo;
        //同步头像到Layout组件
        eventBus.$emit("updateUserPhoto", this.user.photo);
        //同步头像到本地
        const localUser = auth.getUser();
        localUser.photo = this.user.photo;
        auth.setUser(localUser);
      } catch (err) {
        this.$message.error("上传头像失败");
      }
    },
    async saveSetting() {
      try {
        //获取编辑的时候需要的三个字段
        const { name, intro, email } = this.user;
        //发起编辑请求
        await this.$http.patch("user/profile", { name, intro, email });
        //提示编辑资料成功
        this.$message.success("保存设置成功");
        //   同步用户名称到layout组件
        eventBus.$emit("updateUserName", name);
        //同步数据到本地存储 获取信息，修改信息，保存信息
        const localUser = auth.getUser();
        localUser.name = name;
        auth.setUser(localUser);
      } catch (err) {
        if (err.response && err.response.status === 409) {
          this.$message.error("媒体名称已存在");
        } else {
          this.$message.error("保存设置失败");
        }
      }
    },
    async getUserProfile() {
      const res = await this.$http.get("user/profile");
      this.user = res.data.data;
    },
  },
};
</script>

<style>
.text {
  text-align: center;
  font-size: 12px;
}
</style>