import React from 'react';
import { Pagination, Row } from 'antd';

export default class DataPagination extends React.Component {
  render() {
    const { DataCount, onShowSizeChange, onChange, PageNumber } = this.props;
    return (
      <Row type="flex" justify="end">
        <Pagination
          showQuickJumper
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onChange}
          defaultCurrent={PageNumber}
          total={DataCount}
          current={PageNumber}
          showTotal={total => `共 ${total} 条`}
          defaultPageSize={9}
          pageSizeOptions={['9', '18', '27', '36']}
        />
      </Row>
    );
  }
}
DataPagination.propTypes = {
  DataCount: React.PropTypes.string,
  PageNumber: React.PropTypes.string,
  onShowSizeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
};
