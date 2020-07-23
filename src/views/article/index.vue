<template>
  <div class="container-artical">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 这是v-model的语法糖 -->
          <!-- <my-channel :value="reqParams.channel_id" @input="reqParams.channel_id=$event"></my-channel> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 搜索区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面" height="120px">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:180px;height=120px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" alt style="width:180px;height=120px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="400px"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  //注意，组件取名字的时候不能和原生dom元素的名字一样，不然vue会报错
  name: "page-article",
  // created() {
  //   this.$http
  //     .get("articles")
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
  data() {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        //日期范围开始
        begin_pubdate: null,
        //日期范围结束
        end_pubdate: null,
        //页码
        page: 1,
        //每页条数
        per_page: 20
      },
      //当获取到日期信息之后给begin_pubdate和end_pubdate赋值
      dateArr: [],
      //文章数据数组
      articles: [],
      //频道选项数组

      total: 0
    };
  },
  created() {
    this.getArticles();
  },

  methods: {
    delArticle(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 点击确认，发删除请求
          try {
            // 1. 测试账户的文章数据，后台限制不能删除
            // 2. 请求成功，后台没有响应内容，
            await this.$http.delete(`articles/${id}`);
            this.$message.success("删除文章成功");
            this.getArticles();
          } catch (e) {
            this.$message.error("删除文章失败");
          }
        })
        .catch(() => {
          // 点击取消，没有任何逻辑
        });
    },
    toEdit(id) {
      this.$router.push({ path: "/publish", query: { id } });
    },
    search() {
      this.reqParams.page = 1;
      this.getArticles();
    },
    changeDate(arr) {
      if (arr) {
        this.reqParams.begin_pubdate = arr[0];
        this.reqParams.end_pubdate = arr[1];
      } else {
        this.reqParams.begin_pubdate = null;
        this.reqParams.end_pubdate = null;
      }
    },

    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getArticles();
    },

    async getArticles() {
      const res = await this.$http.get("articles", { params: this.reqParams });
      console.log(res);
      this.articles = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style lang="less" scoped>
</style>>
