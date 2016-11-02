import LogoName from '../Component/LogoName.js';
import { Row, Col, notification, Alert } from 'antd';
import React from 'react';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentUser: '',
      CurrentDepartment: '',
    };
  }
  componentWillMount() {
    console.log('%c我一直在等待你的加入--->QQ：595734521', 'color:red');
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
            $('#b').attr('href', '/logout');
            this.setState(
              {
                CurrentUser,
                CurrentDepartment,
              }
            );
            window.CurrentUser = CurrentUser.toString().trim();
            window.CurrentDepartment = CurrentDepartment.toString().trim();
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
  }
  render() {
    return (
      <div>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={12}><LogoName name="档案管理系统" /></Col>
          <Col span={4}><Alert message={`当前用户： ${this.state.CurrentUser}`} type="success" showIcon /></Col>
          <Col span={4}><Alert message={`当前部门： ${this.state.CurrentDepartment}`} type="info" showIcon /></Col>
          <Col span={2}><a id="b"><Alert message="退出" type="warning" showIcon /></a></Col>
          <Col span={2}>&nbsp;</Col>
        </Row>
      </div>
    );
  }
}
