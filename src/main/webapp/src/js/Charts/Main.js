import React from 'react';
import { Row, Col, notification } from 'antd';
import DataSearch from './DataSearch.js';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';
import echarts from 'echarts';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeptCount: '',     // 部门总数量
      CurrentUser: '',      // 当前用户
      CurrentDepartment: '', // 当前部门
      DeptList: [],      // 部门列表
      FlowIn: '',        // 档案存入
      FlowOut: '',       // 档案提出
      FlowBorrow: '',    // 档案出借
      FlowReturn: '',    // 档案归还
      FlowChange: '',    // 流动变更
      PersonChange: '',  // 人员变更
      FileIn: '',        // 存档数量
      FileOut: '',       // 提档数量
      FileBorrow: '',    // 借档数量
      Female: '',        // 男性数量
      Male: '',          // 女性数量
    };
    this.onChange = this.onChange.bind(this);
    this.drawChartsA = this.drawChartsA.bind(this);
    this.drawChartsB = this.drawChartsB.bind(this);
  }

  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentList,
      'dataType': 'text',
      'success': (DeptList) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DepartmentCount,
          'dataType': 'text',
          'data': {
            'DeptName': '',
          },
          'success': (DeptCount) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.CurrentUser,
              'dataType': 'text',
              'success': (CurrentUser) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.CurrentDepartment,
                  'dataType': 'text',
                  'success': (CurrentDepartment) => {
                    this.setState(
                      {
                        CurrentUser,
                        CurrentDepartment,
                        DeptCount,
                        DeptList: eval(`(${DeptList})`),
                      }
                    );
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法读取当前用户所属部门，请检查网络情况');
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法读取当前用户，请检查网络情况');
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法读取部门信息，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取部门总数，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowInAll,
      'dataType': 'text',
      'success': (FlowIn) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.FlowOutAll,
          'dataType': 'text',
          'success': (FlowOut) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.FlowChangeAll,
              'dataType': 'text',
              'success': (FlowChange) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.PersonChangeAll,
                  'dataType': 'text',
                  'success': (PersonChange) => {
                    $.ajax({
                      'type': 'POST',
                      'url': AjaxFunction.MaleInAll,
                      'dataType': 'text',
                      'success': (MaleIn) => {
                        $.ajax({
                          'type': 'POST',
                          'url': AjaxFunction.MaleOutAll,
                          'dataType': 'text',
                          'success': (MaleOut) => {
                            $.ajax({
                              'type': 'POST',
                              'url': AjaxFunction.FemaleInAll,
                              'dataType': 'text',
                              'success': (FemaleIn) => {
                                $.ajax({
                                  'type': 'POST',
                                  'url': AjaxFunction.FemaleOutAll,
                                  'dataType': 'text',
                                  'success': (FemaleOut) => {
                                    $.ajax({
                                      'type': 'POST',
                                      'url': AjaxFunction.FlowBorrowAll,
                                      'dataType': 'text',
                                      'success': (FlowBorrow) => {
                                        $.ajax({
                                          'type': 'POST',
                                          'url': AjaxFunction.FlowReturnAll,
                                          'dataType': 'text',
                                          'success': (FlowReturn) => {
                                            $.ajax({
                                              'type': 'POST',
                                              'url': AjaxFunction.MaleBorrowAll,
                                              'dataType': 'text',
                                              'success': (MaleBorrow) => {
                                                $.ajax({
                                                  'type': 'POST',
                                                  'url': AjaxFunction.FemaleBorrowAll,
                                                  'dataType': 'text',
                                                  'success': (FemaleBorrow) => {
                                                    this.drawChartsA(FlowIn, FlowOut, FlowChange, PersonChange, FlowBorrow, FlowReturn);
                                                    this.drawChartsB(MaleIn, MaleOut, MaleBorrow, FemaleIn, FemaleOut, FemaleBorrow);
                                                  },
                                                  'error': () => {
                                                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                                  },
                                                });
                                              },
                                              'error': () => {
                                                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                              },
                                            });
                                          },
                                          'error': () => {
                                            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                          },
                                        });
                                      },
                                      'error': () => {
                                        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                      },
                                    });
                                  },
                                  'error': () => {
                                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                  },
                                });
                              },
                              'error': () => {
                                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                              },
                            });
                          },
                          'error': () => {
                            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                          },
                        });
                      },
                      'error': () => {
                        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                      },
                    });
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
  }
  onChange(userDept) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowIn,
      'dataType': 'text',
      'data': {
        'did': userDept,
      },
      'success': (FlowIn) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.FlowOut,
          'dataType': 'text',
          'data': {
            'did': userDept,
          },
          'success': (FlowOut) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.FlowChange,
              'dataType': 'text',
              'data': {
                'did': userDept,
              },
              'success': (FlowChange) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.PersonChange,
                  'dataType': 'text',
                  'data': {
                    'did': userDept,
                  },
                  'success': (PersonChange) => {
                    $.ajax({
                      'type': 'POST',
                      'url': AjaxFunction.MaleIn,
                      'dataType': 'text',
                      'data': {
                        'did': userDept,
                      },
                      'success': (MaleIn) => {
                        $.ajax({
                          'type': 'POST',
                          'url': AjaxFunction.MaleOut,
                          'dataType': 'text',
                          'data': {
                            'did': userDept,
                          },
                          'success': (MaleOut) => {
                            $.ajax({
                              'type': 'POST',
                              'url': AjaxFunction.FemaleIn,
                              'dataType': 'text',
                              'data': {
                                'did': userDept,
                              },
                              'success': (FemaleIn) => {
                                $.ajax({
                                  'type': 'POST',
                                  'url': AjaxFunction.FemaleOut,
                                  'dataType': 'text',
                                  'data': {
                                    'did': userDept,
                                  },
                                  'success': (FemaleOut) => {
                                    $.ajax({
                                      'type': 'POST',
                                      'url': AjaxFunction.FlowBorrow,
                                      'dataType': 'text',
                                      'data': {
                                        'did': userDept,
                                      },
                                      'success': (FlowBorrow) => {
                                        $.ajax({
                                          'type': 'POST',
                                          'url': AjaxFunction.FlowReturn,
                                          'dataType': 'text',
                                          'data': {
                                            'did': userDept,
                                          },
                                          'success': (FlowReturn) => {
                                            $.ajax({
                                              'type': 'POST',
                                              'url': AjaxFunction.MaleBorrow,
                                              'dataType': 'text',
                                              'data': {
                                                'did': userDept,
                                              },
                                              'success': (MaleBorrow) => {
                                                $.ajax({
                                                  'type': 'POST',
                                                  'url': AjaxFunction.FemaleBorrow,
                                                  'dataType': 'text',
                                                  'data': {
                                                    'did': userDept,
                                                  },
                                                  'success': (FemaleBorrow) => {
                                                    this.drawChartsA(FlowIn, FlowOut, FlowChange, PersonChange, FlowBorrow, FlowReturn);
                                                    this.drawChartsB(MaleIn, MaleOut, MaleBorrow, FemaleIn, FemaleOut, FemaleBorrow);
                                                  },
                                                  'error': () => {
                                                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                                  },
                                                });
                                              },
                                              'error': () => {
                                                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                              },
                                            });
                                          },
                                          'error': () => {
                                            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                          },
                                        });
                                      },
                                      'error': () => {
                                        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                      },
                                    });
                                  },
                                  'error': () => {
                                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                                  },
                                });
                              },
                              'error': () => {
                                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                              },
                            });
                          },
                          'error': () => {
                            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                          },
                        });
                      },
                      'error': () => {
                        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                      },
                    });
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
  }
  drawChartsA(FlowIn = '0', FlowOut = '0', FlowBorrow = '0', FlowReturn = '0', FlowChange = '', PersonChange = '0') {
    const myChart = echarts.init(document.getElementById('ChartsA'));
    myChart.setOption({
      title: {
        text: '业务办理量分析',
        subtext: '',
        x: 'center',
      }, tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      }, legend: {
        orient: 'vertical',
        left: 'left',
        data: ['档案存放', '档案提取', '档案出借', '档案归还', '修改人员信息', '修改流转信息'],
      }, series: [
        {
          name: '业务分析',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: FlowIn, name: '档案存放' },
            { value: FlowOut, name: '档案提取' },
            { value: FlowBorrow, name: '档案出借' },
            { value: FlowReturn, name: '档案归还' },
            { value: FlowChange, name: '修改人员信息' },
            { value: PersonChange, name: '修改档案信息' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  }
  drawChartsB(MaleIn = '0', MaleOut = '0', MaleBorrow = '0', FemaleIn = '', FemaleOut = '0', FemaleBorrow = '0') {
    const myChart = echarts.init(document.getElementById('ChartsB'));
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',       // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ['女', '男'],
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['在存', '已提', '出借'],
      },
      series: [
        {
          name: '女',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          data: [FemaleIn, FemaleOut, FemaleBorrow],
        },
        {
          name: '男',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          data: [MaleIn, MaleOut, MaleBorrow],
        },
      ],
    });
  }
  render() {
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            <Col span={24}>请选择部门：<DataSearch onChange={this.onChange} deptList={this.state.DeptList} userDept={this.state.CurrentDepartment} deptCount={this.state.DeptCount} /></Col>
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <Col span={2} >
              &nbsp;&nbsp;&nbsp;
            </Col>
            <Col span={8} >
              <div id="ChartsA" style={{ 'width': '450px', 'height': '450px' }}></div>
            </Col>
            <Col span={2} >
              &nbsp;&nbsp;&nbsp;
            </Col>
            <Col span={8} >
              <div id="ChartsB" style={{ 'width': '450px', 'height': '450px' }}></div>
            </Col>
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
