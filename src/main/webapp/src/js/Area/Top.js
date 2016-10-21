import UserName from '../Component/UserName.js';
import LogoName from '../Component/LogoName.js';
import DepartmentName from '../Component/DepartmentName.js';
import { Row, Col } from 'antd';
import React from 'react';

// function Top() {
//   return (
//     <div>
//       <UserName name="wts" />
//     </div>
//   );
// }
// export default Top;

export default class Top extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={12}><LogoName name="槐荫区职业介绍中心档案管理系统" /></Col>
          <Col span={4}><UserName /></Col>
          <Col span={4}><DepartmentName /></Col>
          <Col span={4}>退出</Col>
        </Row>
      </div>
    );
  }
}
