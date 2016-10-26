import UserName from '../Component/UserName.js';
import LogoName from '../Component/LogoName.js';
import DepartmentName from '../Component/DepartmentName.js';
import { Row, Col, notification } from 'antd';
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
          <Col span={12}><LogoName name="档案管理系统" /></Col>
          <Col span={4}><UserName name={this.state.CurrentUser} /></Col>
          <Col span={4}><DepartmentName name={this.state.CurrentDepartment} /></Col>
          <Col span={4}><a id="b">退出</a></Col>
        </Row>
      </div>
    );
  }
}
