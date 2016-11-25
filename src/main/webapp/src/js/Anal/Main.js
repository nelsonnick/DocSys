import React from 'react';
import { Row, Col, notification } from 'antd';
import DataSearch from './DataSearch.js';
import QueueAnim from 'rc-queue-anim';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

const optionz = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

export default class Anal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserCascader,
      'dataType': 'text',
      'success': (data) => {
        this.setState(
          {
            options: eval(`(${data})`),
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取部门及用户列表，请检查网络情况');
      },
    });
  }
  onChange(uid) {
    console.log(uid);
  }
  render() {
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            <Col span={24}>请选择人员：<DataSearch onChange={this.onChange} options={optionz} /></Col>
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <Col span={2} >
              &nbsp;&nbsp;&nbsp;
            </Col>
            <Col span={8} >
              <div id="ChartsA" style={{ 'width': '400px', 'height': '400px' }}></div>
            </Col>
            <Col span={2} >
              &nbsp;&nbsp;&nbsp;
            </Col>
            <Col span={8} >
              <div id="ChartsB" style={{ 'width': '400px', 'height': '400px' }}></div>
            </Col>
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
