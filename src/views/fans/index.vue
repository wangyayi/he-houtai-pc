<template>
  <div class="contaniner-fans">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 内容，标签页组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fansList">
            <!-- key必须使用 字符串/数字  item.id是对象（json-bigint转换的） -->
            <div class="fanItem" v-for="item in fans" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" size="small" plain>+ 关注</el-button>
            </div>
          </div>
          <el-pagination
            :total="total"
            :current-page="reqFans.page"
            @current-change="getPageSize"
            background
            layout="prev, pager, next"
            :page-size="reqFans.per_page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
          <div ref="bar" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "page-fans",
  data() {
    return {
      activeName: "list",
      reqFans: {
        page: 1,
        per_page: 20,
      },
      fans: [],
      total: 0,
    };
  },
  created() {
    this.getFans();
  },
  //页面加载完的时候绘制柱状图
  mounted() {
    this.initBar();
  },
  methods: {
    async initBar() {
      try {
        const myChart = echarts.init(this.$refs.bar);
        const option = {
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              //横坐标
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "直接访问",
              type: "bar",
              barWidth: "60%",
              //相应的刻度
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ],
        };
        //获取数据，给option中的数据赋值
        const res = await this.$http.get("statistics/followers");
        const obj = res.data.data.age;
        const xAxisData = [];
        const seriesData = [];
        for (const key in obj) {
          xAxisData.push(key);
          seriesData.push(obj[key]);
        }
        option.xAxis[0].data = xAxisData;
        option.series[0].data = seriesData;
        myChart.setOption(option);
      } catch (err) {
        this.$message.error("当前网路不稳定，请稍后再试");
      }
    },
    getPageSize(newPage) {
      this.reqFans.page = newPage;
      this.getFans();
    },
    async getFans() {
      const {
        data: { data },
      } = await this.$http.get("followers", { params: this.reqFans });
      this.fans = data.results;
      this.total = data.total_count;
    },
  },
};
</script> 

<style lang="less" scoped>
.fanItem {
  width: 100px;
  height: 170px;
  border: 1px solid #ddd;
  display: inline-block;
  margin-right: 40px;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 10px;
  p {
    margin: 10px;
    font-size: 14px;
  }
}
</style>