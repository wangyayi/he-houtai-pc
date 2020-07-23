<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <!-- 遍历后台获取的数据 -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  props: ["value"],
  data() {
    return {
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    changeChannel(val) {
      if (val === "") val = null;
      this.$emit("input", val);
    },
    async getChannelOptions() {
      const res = await this.$http.get("channels");
      this.channelOptions = res.data.data.channels;
    }
  }
};
</script>

<style>
</style>