import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileDept: '',
      flowFlow: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
    this.onChangeFlow = this.onChangeFlow.bind(this);
    this.download = this.download.bind(this);
  }
  onChangeDept(fileDept) {
    this.setState({ fileDept });
  }
  onChangeFlow(flowFlow) {
    this.setState({ flowFlow });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('personName'), this.props.form.getFieldValue('personNumber'), this.props.form.getFieldValue('fileNumber'), this.state.fileDept, this.state.flowFlow);
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
                style={{ width: 200 }}
                placeholder="请输入所属部门"
                notFoundContent=""
                optionFilterProp="children"
              >
                {children}
              </Select>
            )}
          </FormItem>
          <FormItem label="流向：" >
            {getFieldDecorator('flowFlow')(
              <Select
                onSelect={this.onChangeFlow}
                showSearch
                allowClear
                style={{ width: 120 }}
                placeholder="请输入档案流向"
                notFoundContent=""
                optionFilterProp="children"
              >
                <Option value="转入">转入</Option>
                <Option value="转出">转出</Option>
                <Option value="重存">重存</Option>
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
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  fileDept: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
  form: React.PropTypes.object,
};
