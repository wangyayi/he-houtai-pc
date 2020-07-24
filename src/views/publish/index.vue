<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articalTitle.name"></el-input>
        </el-form-item>
        <el-form-item label="内容:" class="el-item">
          <quill-editor v-model="articalTitle.content" :options="editorOption" />
        </el-form-item>
        <el-form-item label="封面:">
          <!-- 当切换封面图数据的时候，图片中的数据要进行重置,用change事件实现 -->
          <el-radio-group @change="articalTitle.cover.images=[]" v-model="articalTitle.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 只有一张图的情况 -->
          <div style="margin-top:10px" v-if="articalTitle.cover.type===1">
            <!-- 父子组件传值，子组件上传一张图片图片地址传给父组件 -->
            <!-- <my-image :value="testImg" @input="testImg=$event"></my-image> -->
            <my-image v-model="articalTitle.cover.images[0]"></my-image>
          </div>
          <!-- 需要三张图的情况 -->
          <div style="margin-top:10px" v-if="articalTitle.cover.type===3">
            <my-image v-model="articalTitle.cover.images[i-1]" v-for="i in 3" :key="i"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articalTitle.channle_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
//导入富文本组件
import { quillEditor } from "vue-quill-editor";

export default {
  name: "page-publish",
  //使用富文本组件
  components: {
    quillEditor,
  },

  data() {
    return {
      articalTitle: {
        name: "",
        channle_id: null,
        content: null,
        cover: {
          type: 1,
          //图片数据
          images: [],
        },
      },
      editorOption: {
        placeholder: "请输入文章内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"],
          ],
        },
      },
    };
  },
};
</script>

<style scoped lang="less">
// ::v-deep深度作用符号，让选择器在其它组件下生效
::v-deep .quill-editor {
  height: 200px;
}
::v-deep .el-item {
  margin-bottom: 70px;
}
</style>