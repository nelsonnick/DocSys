import React from 'react';
import { Row, Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('departmentName'));
  }
  handleReset(e) {
    e.preventDefault();
    this.props.form.setFieldsValue({ departmentName: '' });
    this.props.resetPage();
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="部门名称：" >
            <Input placeholder="请输入部门名称" initialValue={this.props.QueryString} {...getFieldProps('departmentName')} />
          </FormItem>
          <Button type="primary" htmlType="submit">查找</Button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </Form>
      </Row>
    );
  }
}
DataSearch = Form.create({})(DataSearch);
export default DataSearch;
DataSearch.propTypes = {
  setQuery: React.PropTypes.func,
  resetPage: React.PropTypes.func,
  QueryString: React.PropTypes.string,
  form: React.PropTypes.object,
};
