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
      userDid: [],
      options: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserCascade,
      'dataType': 'text',
      'success': (data) => {
        this.setState(
          {
            options: eval(`(${data})`),
          }
        );
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DeptNows,
          'dataType': 'text',
          'data': { 'did': this.props.userDid },
          'success': (msg) => {
            this.setState(
              {
                visible: true,
                userDid: eval(`(${msg})`),
              }
            );
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取上级部门信息，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
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
    const { userId, userName, userPhone, userNumber, userState, userOther, userLogin } = this.props;
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
            userId={userId.toString()}
            userName={userName}
            userNumber={userNumber}
            userPhone={userPhone}
            userState={userState}
            userOther={userOther}
            userLogin={userLogin}
            userDept={this.state.userDid}
            options={this.state.options}
          />
        </Modal>
      </span>
    );
  }
}
LookLink.propTypes = {
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDid: React.PropTypes.string,
};
