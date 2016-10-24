import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
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
    const children = [];
    for (let i = 1; i < this.props.deptCount; i++) {
      console.log(this.props.deptList);
      children.push(<Option value={this.props.deptList[0][i]}>{this.props.deptList[1][i]}</Option>);
    }
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="真实姓名：" >
            <Input placeholder="请输入用户真实姓名" initialValue={this.props.userName} {...getFieldProps('userName')} />
          </FormItem>
          <FormItem label="所属部门：" >
            <Select
              tags
              style={{ width: '100%' }}
              searchPlaceholder="标签模式"
              placeholder="请输入所属部门"
            >
              {children}
            </Select>
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
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  form: React.PropTypes.object,
};
