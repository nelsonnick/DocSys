import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileDept: '',
      fileState: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.download = this.download.bind(this);
  }
  onChangeDept(fileDept) {
    this.setState({ fileDept });
  }
  onChangeState(fileState) {
    this.setState({ fileState });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('personName'), this.props.form.getFieldValue('personNumber'), this.props.form.getFieldValue('fileNumber'), this.state.fileDept, this.state.fileState);
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
          <FormItem label="编号：" >
            {getFieldDecorator('fileNumber')(
              <Input placeholder="请输入档案编号" />
            )}
          </FormItem>
          <FormItem label="姓名：" >
            {getFieldDecorator('personName')(
              <Input placeholder="请输入市民真实姓名" />
            )}
          </FormItem>
          <FormItem label="证件：" >
            {getFieldDecorator('personNumber')(
              <Input placeholder="请输入市民证件号码" />
            )}
          </FormItem>
          <FormItem label="部门：" >
            {getFieldDecorator('fileDept')(
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
          <FormItem label="状态：" >
            {getFieldDecorator('fileState')(
              <Select
                onSelect={this.onChangeState}
                showSearch
                allowClear
                style={{ width: 150 }}
                placeholder="请输入档案状态"
              >
                <Option value="在档">在档</Option>
                <Option value="已提">已提</Option>
              </Select>
            )}
          </FormItem>
          <Button type="primary" htmlType="submit">查找</Button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Button onClick={this.download}>导出</Button>
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
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  fileDept: React.PropTypes.string,
  fileState: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  form: React.PropTypes.object,
};
