import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDept: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
  }
  onChangeDept(userDept) {
    this.setState({ userDept });
    console.log(`%c已选择第 ${userDept}个部门`, 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
    console.log(`已选择第 ${userDept}个部门`);
    console.log("%c我是红色！！！","color:red");
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('userName'), this.state.userDept);
  }
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.props.resetPage();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < this.props.deptCount; i++) {
      children.push(<Option value={this.props.deptList[i][0]}>{this.props.deptList[i][1]}</Option>);
    }
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="真实姓名：" >
            {getFieldDecorator('userName')(
              <Input placeholder="请输入用户真实姓名" />
            )}
          </FormItem>
          <FormItem label="所属部门：" >
            {getFieldDecorator('userDept')(
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
  userDept: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  form: React.PropTypes.object,
};
