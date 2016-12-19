import { Modal, Button, notification } from 'antd';
import React from 'react';
import PolityForm from './PolityForm';
import * as AjaxFunction from '../Util/AjaxFunction.js';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class PolityLink extends React.Component {
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
    this.refs.PolityForm.validateFields((errors, values) => {
      if (!!errors) {
        openNotificationWithIcon('error', '录入错误', '录入的信息中有错误，请核实后再打印');
        this.setState({
          confirmLoading: false,
        });
        return;
      }

      window.location.href = `${AjaxFunction.PrintPolity}?fid=${values.fileId}&pnation=${values.personNation}&plearn=${values.personLearn}&pface=${values.personFace}&pleave=${values.personLeave}&pwork=${values.personWork}&pzl=${values.personZL}&pwg=${values.personWG}&pls=${values.personLS}&pfl=${values.personFL}&premark=${values.personRemark}`;
    });
  }

  handleCancel() {
    this.refs.PolityForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleReset() {
    this.refs.PolityForm.resetFields();
  }

  render() {
    const { fileId, personName, personNumber, personSex, personBirth } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-default btn-xs" >政审证明</a>
        <Modal
          maskClosable={false}
          title="打印政审材料"
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
          <PolityForm
            ref="PolityForm"
            fileId={fileId.toString()}
            personName={personName}
            personNumber={personNumber}
            personSex={personSex}
            personBirth={personBirth}
          />
        </Modal>
      </span>
    );
  }
}
PolityLink.propTypes = {
  fileId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personSex: React.PropTypes.string,
  personBirth: React.PropTypes.string,
};
