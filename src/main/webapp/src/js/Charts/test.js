import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('op'));
// 绘制图表

option = {
  title : {
    text: '业务办理量分析',
    subtext: '',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['档案存放','档案提取','修改人员信息','修改档案信息']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'档案存放'},
        {value:310, name:'档案提取'},
        {value:234, name:'修改人员信息'},
        {value:135, name:'修改档案信息'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart.setOption(option);