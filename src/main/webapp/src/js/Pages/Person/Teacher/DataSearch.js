import React from 'react';
import { Row, Form, Input, Button, TreeSelect } from 'antd';
const FormItem = Form.Item;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDept: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
  }
  onChangeDept(userDept) {
    this.setState({ userDept });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('userName'), this.state.userDept);
  }
  handleReset(e) {
    e.preventDefault();
    this.props.form.setFieldsValue({ userName: '' });
    this.setState({ userDept: [] });
    this.props.resetPage();
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="真实姓名：" >
            <Input placeholder="请输入用户真实姓名" initialValue={this.props.userName} {...getFieldProps('userName')} />
          </FormItem>
          <FormItem label="所属部门：" >
            <TreeSelect
              {...getFieldProps('userDept')}
              style={{ width: 200 }}
              value={this.state.userDept}
              treeData={this.props.treeData}
              onChange={this.onChangeDept}
              allowClear
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              placeholder="请选择用户所属部门"
            />
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
  userName: React.PropTypes.string,
  userDept: React.PropTypes.array,
  treeData: React.PropTypes.object,
  form: React.PropTypes.object,
};
