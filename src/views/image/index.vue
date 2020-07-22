<template>
  <div class="container-image">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <el-radio-group @change="toggleList()" v-model="reqParams.collect">
          <!-- label属性是单个按钮的值，当你选中点击后，这个值会赋值给reqParams.collect -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="list-box">
        <div class="item-box" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{'red':item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="300px">
      <!-- <span>上传素材</span> -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "page-image",
  data() {
    return {
      headers: { Authorization: `Bearer ${auth.getUser().token}` },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //素材列表
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: ""
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    //图片上传成功的钩子函数res是图片上传成功后后台返回的数据
    uploadSuccess(res) {
      //提示和预览
      this.$message.success("上传数据成功");
      this.imageUrl = res.data.url;
      //3s后关闭对话框和更新列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
      }, 3000);
    },
    openDialog() {
      this.dialogVisible = true;
      this.imageUrl = null;
    },
    //进行添加收藏或者取消收藏
    async toggleStatus(item) {
      try {
        //修改后的状态
        const updateStatus = !item.is_collected;
        await this.$http.put(`user/images/${item.id}`, {
          //collect和当前图片取反即可，当前已收藏--->取消收藏
          collect: updateStatus
        });
        this.$message.success(updateStatus ? "添加收藏成功" : "取消收藏成功");
        item.is_collected = updateStatus;
      } catch (err) {
        this.$message.error(updateStatus ? "添加收藏失败" : "取消收藏失败");
      }
    },
    //点击删除，弹出弹层，如果确定，删除图片成功，并重新获取图片，取消什么都不干
    delImage(id) {
      this.$confirm("此操作将永久删除该图片素材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`user/images/${id}`);
            this.$message.success("删除图片成功");
            this.getImages();
          } catch (err) {
            this.$message.error("删除素材失败");
          }
        })
        .catch(() => {});
    },
    //   切换全部和收藏
    toggleList() {
      this.reqParams.page = 1;
      this.getImages();
    },
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    async getImages() {
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style lang="less" scoped>
//列表样式
.list-box {
  margin-top: 20px;
  .item-box {
    width: 180px;
    height: 180px;
    display: inline-block;
    margin-left: 60px;
    margin-bottom: 20px;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
