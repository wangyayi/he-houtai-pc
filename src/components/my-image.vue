<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="btn-image" @click="openDialog()">
      <!-- 如果父组件有传递数据过来就用父组件的数据，没有传值就用默认地址 -->
      <img :src="value || previewImg" alt />
    </div>
    <!-- 对话框，默认隐藏 -->
    <el-dialog :visible.sync="dislogVisible" width="720">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="images">
          <!-- 按钮切换 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->

          <div class="image-list">
            <div
              :class="{selected:selectedImgUrl===item.url}"
              @click="selectedImg(item.url)"
              class="image-item"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePaper"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- show-file-list是否显示已上传文件列表 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dislogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
//导入本地图片，因为动态src的图片不会打包到服务器上，所以图片显示不出来，
// 通过import导入的资源会打包
import img from "../assets/default.png";
export default {
  name: "my-image",
  // 接收父组件传递过来的值
  props: ["value"],
  data() {
    return {
      dislogVisible: false,
      activeName: "images",
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8,
      },
      total: 0,
      images: [],
      //当前选中的图片地址
      selectedImgUrl: null,
      uploadImgUrl: null,

      headers: {
        Authorization: `Bearer ${auth.getUser().token}`,
      },
      //封面预览图，通过import导入进来的图片
      previewImg: img,
    };
  },
  methods: {
    //确认图片
    confirmImg() {
      if (this.activeName === "images") {
        //激活素材库
        if (!this.selectedImgUrl)
          return this.$message.warning("请选择一张图片");
        // this.previewImg = this.selectedImgUrl;
        //触发自定义事件，把选中的图片提交给父组件使用
        this.$emit("input", this.selectedImgUrl);
      } else {
        //激活上传图片
        if (!this.uploadImgUrl) {
          return this.$message.warning("请上传一张图片");
        } else {
          // this.previewImg = this.uploadImgUrl;
          this.$emit("input", this.uploadImgUrl);
        }
      }
      // 完成功能后关闭选项卡
      this.dislogVisible = false;
      //这里需要做父组件的业务，校验封面图是否修改
      //在确认图片后，会触发my-image的自定义事件confirm
      this.$emit("confirm");
    },
    uploadSuccess(res) {
      this.uploadImgUrl = res.data.url;
    },
    selectedImg(url) {
      this.selectedImgUrl = url;
    },
    changePaper(newPage) {
      this.reqParams.page = newPage;
      this.getImage();
    },
    toggleList() {
      this.reqParams.page = 1;
      this.getImage();
    },
    openDialog() {
      this.dislogVisible = true;
      this.getImage();
      //打开对话框清除之前的记录
      this.selectedImgUrl = null;
      this.uploadImgUrl = null;
      this.activeName = "images";
    },
    async getImage() {
      const res = await this.$http.get("user/images", {
        params: this.reqParams,
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    },
  },
};
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
  .btn-image {
    width: 150px;
    height: 150px;

    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .image-list {
    margin-top: 15px;
    .image-item {
      width: 150px;
      height: 120px;
      display: inline-block;
      border: 1px solid #ddd;
      margin-right: 15px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      &.selected::after {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
          center / 50px auto;
      }
    }
  }
}
::v-deep .el-dialog__body {
  padding-bottom: 0px;
}
</style>