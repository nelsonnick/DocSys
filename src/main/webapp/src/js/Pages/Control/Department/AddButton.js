import { Modal, Button, notification, Row } from 'antd';
import React from 'react';
import AddForm from './AddForm';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
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
      options: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
            visible: true,
          }
        );
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
      let fatherId;
      if (values.departmentFather.length === 1) {
        fatherId = values.departmentFather[0];
      } else if (values.departmentFather.length === 2) {
        fatherId = values.departmentFather[1];
      } else if (values.departmentFather.length === 3) {
        fatherId = values.departmentFather[2];
      } else {
        fatherId = '';
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentAdd,
        'dataType': 'text',
        'data': {
          'name': values.departmentName,
          'phone': values.departmentPhone,
          'address': values.departmentAddress,
          'father': fatherId,
          'state': values.departmentState,
          'other': values.departmentOther || '',
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.refs.AddForm.resetFields();
            openNotificationWithIcon('success', '保存成功', `${values.departmentName}保存成功，请进行后续操作`);
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
        <Button type="primary" size="large" onClick={this.showModal} >新增部门</Button>
        <Modal
          maskClosable={false}
          title="新增部门"
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
          <AddForm ref="AddForm" options={this.state.options} />
        </Modal>
      </Row>
    );
  }
}
AddButton.propTypes = {
  afterAdd: React.PropTypes.func,
};
