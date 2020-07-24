<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <!-- 提交表单时的验证，先在el-form上添加:model和 :rules-->
      <el-form ref="articalForm" label-width="120px" :model="articalForm" :rules="articalRules">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="articalForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" class="el-item" prop="content">
          <!-- 这是第三方的富文本组件，所以用elementUI没有办法进行内容的校验 -->
          <!-- 用富文本自带的事件@blur -->
          <quill-editor @blur="checkContent" v-model="articalForm.content" :options="editorOption" />
        </el-form-item>
        <el-form-item label="封面:" prop="cover.type">
          <!-- 当切换封面图数据的时候，图片中的数据要进行重置,用change事件实现 -->
          <el-radio-group @change="articalForm.cover.images=[]" v-model="articalForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 只有一张图的情况 -->
          <div style="margin-top:10px" v-if="articalForm.cover.type===1">
            <!-- 父子组件传值，子组件上传一张图片图片地址传给父组件 -->
            <!-- <my-image :value="testImg" @input="testImg=$event"></my-image> -->
            <my-image @confirm="checkCover" v-model="articalForm.cover.images[0]"></my-image>
          </div>
          <!-- 需要三张图的情况 -->
          <div style="margin-top:10px" v-if="articalForm.cover.type===3">
            <my-image
              @confirm="checkCover"
              v-model="articalForm.cover.images[i-1]"
              v-for="i in 3"
              :key="i"
            ></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:" prop="channle_id">
          <my-channel v-model="articalForm.channle_id"></my-channel>
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
    const vaildCoverFn = (ruler, value, callback) => {
      // 此时的value就是cover.type
      const images = this.articalForm.cover.images;
      if (value === 1) {
        if (images[0] && images.length === 1) {
          callback();
        } else {
          callback(new Error("请选择一张封面图"));
        }
      } else if (value === 3) {
        if (images[0] && images[1] && images[2]) {
          callback();
        } else {
          callback(new Error("请选择三张封面图"));
        }
      }
    };
    return {
      articalForm: {
        title: "",
        name: "",
        channle_id: null,
        content: null,
        cover: {
          type: 1,
          //图片数据
          images: [],
        },
      },
      articalRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5 到 20 个字符", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
        ],
        channle_id: [
          { required: true, message: "请选择频道", trigger: "change" },
        ],
        //单选框组绑定的是articalForm .cover.type 它能出发chang来进行校验
        "cover.type": [{ validator: vaildCoverFn, trigger: "change" }],
      },
      //富文本需要的配置项
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
  methods: {
    checkCover() {
      //进行cover.type校验
      this.$refs.articalForm.validateField("cover.type");
    },
    checkContent() {
      //通过表单组件来使用声明好的content校验规则来校验content字段
      this.$refs.articalForm.validateField("content");
    },
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