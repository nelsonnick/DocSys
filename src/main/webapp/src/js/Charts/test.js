app.title = '堆叠条形图';

option = {
  tooltip : {
    trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['男', '女']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis:  {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['在存', '已提']
  },
  series: [
    {
      name: '男',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [MaleIn, MaleOut]
    },
    {
      name: '女',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [FemaleIn, FemaleOut]
    }
  ]
};