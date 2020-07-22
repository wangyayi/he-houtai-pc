<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="articalTitle.name"></el-input>
        </el-form-item>
        <el-form-item label="内容"></el-form-item>
        <el-form-item label="封面"></el-form-item>
        <el-form-item label="频道"></el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-publish",
  data() {
    return {
      articalTitle: {
        name: ""
      }
    };
  }
};
</script>

<style scoped lang="less">
</style>