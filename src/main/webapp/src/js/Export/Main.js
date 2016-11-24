import React from 'react';
import { Row, Button, Col, Alert } from 'antd';
import * as AjaxFunction from '../Util/AjaxFunction.js';

export default class Export extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}><Alert message="点击对应的按钮下载相应的操作记录" type="warning" /></Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col span={8}><a href={AjaxFunction.ExportTrans}><Button type="primary" size="large" icon="cloud-download">档案信息修改记录</Button></a></Col>
          <Col span={8}><a href={AjaxFunction.ExportChange}><Button type="primary" size="large" icon="cloud-download">档案流动修改记录</Button></a></Col>
          <Col span={8}><a href={AjaxFunction.ExportLogin}><Button type="primary" size="large" icon="cloud-download">系统登录登出记录</Button></a></Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col span={8}><a href={AjaxFunction.ExportLook}><Button type="primary" size="large" icon="cloud-download">操作查询记录</Button></a></Col>
          <Col span={8}><a href={AjaxFunction.ExportPrint}><Button type="primary" size="large" icon="cloud-download">业务打印记录</Button></a></Col>
          <Col span={8}><a href={AjaxFunction.ExportExport}><Button type="primary" size="large" icon="cloud-download">数据导出记录</Button></a></Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col span={8}><a href={AjaxFunction.ExportProve}><Button type="primary" size="large" icon="cloud-download">存档证明打印记录</Button></a></Col>
          <Col span={8}><a href={AjaxFunction.ExportPolity}><Button type="primary" size="large" icon="cloud-download">政审材料打印记录</Button></a></Col>
          <Col span={8}>&nbsp;</Col>
        </Row>
      </div>
    );
  }
}
