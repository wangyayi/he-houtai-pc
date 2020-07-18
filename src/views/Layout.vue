<template>
  <el-container class="container-layout">
    <!-- 左侧区域 -->
    <el-aside :width="isOpen ?'200px':'64px'">
      <!-- logo区域 -->
      <div :class="{'logo':isOpen,'smallLogo':!isOpen}"></div>
      <!-- 导航区域 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <!-- 左侧图标 -->
        <span
          @click="isOpen=!isOpen"
          class="icon"
          :class="{'el-icon-s-fold':isOpen,'el-icon-s-unfold':!isOpen}"
        ></span>

        <!-- 左侧文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右侧下拉组件 -->
        <el-dropdown>
          <span>
            <img class="head" src="../assets/avatar.jpg" alt />
            <span class="name">往事随风</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: "layout",
  data() {
    return {
      isOpen: true
    };
  }
};
</script>

<style lang="less" scoped>
.container-layout {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background-color: #023;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    .smallLogo {
      width: 64px;
      height: 60px;
      background: #002244 url("../assets/logo_admin_01.png") no-repeat
        center/30px auto;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      vertical-align: middle;
      font-size: 24px;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .el-dropdown {
    float: right;
    .head {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .name {
      font-weight: 700;
    }
  }
}
</style>

