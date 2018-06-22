<template>
  <div>
    page01
    <chart01>
      <span slot="title">降雨量</span>
      <span slot="text">01110</span>
      <div slot="chart01"><div id="myChart"></div></div>
    </chart01>
    <chart01>
      <span slot="title">库容量</span>
      <span slot="text">abcd</span>
      <div slot="chart01"><div id="charts4"></div></div>
    </chart01>
  </div>

</template>

<script>
  import chart01 from '../components/chart01'
   //import '../assets/js/jquery-1.11.3'
  // import '../assets/js/config'
   //import '../assets/js/fun'

  import {mapState} from 'vuex'
  export default {
    name: "page01",
    data () {
      return {
        /*dataX:["周一","周二","周三","周四","周五","周六","周日"],
        dataY:[5, 20, 36, 10, 10, 20, 30]*/
      }
    },
    props:{
      height: {
        type: String,
        'default' : '300px'
      },
      width: {
        type: String,
        'default' : "500px"
      }
    },
    components:{
      chart01,
    },
    methods: {

      myChart5_2: function (json) {

        var isdata = false;
        var option_data = [];
        var option_xAxis = [];
        for (var s in json) {
          //console.log(json[s].devalias);
          //if (!json[s].data || get.codeType(json[s].devcode).equipment != 'F') continue;
          isdata = true;


          for (var arr in json[s].data) {
            if (!json[s].data[arr].data) continue;

            option_data[arr] = parseFloat(json[s].data[arr].data.x).toFixed(2) * 1;

            var time = json[s].data[arr].time;

            option_xAxis[arr] = setDateFormat(time);
            //alert(json[s].data[arr].time);
          }

        }


        var myChart = this.$echarts.init(document.getElementById('myChart'));
        var dataShadow = [];
        // 指定的配置项和数据
        var option = {
          title: {
            text: 'aaa',
            textStyle: {
              color: 'red',
              fontWeight: '500',
              fontSize: '150px',
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                type: "png",
                name: "详细降雨量",
                title: "下载",
                icon: "image://../images/echarts/icon/down.png"
              }
            }
          },
          grid: {
            top: '80px',
            left: '3%',
            right: '8%',
            bottom: '13%',
            containLabel: true
          },
          legend: {
            data: ['降雨量'],
            bottom: '3px;'
          },
          xAxis: {
            data: option_xAxis
          },
          yAxis: [{
            name: ('降雨量(单位：mm)'),
            axisLine: {
              show: false
            }
          }],
          series: [{
            type: 'bar',
            name: '降雨量',
            barMinHeight: '1',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: option_data
          }],
          color: 'green'
        };

        // 使用刚指定的配置项和数据显示。
        myChart.setOption(option);

        // 事件格式化,日期加上年月日，时分秒
        function setDateFormat(date, Format) {
          if (Format != false)
            Format = true;
          var datetime = '';
          if (Format) {
            var dt = {}
            dt.Y = date.substr(0, 4);
            dt.m = date.substr(5, 2);
            dt.d = date.substr(8, 2);
            dt.H = date.substr(11, 2);
            dt.i = date.substr(14, 2);
            dt.s = date.substr(17, 2);

            for (var k in dt) {
              if (dt[k]) {
                datetime += dt[k];

                if (k == 'Y')
                  datetime += "年";
                if (k == 'm')
                  datetime += "月";
                if (k == 'd')
                  datetime += "日 ";
                if (k == 'H')
                  datetime += "时";
                if (k == 'i')
                  datetime += "分";
                if (k == 's')
                  datetime += "秒";
              }
            }
          } else {
            date = date.replace("年", "-");
            date = date.replace("月", "-");
            date = date.replace("日", "");
            date = date.replace("时", ":");
            date = date.replace("分", ":");
            date = date.replace("秒", "");

            datetime = date
          }
          return datetime;
        }
      },
      myChart4: function (json) {

        var isdata = false;
        var option_data = [];
        var option_xAxis = [];
        for (var s in json) {
          //console.log(json[s].devalias);
          //if (!json[s].data || get.codeType(json[s].devcode).equipment != 'F') continue;
          isdata = true;


          for (var arr in json[s].data) {
            if (!json[s].data[arr].data) continue;

            option_data[arr] = parseFloat(json[s].data[arr].data.v).toFixed(1) * 1;

            var time = json[s].data[arr].time;

            option_xAxis[arr] = setDateFormat(time);
            //alert(json[s].data[arr].time);
          }

        }
        var myChartDom = document.getElementById('charts4');

        //自适应宽高
        var myChartContainer = function () {
          myChartDom.style.width = myChartDom.innerWidth+'px';
          myChartDom.style.height = myChartDom.innerHeight+'px';
        };
        myChartContainer();

        var myChart = this.$echarts.init(myChartDom);
        var dataShadow = [];
        // 指定的配置项和数据
        var option = {
          title: {
            text: 'aaa',
            textStyle: {
              color: 'red',
              fontWeight: '500',
              fontSize: '150px',
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                type: "png",
                name: "详细降雨量",
                title: "下载",
                icon: "image://../images/echarts/icon/down.png"
              }
            }
          },
          grid: {
            top: '80px',
            left: '3%',
            right: '8%',
            bottom: '13%',
            containLabel: true
          },
          legend: {
            data: ['降雨量'],
            bottom: '3px;'
          },
          xAxis: {
            data: option_xAxis
          },
          yAxis: [{
            name: ('降雨量(单位：mm)'),
            axisLine: {
              show: false
            }
          }],
          series: [{
            type: 'line',
            //type: 'gauge',
            name: '降雨量',
            barMinHeight: '1',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: option_data
          }],
          color: 'green'
        };

        // 使用刚指定的配置项和数据显示。
        myChart.setOption(option);
        window.onresize = function () {
          myChartContainer();
          myChart.resize();
        };

        // 事件格式化,日期加上年月日，时分秒
        function setDateFormat(date, Format) {
          if (Format != false)
            Format = true;
          var datetime = '';
          if (Format) {
            var dt = {}
            dt.Y = date.substr(0, 4);
            dt.m = date.substr(5, 2);
            dt.d = date.substr(8, 2);
            dt.H = date.substr(11, 2);
            dt.i = date.substr(14, 2);
            dt.s = date.substr(17, 2);

            for (var k in dt) {
              if (dt[k]) {
                datetime += dt[k];

                if (k == 'Y')
                  datetime += "年";
                if (k == 'm')
                  datetime += "月";
                if (k == 'd')
                  datetime += "日 ";
                if (k == 'H')
                  datetime += "时";
                if (k == 'i')
                  datetime += "分";
                if (k == 's')
                  datetime += "秒";
              }
            }
          } else {
            date = date.replace("年", "-");
            date = date.replace("月", "-");
            date = date.replace("日", "");
            date = date.replace("时", ":");
            date = date.replace("分", ":");
            date = date.replace("秒", "");

            datetime = date
          }
          return datetime;
        }
      },
    },
    computed:{
      ...mapState(['data01']),
    },
    mounted(){
      this.$store.dispatch('getData',()=>{
        this.$nextTick(()=>{
          //this.getEchartData()
          this.myChart5_2(this.data01)
          this.myChart4(this.data01)
        })

      })
    }
  }

</script>


<style scoped>
  #myChart{
    width: 100%;
    height: 500px;
    background: #f0f0f0;
  }
  #charts4{
    width: 100%;
    height: 500px;
    background: #f0f0f0;

  }
</style>
