import { Modal, Button, notification, Row } from 'antd';
import React from 'react';
import AddForm from './AddForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      DeptList: [],
      DeptCount: '',
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
            'DeptName': '',
          },
          'success': (DeptCount) => {
            this.setState(
              {
                DeptList: eval(`(${DeptList})`),
                DeptCount,
                visible: true,
              }
            );
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
            this.setState(
              {
                DeptList: '',
                visible: false,
              }
            );
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取当前数据，请检查网络情况');
        this.setState(
          {
            Loading: false,
          }
        );
      },
    });
  }

  handleOk() {
    this.setState({
      confirmLoading: true,
    });
    this.refs.AddForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserAdd,
        'dataType': 'text',
        'data': {
          'name': values.userName,
          'number': values.userNumber,
          'phone': values.userPhone,
          'login': values.userLogin,
          'state': values.userState,
          'did': values.userDept,
          'other': values.userOther || '',
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.refs.AddForm.resetFields();
            openNotificationWithIcon('success', '保存成功', `${values.userName}保存成功，请进行后续操作`);
            this.props.afterAdd();
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
    this.refs.AddForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.AddForm.resetFields();
  }


  render() {
    return (
      <Row type="flex" justify="start">
        <Button type="primary" size="large" onClick={this.showModal} icon="plus-circle-o">新增用户</Button>
        <Modal
          maskClosable={false}
          title="新增用户"
          style={{ top: 20 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} icon="rollback">返 回</Button>,
            <Button key="reset" type="ghost" size="large" onClick={this.handleReset} icon="retweet">重 置</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk} icon="enter">提 交</Button>,
          ]}
        >
          <AddForm
            ref="AddForm"
            deptList={this.state.DeptList}
            deptCount={this.state.DeptCount}
          />
        </Modal>
      </Row>
    );
  }
}
AddButton.propTypes = {
  afterAdd: React.PropTypes.func,
};
