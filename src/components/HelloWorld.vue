<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-form :inline="true" style="text-align: left">
      <el-form-item>
        <el-button type="primary" @click="handleTbfx">图表分析</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <road-table :columns="columns" :dataSource="tableData" has-index>
      </road-table>
    </div>
    <el-dialog
            v-if="dialogVisible"
            title="岗位图表分析"
            :visible.sync="dialogVisible"
            width="80%"
            center
            class="normal-dialog"
            :show-close="false"
    >
      <div class="side-box-body">
        <div style="width: 800px;height: 600px" ref="chart"></div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button type="warning" @click="dialogVisible=false">{{"关闭" }}</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import  RoadTable from './roadTable'
  import data from './data'
  import * as echarts from 'echarts';

  export default {
  name: 'HelloWorld',
  components:{
    RoadTable
  },
  props: {
    msg: String
  },
  data(){
    return {
      dialogVisible: false,
      columns: [
        {
          prop: "zpdw",
          label: "招聘单位",
          key: "zpdw"
        },
        {
          prop: "gwdm",
          label: "岗位代码",
          key: "gwdm"
        },
        {
          prop: "zpyq",
          label: "招聘要求",
          key: "zpyq"
        },
        {
          prop: "sfkzyk",
          label: "是否考专业课",
          key: "sfkzyk"
        },
        {
          prop: "lxfs",
          label: "联系方式 ",
          key: "lxfs"
        },
        {
          prop: "tjxxrs",
          label: "提交信息人数(个)",
          key: "tjxxrs",
          sortable: true
        },
        {
          prop: "hgrs",
          label: "资审合格人数(个)",
          key: "hgrs",
          sortable: true
        },
        {
          prop: "jfrs",
          label: "缴费人数(个)",
          key: "jfrs",
          sortable: true
        },
        {
          prop: "dz",
          label: "地址",
          key: "dz"
        }
      ],
      tableData: data
    }
  },
  methods:{
    handleTbfx(){
      this.dialogVisible = true
      console.log(this.$refs.chart);
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.chart);
        const option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}"
          },
          title: [
            {
              text: "岗位分析",
              bottom: 0,
              left: "50%",
              textStyle: {
                color: "#fff",
                fontSize: "12px"
              },
              textAlign: "center"
            }
          ],
          xAxis: {
            type: 'category',
            data: data.map(item => item.zpdw)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: data.map(item => {
             return  item.tjxxrs
            }),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        };

        option && myChart.setOption(option);
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  html{
    padding: 0;
  }
  .hello{
    padding: 0;
  }
h3 {
  margin:  0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
