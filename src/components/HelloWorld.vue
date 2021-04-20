<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-form :inline="true" style="text-align: left">
      <el-form-item>
        <el-button type="primary" @click="handleTbfx">图表分析</el-button>
         <!-- <el-button type="primary" @click="handleyj">综合意见</el-button> -->
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
    >
      <div class="side-box-body">
        <el-form :inline="true" >
       <el-form-item>
          <el-select  v-model="fxtj" placeholder="分析条件" clearable style="width:148px" @change="changeChart">
            <el-option v-for="status in mapStatuses" :value="status.value" :key="status.value" :label="status.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
      fxtj: "1",
      mychart: null,
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
      tableData: data,
      mapStatuses:[
        {
          label: "提交信息人数",
          value: "1",
          title: "岗位分析(提交信息人数:个)",
          key: "tjxxrs"
        },
           {
          label: "资审合格人数",
          value: "2",
            title: "岗位分析(资审合格人数:个)",
          key: "hgrs"
        },
           {
          label: "缴费人数",
          value: "3",
             title: "岗位分析(缴费人数:个)",
          key: "jfrs"
        },
           {
          label: "距离",
          value: "4",
              title: "岗位分析(距离:km)",
          key: "jl"
        }
      ]
    }
  },
  mounted(){
    
  },
  methods:{
    handleTbfx(){
      this.dialogVisible = true
      console.log(this.$refs.chart)
       this.$nextTick(() => {
         this.myChart = echarts.init(this.$refs.chart);
        const option = {
           legend: {
          type: "plain",
          orient: "horizontal",
          left: "center",
          bottom: "6%",
          width: "100%",
          itemGap: 4,
          itemWidth: 10,
          itemHeight: 10,
          align: "left",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: "12px"
          }
        },
          tooltip: {
            trigger: "item"
          },
          title: {
              text: "岗位分析(提交信息人数:个)",
              bottom: 20,
              left: "50%",
              textAlign: "center"
            },
            label:{
              show: true,
              position: "top"
            },
         xAxis: {
            show: true,
            type: "category",
            axisLine: {

            }
          },
        yAxis: {
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                type: "dashed",
                color: "#35619d"
              }
            }
            // show: false
          },
          series: {
            data: data.map(item => {
             return  {
               name: item.zpdw,
               value: item.tjxxrs
            }}),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        };
        option && this.myChart.setOption(option);
      })
  },
  changeChart(val){
     if(val){
       const item  = this.mapStatuses.find(_ => _.value === val);
       this.$nextTick(() => {
        this.myChart.setOption({
         title:{
           text: item.title
         },
         series:{
           data: data.map(_ => {
             return  {
                name: _.zpdw,
               value: _[item.key]
            }}),
         }
         })
       })
     
     } 
  },
  handleyj(){

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
