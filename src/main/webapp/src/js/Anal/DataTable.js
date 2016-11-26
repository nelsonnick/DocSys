import React from 'react';
import { Table } from 'antd';

export default class DataTable extends React.Component {

  render() {
    const { tableData, loading, columns } = this.props;

    return (
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <Table
          scroll={{ y: 480 }}
          useFixedHeader="true"
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  tableData: React.PropTypes.array,
  columns: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
