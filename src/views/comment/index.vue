<template>
  <div class="container-comment">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column prop="title" label="文章标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'已打开':'已关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100px">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- :page-sizes控制显示选择每页显示的条数数据 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :page-sizes="[10,20,30,40,50]"
        :current-page="reqParams.page"
        @current-change=" pageChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-comment",
  data() {
    return {
      //   评论列表(文章列表，查询的是每篇文章评论相关的信息)
      comments: [],
      //定义一个筛选条件数据
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: "comment",
      },
      total: 0,
    };
  },
  created() {
    //   创建vue实例之后获取评论相关信息
    this.getComments();
  },
  methods: {
    toggleStatus(row) {
      const { id, comment_status } = row;
      const text1 = "此操作会关闭评论功能";
      const text2 = "此操作会打开评论功能";
      const text = row.comment_status ? text1 : text2;
      //确认框

      this.$confirm(text, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$http({
              method: "put",
              url: "comments/status",
              //?后键值对传参
              params: {
                article_id: row.id.toString(),
              },
              //  请求体传参
              data: {
                allow_comment: !row.comment_status,
              },
            });
            this.$message.success(row.comment_status ? "关闭成功" : "打开成功");
            //修改row当前的文章状态，驱动当前数据
            row.comment_status = !comment_status;
          } catch (e) {
            this.$message.error(row.comment_status ? "关闭失败" : "打开失败");
          }
        })
        .catch(() => {});
    },
    //   可以选择每页显示的条数
    sizeChange(size) {
      this.reqParams.page = 1;
      this.reqParams.per_page = size;
      this.getComments();
    },
    //输入页码跳转
    pageChange(newpage) {
      this.reqParams.page = newpage;
      this.getComments();
    },
    async getComments() {
      const res = await this.$http.get("articles", { params: this.reqParams });
      this.comments = res.data.data.results;
      this.total = res.data.data.total_count;
    },
  },
};
</script>

<style>
</style>