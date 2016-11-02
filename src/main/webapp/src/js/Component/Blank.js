import React from 'react';
import { Card, Col, Row } from 'antd';

export default class Blank extends React.Component {
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col span="8">
            <Card title="特别强调" >本系统涉及辖区内大量市民信息，工作人员使用时需遵守相关规定，确保相关信息不外泄。</Card>
          </Col>
          <Col span="8">
            <Card title="实名使用" >系统后台对每名用户的任意一笔业务操作均进行了详细记录。为明晰责权，请保管好自己的用户名及密码，不得转借他人。</Card>
          </Col>
          <Col span="8">
            <Card title="着重说明" >本系统开发时间紧张，开发过程中难免出现失误。如遇系统异常，或有其它业务需求，请及时反馈，以便于提升工作效率。</Card>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col span="8">
            <Card title="业务变更" >经反复考虑，将档案的流动过程归纳为进、出两部分（借档和提档均视为出）；档案编号自动生成。</Card>
          </Col>
          <Col span="8">
            <Card title="编号规则" >3位部门编号+8位日期编号+3位顺序号，每个部门每日收取的最大档案数量为999。</Card>
          </Col>
          <Col span="8">
            <Card title="技术支持" >
              前端：webpack+ReactJS+Ant Design+Bootstrap+echart<br />
              后端：Java,Jfinal<br />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
