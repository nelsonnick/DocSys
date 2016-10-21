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
      powerValue: [],
      deptValue: [],
      powerTree: [],
      deptTree: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getPower = this.getPower.bind(this);
    this.getDept = this.getDept.bind(this);
  }
  getPower(powerValue) {
    window.powerValues = powerValue;
  }
  getDept(deptValue) {
    window.deptValues = deptValue;
  }
  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PowerTree,
      'dataType': 'text',
      'success': (data) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DeptTree,
          'dataType': 'text',
          'success': (date) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.PowerNow,
              'dataType': 'text',
              'data': {
                'id': this.props.roleId,
              },
              'success': (dat) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.DeptNow,
                  'dataType': 'text',
                  'data': {
                    'id': this.props.roleId,
                  },
                  'success': (da) => {
                    this.setState(
                      {
                        deptTree: eval(`(${date})`),
                        powerTree: eval(`(${data})`),
                        deptValue: eval(`(${da})`),
                        powerValue: eval(`(${dat})`),
                        visible: true,
                      }
                    );
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法获取当前部门信息，请检查网络情况');
                    this.setState(
                      {
                        deptValue: [],
                        visible: false,
                      }
                    );
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法获取当前权限信息，请检查网络情况');
                this.setState(
                  {
                    powerValue: [],
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
                deptTree: '',
                visible: false,
              }
            );
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取权限信息，请检查网络情况');
        this.setState(
          {
            powerTree: '',
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
        'url': AjaxFunction.RoleSet,
        'dataType': 'text',
        'data': {
          'id': values.roleId,
          'power': window.powerValues || '',
          'department': window.deptValues || '',
        },
        'success': (data) => {
          if (data.toString() === 'OK') {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.refs.SetForm.resetFields();
            openNotificationWithIcon('success', '保存成功', `${values.roleName}保存成功，请进行后续操作`);
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
      powerValue: this.state.powerValue,
      deptValue: this.state.deptValue,
    });
  }

  handleReset() {
    this.refs.SetForm.resetFields();
    this.setState({
      powerValue: this.state.powerValue,
      deptValue: this.state.deptValue,
    });
  }

  render() {
    const { roleId, roleName, roleOther } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-default btn-xs">权限设置</a>
        <Modal
          maskClosable={false}
          title="权限设置"
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
            roleId={roleId.toString()}
            roleName={roleName}
            roleOther={roleOther}
            powerTree={this.state.powerTree}
            deptTree={this.state.deptTree}
            powerValue={this.state.powerValue}
            deptValue={this.state.deptValue}
            getPower={this.getPower}
            getDept={this.getDept}
          />
        </Modal>
      </span>
    );
  }
}
SetLink.propTypes = {
  roleId: React.PropTypes.string,
  roleName: React.PropTypes.string,
  roleOther: React.PropTypes.string,
  afterSet: React.PropTypes.func,
};
