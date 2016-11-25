import React from 'react';
import { Cascader } from 'antd';

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.OnChange = this.OnChange.bind(this);
  }

  OnChange(value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <Cascader
        options={this.props.options}
        onChange={this.OnChange}
        placeholder="请选择人员"
        showSearch
      />
    );
  }
}
export default DataSearch;
DataSearch.propTypes = {
  options: React.PropTypes.object,
  onChange: React.PropTypes.func,
};
