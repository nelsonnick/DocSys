import { Modal, Button, notification } from 'antd';
import React from 'react';
import EditForm from './EditForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class EditLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      DeptList: [],
      DeptCount: '',
      UserDept: '',
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentList,
      'dataType': 'text',
      'success': (DeptList) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DepartmentCount,
          'dataType': 'text',
          'data': {
            'QueryString': '',
          },
          'success': (DeptCount) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.DeptNow,
              'dataType': 'text',
              'data': { 'did': this.props.userDid },
              'success': (UserDept) => {
                this.setState(
                  {
                    visible: true,
                    DeptList: eval(`(${DeptList})`),
                    DeptCount,
                    UserDept,
                  }
                );
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法获取当前部门信息，请检查网络情况');
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取部门总数，请检查网络情况');
            this.setState(
              {
                DeptList: '',
                DeptCount: '',
                userDept: '',
                visible: false,
              }
            );
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门列表，请检查网络情况');
        this.setState(
          {
            DeptList: '',
            DeptCount: '',
            userDept: '',
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
    this.refs.EditForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserEdit,
        'dataType': 'text',
        'data': {
          'id': values.userId,
          'name': values.userName,
          'phone': values.userPhone,
          'number': values.userNumber,
          'login': values.userLogin,
          'other': values.userOther || '',
          'did': values.userDid,
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.props.afterEdit();
            this.refs.EditForm.resetFields();
            openNotificationWithIcon('success', '修改成功', '修改成功，请进行后续操作');
          } else {
            openNotificationWithIcon('error', '修改失败', data.toString());
            this.setState({
              confirmLoading: false,
            });
          }
        },
        'error': () => {
          openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
          this.setState({
            confirmLoading: false,
          });
        },
      });
    });
  }

  handleCancel() {
    this.refs.EditForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.EditForm.resetFields();
  }

  render() {
    const { userId, userName, userPhone, userNumber, userState, userOther, userLogin, userDid } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-primary btn-xs" >修改</a>
        <Modal
          maskClosable={false}
          title="修改用户信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>返 回</Button>,
            <Button key="reset" type="ghost" size="large" onClick={this.handleReset}>重 置</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>提 交</Button>,
          ]}
        >
          <EditForm
            ref="EditForm"
            userId={userId.toString()}
            userName={userName}
            userNumber={userNumber}
            userPhone={userPhone}
            userState={userState}
            userOther={userOther}
            userLogin={userLogin}
            userDid={userDid}
            userDept={this.state.UserDept}
            deptList={this.state.DeptList}
            deptCount={this.state.DeptCount}
          />
        </Modal>
      </span>
    );
  }
}
EditLink.propTypes = {
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  userDid: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDept: React.PropTypes.string,
  deptList: React.PropTypes.string,
  deptCount: React.PropTypes.string,
  afterEdit: React.PropTypes.func,
};
