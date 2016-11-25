import React from 'react';
import { Select } from 'antd';
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(value) {
    this.props.onChange(value);
  }

  render() {
    const children = [];
    for (let i = 0; i < this.props.deptCount; i++) {
      children.push(<Option value={this.props.deptList[i][0]}>{this.props.deptList[i][1]}</Option>);
    }
    return (
      <Select
        onSelect={this.onSelect}
        showSearch
        allowClear
        style={{ width: 200 }}
        placeholder="请选择部门"
        notFoundContent=""
        optionFilterProp="children"
      >
        {children}
      </Select>
    );
  }
}
export default DataSearch;
DataSearch.propTypes = {
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  onChange: React.PropTypes.func,
};
