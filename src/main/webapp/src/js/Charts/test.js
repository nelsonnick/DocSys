import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: { text: 'ECharts 入门示例' },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '袜子'],
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20],
  }],
});
