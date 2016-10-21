import React from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect } from 'antd';

const treeData = [{
  label: '节点一',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '子节点一',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: '子节点二',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: '节点二',
  value: '0-1',
  key: '0-1',
}];
const Demo = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },
  onChange(value) {
    console.log(arguments);
    console.log('value: '+value);
    this.setState({ value });
  },
  render() {
    return (
      <TreeSelect style={{ width: 300 }}
                  value={this.state.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  onChange={this.onChange}
      />
    );
  },
});

ReactDOM.render(<Demo />, document.body);
