import React from 'react';
import { Table } from 'antd';

export default class DataTable extends React.Component {

  render() {
    const { tableData, loading } = this.props;

    const columns = [{
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: '部门编号',
      dataIndex: 'number',
      key: 'number',
      width: 50,
    }, {
      title: '办公电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    }, {
      title: '邮政编码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    }, {
      title: '办公地点',
      dataIndex: 'address',
      key: 'address',
      width: 220,
    }, {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      width: 50,
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
