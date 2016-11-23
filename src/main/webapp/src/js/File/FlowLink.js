import { Modal, Button, notification } from 'antd';
import React from 'react';
import FlowForm from './FlowForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class FlowLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  showModal() {
    this.setState(
      {
        visible: true,
      }
    );
  }

  handleOk() {
    this.setState({
      confirmLoading: true,
    });
    this.refs.FlowForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FileFlow,
        'dataType': 'text',
        'data': {
          'fid': values.fileId,
          'pid': values.personId,
          'ltype': values.flowType,
          'ldirect': values.flowDirect || '',
          'lreason': values.flowReason || '',
          'lremark': values.flowRemark || '',
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.props.afterEdit();
            this.refs.FlowForm.resetFields();
            openNotificationWithIcon('success', '变更成功', '变更成功，请进行后续操作');
          } else {
            openNotificationWithIcon('error', '变更失败', data.toString());
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
    this.refs.FlowForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.FlowForm.resetFields();
  }

  render() {
    const { fileId, fileNumber, fileRemark, personId, personName, personNumber, personPhone1, personPhone2, personAddress, fileAge, personRemark, departmentName } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-danger btn-xs" >提取</a>
        <Modal
          maskClosable={false}
          title="档案提取"
          style={{ top: 20 }}
          width={600}
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
          <FlowForm
            ref="FlowForm"
            fileId={fileId.toString()}
            fileNumber={fileNumber}
            fileRemark={fileRemark}
            personId={personId.toString()}
            personName={personName}
            personNumber={personNumber}
            personPhone1={personPhone1}
            personPhone2={personPhone2}
            personAddress={personAddress}
            fileAge={fileAge}
            personRemark={personRemark}
            departmentName={departmentName}
          />
        </Modal>
      </span>
    );
  }
}
FlowLink.propTypes = {
  fileId: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  fileRemark: React.PropTypes.string,
  personId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personPhone1: React.PropTypes.string,
  personPhone2: React.PropTypes.string,
  personAddress: React.PropTypes.string,
  fileAge: React.PropTypes.string,
  personRemark: React.PropTypes.string,
  departmentName: React.PropTypes.string,
  afterEdit: React.PropTypes.func,
};
