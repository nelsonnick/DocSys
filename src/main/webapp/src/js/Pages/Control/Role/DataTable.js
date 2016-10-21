import React from 'react';
import { Table, Popconfirm, message, notification } from 'antd';
import $ from 'jquery';
import EditLink from './EditLink.js';
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
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }

  delete(RoleId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleDelete,
      'dataType': 'text',
      'data': {
        'id': RoleId,
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
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: '角色说明',
      dataIndex: 'other',
      key: 'other',
      width: 150,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        const rolePowers = window.rolePower;
        if (rolePowers.indexOf('SetRole,') >= 0) {
          operate.push(
            <SetLink
              roleId={record.id}
              roleName={record.name}
              roleOther={record.other}
              afterSet={this.afterEdit}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (rolePowers.indexOf('EdiRole,') >= 0) {
          operate.push(
            <EditLink
              roleId={record.id}
              roleName={record.name}
              roleOther={record.other}
              afterEdit={this.afterEdit}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
        if (rolePowers.indexOf('DelRole,') >= 0) {
          operate.push(<Popconfirm title={`确定要删除角色<${record.name}>？`} okText="删除" onConfirm={this.delete.bind(this, record.id)} onCancel={this.cancel}>
            <a className="btn btn-danger btn-xs">删除</a>
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
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <Table
          scroll={{ y: 480 }}
          useFixedHeader="true"
          rowKey={record => record.id}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
        />
      </div>
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
