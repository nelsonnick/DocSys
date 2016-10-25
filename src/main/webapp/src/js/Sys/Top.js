import UserName from '../Component/UserName.js';
import LogoName from '../Component/LogoName.js';
import DepartmentName from '../Component/DepartmentName.js';
import { Row, Col } from 'antd';
import React from 'react';

export default class Top extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={12}><LogoName name="档案管理系统后台" /></Col>
          <Col span={4}><UserName name="系统管理员" /></Col>
          <Col span={4}><DepartmentName name="系统管理员" /></Col>
          <Col span={4}>退出</Col>
        </Row>
      </div>
    );
  }
}
