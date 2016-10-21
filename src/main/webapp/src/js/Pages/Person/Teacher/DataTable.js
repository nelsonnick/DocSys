import React from 'react';
import { Table, Popconfirm, message, notification } from 'antd';
import $ from 'jquery';
import EditLink from './EditLink.js';
import LookLink from './LookLink.js';
import SetLink from './SetLink.js';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.abandon = this.abandon.bind(this);
    this.active = this.active.bind(this);
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
    this.resetPass = this.resetPass.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }
  active(UserId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserActive,
      'dataType': 'text',
      'data': {
        'id': UserId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterState();
          openNotificationWithIcon('success', '激活成功', '激活成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '激活失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }
  abandon(UserId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserAbandon,
      'dataType': 'text',
      'data': {
        'id': UserId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterState();
          openNotificationWithIcon('success', '注销成功', '注销成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '注销失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成注销操作，请检查网络情况');
      },
    });
  }
  resetPass(UserId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserReset,
      'dataType': 'text',
      'data': {
        'id': UserId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterDelete();
          openNotificationWithIcon('success', '重置成功', '重置成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '重置失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }
  delete(UserId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserDelete,
      'dataType': 'text',
      'data': {
        'id': UserId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterDelete();
          openNotificationWithIcon('success', '删除成功', '删除成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '删除失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }
  afterEdit() {
    this.props.afterState();
  }
  cancel() {
    message.error('点击了取消');
  }
  render() {
    const { tableData, loading } = this.props;
    const columns = [{
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: '所属部门',
      dataIndex: 'dname',
      key: 'dname',
      width: 100,
    }, {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        const rolePowers = window.rolePower;
        if (rolePowers.indexOf('LokUser,') >= 0) {
          operate.push(
            <LookLink
              userId={record.id}
              userName={record.name}
              userNumber={record.number}
              userPhone={record.phone}
              userState={record.state}
              userOther={record.other}
              userDid={record.did}
              userLogin={record.login}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (rolePowers.indexOf('EdiUser,') >= 0) {
          operate.push(
            <EditLink
              userId={record.id}
              userName={record.name}
              userNumber={record.number}
              userPhone={record.phone}
              userState={record.state}
              userOther={record.other}
              userDid={record.did}
              userLogin={record.login}
              afterEdit={this.afterEdit}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (rolePowers.indexOf('SetUser,') >= 0) {
          operate.push(
            <SetLink
              userId={record.id}
              userName={record.name}
              userNumber={record.number}
              userPhone={record.phone}
              userState={record.state}
              userOther={record.other}
              userDept={record.dname}
              userDid={record.did}
              userLogin={record.login}
              afterEdit={this.afterEdit}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (record.state.toString() === '激活') {
          if (rolePowers.indexOf('AbdUser,') >= 0) {
            operate.push(<Popconfirm title={`确定要注销用户<${record.name}>？`} okText="注销" onConfirm={this.abandon.bind(this, record.id)} onCancel={this.cancel}>
              <a className="btn btn-warning btn-xs">注销</a>
            </Popconfirm>);
            operate.push(<span className="ant-divider" />);
          } else {
            operate.push(<span>&nbsp;</span>);
          }
        } else if (record.state.toString() === '注销') {
          if (rolePowers.indexOf('ActUser,') >= 0) {
            operate.push(<Popconfirm title={`确定要激活用户<${record.name}>？`} okText="激活" onConfirm={this.active.bind(this, record.id)} onCancel={this.cancel}>
              <a className="btn btn-success btn-xs">激活</a>
            </Popconfirm>);
            operate.push(<span className="ant-divider" />);
          } else {
            operate.push(<span>&nbsp;</span>);
          }
        } else {
          operate.push(<span className="ant-divider" />);
        }
        if (rolePowers.indexOf('DelUser,') >= 0) {
          operate.push(<Popconfirm title={`确定要删除用户<${record.name}>？`} okText="删除" onConfirm={this.delete.bind(this, record.id)} onCancel={this.cancel}>
            <a className="btn btn-danger btn-xs">删除</a>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (rolePowers.indexOf('RetUser,') >= 0) {
          operate.push(<Popconfirm title={`确定要重置用户<${record.name}>的密码吗？`} okText="重置" onConfirm={this.resetPass.bind(this, record.id)} onCancel={this.cancel}>
            <a className="btn btn-link btn-xs">密码重置</a>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        return (
          <span>
            {operate}
          </span>
        );
      },
    }];

    return (
        <Table
          scroll={{ y: 480 }}
          useFixedHeader="true"
          rowKey={record => record.id}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
        />
    );
  }
}

DataTable.propTypes = {
  tableData: React.PropTypes.array,
  afterState: React.PropTypes.func,
  afterEdit: React.PropTypes.func,
  afterDelete: React.PropTypes.func,
  loading: React.PropTypes.bool,
};
