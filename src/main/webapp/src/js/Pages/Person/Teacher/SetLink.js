import { Modal, Button, notification } from 'antd';
import React from 'react';
import SetForm from './SetForm';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class SetLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      options: [],     // 部门树
      roleValue: [],   // 当前权限
      roleTree: [],    // 角色树
      userDid: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getRole = this.getRole.bind(this);
  }
  getRole(roleValue) {
    window.roleValues = roleValue;
  }
  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserCascade,
      'dataType': 'text',
      'success': (datr) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.RoleTree,
          'dataType': 'text',
          'success': (data) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.RoleNow,
              'dataType': 'text',
              'data': { 'id': this.props.userId },
              'success': (date) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.DeptNows,
                  'dataType': 'text',
                  'data': { 'did': this.props.userDid },
                  'success': (msg) => {
                    this.setState(
                      {
                        roleTree: eval(`(${data})`),
                        roleValue: eval(`(${date})`),
                        options: eval(`(${datr})`),
                        userDid: eval(`(${msg})`),
                        visible: true,
                      }
                    );
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法获取上级部门信息，请检查网络情况');
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法获取当前角色信息，请检查网络情况');
                this.setState(
                  {
                    deptTree: '',
                    visible: false,
                  }
                );
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取角色信息，请检查网络情况');
            this.setState(
              {
                powerTree: '',
                visible: false,
              }
            );
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
  handleOk() {
    this.setState({
      confirmLoading: true,
    });
    this.refs.SetForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserSet,
        'dataType': 'text',
        'data': {
          'id': values.userId,
          'role': window.roleValues || '',
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.refs.SetForm.resetFields();
            openNotificationWithIcon('success', '保存成功', `${values.userName}保存成功，请进行后续操作`);
            this.props.afterSet();
          } else {
            openNotificationWithIcon('error', '保存失败', `无法进行保存操作： ${data.toString()}`);
            this.setState({
              confirmLoading: false,
            });
          }
        },
        'error': () => {
          openNotificationWithIcon('error', '请求错误', '无法完成新增操作，请检查网络情况');
          this.setState({
            confirmLoading: false,
          });
        },
      });
    });
  }
  handleCancel() {
    this.refs.SetForm.resetFields();
    this.setState({
      visible: false,
      roleValue: this.state.roleValue,
    });
  }

  handleReset() {
    this.refs.SetForm.resetFields();
    this.setState({
      roleValue: this.state.roleValue,
    });
  }

  render() {
    const { userId, userName, userPhone, userNumber, userState, userOther, userLogin } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-info btn-xs">角色设置</a>
        <Modal
          maskClosable={false}
          title="角色设置"
          visible={this.state.visible}
          onOk={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>返 回</Button>,
            <Button key="reset" type="ghost" size="large" onClick={this.handleReset}>重 置</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>提 交</Button>,
          ]}
        >
          <SetForm
            ref="SetForm"
            userId={userId.toString()}
            userName={userName}
            userNumber={userNumber}
            userPhone={userPhone}
            userState={userState}
            userOther={userOther}
            userLogin={userLogin}
            userDept={this.state.userDid}
            options={this.state.options}
            roleTree={this.state.roleTree}
            roleValue={this.state.roleValue}
            getRole={this.getRole}
          />
        </Modal>
      </span>
    );
  }
}
SetLink.propTypes = {
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  userDid: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDept: React.PropTypes.string,
  afterSet: React.PropTypes.func,
};
