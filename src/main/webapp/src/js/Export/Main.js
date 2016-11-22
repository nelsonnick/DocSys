import React from 'react';
import { Row, Button, Col } from 'antd';
import * as AjaxFunction from '../Util/AjaxFunction.js';

export default class Export extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportTrans}>下载：档案信息修改记录</a></Button></div></Col>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportChange}>下载：档案流动修改记录</a></Button></div></Col>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportLogin}>下载：系统登录登出记录</a></Button></div></Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportLook}>下载：操作查询记录</a></Button></div></Col>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportPrint}>下载：业务打印记录</a></Button></div></Col>
          <Col span={8}><div><Button type="primary" icon="cloud-download"><a href={AjaxFunction.ExportExport}>下载：数据导出记录</a></Button></div></Col>
        </Row>
      </div>
    );
  }
}
