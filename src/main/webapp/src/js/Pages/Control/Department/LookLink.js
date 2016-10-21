import { Modal, Button, notification } from 'antd';
import React from 'react';
import LookForm from './LookForm';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class LookLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      grand: '',
      options: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentCascade,
      'dataType': 'text',
      'success': (data) => {
        this.setState(
          {
            options: eval(`(${data})`),
          }
        );
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DepartmentFatherGet,
          'dataType': 'text',
          'data': { 'father': this.props.departmentFather },
          'success': (msg) => {
            this.setState(
              {
                visible: true,
                grand: msg,
              }
            );
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取上级部门信息，请检查网络情况');
          },
        });
      },
      'error': (XMLHttpRequest, textStatus) => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
        this.setState(
          {
            options: '',
            visible: false,
          }
        );
      },
    });
  }

  handleCancel() {
    this.refs.LookForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  render() {
    const { departmentId, departmentName, departmentPhone, departmentAddress, departmentState, departmentOther, departmentFather, departmentLevel } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-default btn-xs">详情</a>
        <Modal
          maskClosable={false}
          title="详情"
          visible={this.state.visible}
          onOk={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleCancel}>返 回</Button>,
          ]}
        >
          <LookForm
            ref="LookForm"
            departmentId={departmentId.toString()}
            departmentName={departmentName}
            departmentAddress={departmentAddress}
            departmentPhone={departmentPhone}
            departmentState={departmentState}
            departmentOther={departmentOther}
            departmentFather={departmentFather.toString()}
            departmentLevel={departmentLevel.toString()}
            departmentGrand={this.state.grand}
            options={this.state.options}
          />
        </Modal>
      </span>
    );
  }
}
LookLink.propTypes = {
  departmentId: React.PropTypes.string,
  departmentName: React.PropTypes.string,
  departmentAddress: React.PropTypes.string,
  departmentPhone: React.PropTypes.string,
  departmentState: React.PropTypes.string,
  departmentOther: React.PropTypes.string,
  departmentFather: React.PropTypes.string,
  departmentLevel: React.PropTypes.string,
};
