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
            <Card title="实名使用" >
              系统后台对每名用户的任意一笔业务操作均进行了详细记录。<br />
              为明晰责权，请保管好自己的用户名及密码，不得转借他人。
            </Card>
          </Col>
          <Col span="8">
            <Card title="着重说明" >
              如遇程序异常，或有其它新的业务需求，请及时反馈，以便于提升工作效率。
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col span="8">
            <Card title="业务变更" >
              应众多同事要求，现追加档案出借的功能。<br />
            </Card>
          </Col>
          <Col span="8">
            <Card title="编号规则" >
              3位部门编号+8位日期编号+3位顺序号。<br />
              每个部门每日收取的最大档案数量为999。<br />
              非特殊需要，不推荐采用自动生成的档案编号！
            </Card>
          </Col>
          <Col span="8">
            <Card title="录入说明" >
              未知的证件号码，请统一填写18个0。<br />
              未知的联系电话，请统一填写11个0。<br />
              固定电话请用区号凑足11位数字。
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col span="8">
            <Card title="录入校验" >
              录入过程中的校验结果，请认真阅读相关提示。<br />
              由于历史原因，身份证号码校验时未对户籍位置进行严格校验。
            </Card>
          </Col>
          <Col span="8">
            <Card title="数据说明" >
              后台数据库中，人员与档案为1对多的关系。<br />
              当修改某人的基本信息后，其名下所有档案中的相关信息也会随之变化，同步刷新。
            </Card>
          </Col>
          <Col span="8">
            <Card title="技术支持" >
              槐荫区职业介绍中心--->87957286<br />
              槐荫区基层业务指导--->87957908<br />
              QQ群--------------->126877656
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
