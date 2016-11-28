import React from 'react';
import { Table, Popconfirm, message, notification } from 'antd';
import $ from 'jquery';
import * as AjaxFunction from '../Util/AjaxFunction.js';

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
    this.cancel = this.cancel.bind(this);
    this.resetInfo = this.resetInfo.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }
  active(PersonId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonActive,
      'dataType': 'text',
      'data': {
        'id': PersonId,
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
  abandon(PersonId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonAbandon,
      'dataType': 'text',
      'data': {
        'id': PersonId,
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
  resetInfo(PersonId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonReset,
      'dataType': 'text',
      'data': {
        'id': PersonId,
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
  afterEdit() {
    this.props.afterState();
  }
  cancel() {
    message.error('点击了取消');
  }
  render() {
    const { tableData, loading } = this.props;
    const columns = [{
      title: '人员姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: '证件号码',
      dataIndex: 'number',
      key: 'number',
      width: 100,
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 50,
    }, {
      title: '出生日期',
      dataIndex: 'birth',
      key: 'birth',
      width: 100,
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        if (record.state.toString() === '在档') {
          operate.push(<Popconfirm title={`确定要将人员<${record.name}>转为已提状态？`} okText="转已提" onConfirm={this.abandon.bind(this, record.id)} onCancel={this.cancel}>
            <a className="btn btn-warning btn-xs">转已提</a>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else if (record.state.toString() === '已提') {
          operate.push(<Popconfirm title={`确定要将人员<${record.name}>转为在档状态？`} okText="转在档" onConfirm={this.active.bind(this, record.id)} onCancel={this.cancel}>
            <a className="btn btn-success btn-xs">转在档</a>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push();
        }
        operate.push(<Popconfirm title={`确定要重置人员<${record.name}>的性别和出生日期吗？`} okText="重置" onConfirm={this.resetInfo.bind(this, record.id)} onCancel={this.cancel}>
          <a className="btn btn-info btn-xs">信息重置</a>
        </Popconfirm>);
        operate.push(<span className="ant-divider" />);
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
