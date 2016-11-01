import React from 'react';
import { Row, Form, Select } from 'antd';
const FormItem = Form.Item;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDept = this.onChangeDept.bind(this);
  }
  onChangeDept() {
    this.props.onChange(this.props.form.getFieldValue('userDept'));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < this.props.deptCount; i++) {
      children.push(<Option value={this.props.deptList[i][0]}>{this.props.deptList[i][1]}</Option>);
    }
    return (
      <Row type="flex" justify="end">
        <Form inline >
          <FormItem label="部门：" >
            {getFieldDecorator('userDept', { initialValue: this.props.userDept })(
              <Select
                onSelect={this.onChangeDept}
                showSearch
                allowClear
                style={{ width: 150 }}
                placeholder="请输入所属部门"
              >
                {children}
              </Select>
            )}
          </FormItem>
        </Form>
      </Row>
    );
  }
}
DataSearch = Form.create({})(DataSearch);
export default DataSearch;
DataSearch.propTypes = {
  userDept: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  onChange: React.PropTypes.func,
  form: React.PropTypes.object,
};
