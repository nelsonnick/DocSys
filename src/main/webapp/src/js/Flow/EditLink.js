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
        'url': AjaxFunction.FlowEdit,
        'dataType': 'text',
        'data': {
          'lid': values.flowId,
          'lreason': values.flowReason || '',
          'lremark': values.flowRemark || '',
          'ltype': values.flowType || '',
          'ldirect': values.flowDirect || '',
          'uid': values.userId,
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
    const { userId, flowId, fileNumber, personName, personNumber, departmentName, flowReason, flowDirect, flowType, flowRemark, flowFlow } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-primary btn-xs" >修改</a>
        <Modal
          maskClosable={false}
          title="修改变更信息"
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
            flowId={flowId.toString()}
            fileNumber={fileNumber}
            personName={personName}
            personNumber={personNumber}
            departmentName={departmentName}
            flowReason={flowReason}
            flowDirect={flowDirect}
            flowType={flowType}
            flowFlow={flowFlow}
            flowRemark={flowRemark}
          />
        </Modal>
      </span>
    );
  }
}
EditLink.propTypes = {
  userId: React.PropTypes.string,
  flowId: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  departmentName: React.PropTypes.string,
  flowReason: React.PropTypes.string,
  flowDirect: React.PropTypes.string,
  flowType: React.PropTypes.string,
  flowRemark: React.PropTypes.string,
  flowFlow: React.PropTypes.string,
  afterEdit: React.PropTypes.func,
};
