import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
const ButtonGroup = Button.Group;
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
    this.download = this.download.bind(this);
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
    this.props.form.resetFields();
    this.props.resetPage();
  }
  download(e) {
    e.preventDefault();
    this.props.getDownload();
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
          <FormItem label="姓名：" >
            {getFieldDecorator('userName')(
              <Input placeholder="请输入用户真实姓名" />
            )}
          </FormItem>
          <FormItem label="部门：" >
            {getFieldDecorator('userDept')(
              <Select
                onSelect={this.onChangeDept}
                showSearch
                allowClear
                style={{ width: 200 }}
                placeholder="请输入所属部门"
                notFoundContent=""
                optionFilterProp="children"
              >
                {children}
              </Select>
            )}
          </FormItem>
          <ButtonGroup size="large">
            <Button htmlType="submit" icon="search">查找</Button>
            <Button type="ghost" onClick={this.handleReset} icon="reload">重置</Button>
            <Button type="dashed" onClick={this.download} icon="download">导出</Button>
          </ButtonGroup>
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
  getDownload: React.PropTypes.func,
  userName: React.PropTypes.string,
  userDept: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  form: React.PropTypes.object,
};
