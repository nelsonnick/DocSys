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

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeptCount: '',     // 部门总数量
      CurrentUser: '',      // 当前用户
      CurrentDepartment: '', // 当前部门
      DeptList: [],      // 部门列表
      FlowIn: '',        // 档案存入
      FlowOut: '',       // 档案提出
      FlowChange: '',    // 流动变更
      PersonChange: '',  // 人员变更
      FileIn: '',        // 存档数量
      FileOut: '',       // 提档数量
      Female: '',        // 男性数量
      Male: '',          // 女性数量
    };
    this.onChange = this.onChange.bind(this);
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
  }
  onChange(userDept) {
    this.setState(
      {
        CurrentDepartment: userDept,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowIn,
      'dataType': 'text',
      'data': {
        'did': userDept,
      },
      'success': (FlowIn) => {
        this.setState({ FlowIn });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowOut,
      'dataType': 'text',
      'data': {
        'did': userDept,
      },
      'success': (FlowOut) => {
        this.setState({ FlowOut });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowChange,
      'dataType': 'text',
      'data': {
        'did': userDept,
      },
      'success': (FlowChange) => {
        this.setState({ FlowChange });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonChange,
      'dataType': 'text',
      'data': {
        'did': userDept,
      },
      'success': (PersonChange) => {
        this.setState({ PersonChange });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
  }
  render() {
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            <Col span={6}><DataSearch onChange={this.onChange} deptList={this.state.DeptList} userDept={this.state.CurrentDepartment} deptCount={this.state.DeptCount} /></Col>
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <Col span={8} >
              <div id="op" >

              </div>
            </Col>
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
const myChart = echarts.init(document.getElementById('op'));

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
    data: ['档案存放', '档案提取', '修改人员信息', '修改档案信息'],
  }, series: [
    {
      name: '业务分析',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: this.state.FlowIn, name: '档案存放' },
        { value: this.state.FlowOut, name: '档案提取' },
        { value: this.state.FlowChange, name: '修改人员信息' },
        { value: this.state.PersonChange, name: '修改档案信息' },
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
