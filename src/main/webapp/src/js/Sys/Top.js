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
          <Col span={12}><LogoName name="档案管理系统后台" /></Col>
          <Col span={3}><Alert message={this.state.CurrentUser} type="success" showIcon /></Col>
          <Col span={3}><Alert message={this.state.CurrentDepartment} type="info" showIcon /></Col>
          <Col span={3}><a id="b"><Alert message="退出" type="warning" showIcon /></a></Col>
          <Col span={3}>&nbsp;</Col>
        </Row>
      </div>
    );
  }
}
