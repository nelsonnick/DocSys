import { Modal, Button, notification } from 'antd';
import React from 'react';
import BackForm from './BackForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class BackLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileNumber: '',
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FileNew,
      'dataType': 'text',
      'success': (FileNew) => {
        this.setState(
          {
            fileNumber: FileNew,
            visible: true,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
      },
    });
  }

  handleOk() {
    this.setState({
      confirmLoading: true,
    });
    this.refs.BackForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FileBack,
        'dataType': 'text',
        'data': {
          'fnumber': values.fileNumber,
          'pid': values.personId,
          'pphone1': values.personPhone1,
          'pphone2': values.personPhone2 || '',
          'paddress': values.personAddress,
          'ltype': values.flowType,
          'ldirect': values.flowDirect || '',
          'lreason': values.flowReason || '',
          'premark': values.personRemark || '',
          'fremark': values.fileRemark || '',
          'lremark': values.flowRemark || '',
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
    this.refs.BackForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.BackForm.resetFields();
  }

  render() {
    const { personId, personName, personNumber, personPhone1, personPhone2, personAddress, fileAge, personRemark } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-primary btn-xs" >重存</a>
        <Modal
          maskClosable={false}
          title="重新存档"
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
          <BackForm
            ref="BackForm"
            fileNumber={this.state.fileNumber}
            personId={personId.toString()}
            personName={personName}
            personNumber={personNumber}
            personPhone1={personPhone1}
            personPhone2={personPhone2}
            personAddress={personAddress}
            fileAge={fileAge}
            personRemark={personRemark}
            departmentName={window.CurrentDepartment}
          />
        </Modal>
      </span>
    );
  }
}
BackLink.propTypes = {
  fileNumber: React.PropTypes.string,
  personId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personPhone1: React.PropTypes.string,
  personPhone2: React.PropTypes.string,
  personAddress: React.PropTypes.string,
  fileAge: React.PropTypes.string,
  personRemark: React.PropTypes.string,
  afterEdit: React.PropTypes.func,
};
