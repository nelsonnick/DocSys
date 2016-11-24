import { Modal, Button, notification, Row } from 'antd';
import React from 'react';
import ExtractForm from './ExtractForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class ExtractButton extends React.Component {
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
    this.refs.ExtractForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再更新');
        this.setState({
          confirmLoading: false,
        });
        return;
      }
      window.location.href = `${AjaxFunction.PrintExtract}?pname=${values.pname}&pnumber=${values.pnumber}&location=${values.location}&remark=${values.remark}`;
    });
  }

  handleCancel() {
    this.refs.ExtractForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.ExtractForm.resetFields();
  }


  render() {
    return (
      <Row type="flex" justify="start">
        <Button size="large" type="primary" onClick={this.showModal} icon="plus-circle-o">开提档函</Button>
        <Modal
          maskClosable={false}
          title="开提档函"
          style={{ top: 20 }}
          width={600}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} icon="rollback">返 回</Button>,
            <Button key="reset" type="ghost" size="large" onClick={this.handleReset} icon="retweet">重 置</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk} icon="enter">打 印</Button>,
          ]}
        >
          <ExtractForm
            ref="ExtractForm"
          />
        </Modal>
      </Row>
    );
  }
}
ExtractButton.propTypes = {
};
