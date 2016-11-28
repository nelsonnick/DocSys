import React from 'react';
import { Row, Form, Input, Button } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.download = this.download.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('departmentName'));
  }
  handleReset(e) {
    e.preventDefault();
    this.props.form.setFieldsValue({ departmentName: '' });
    this.props.form.resetFields();
    this.props.resetPage();
  }
  download(e) {
    e.preventDefault();
    this.props.getDownload();
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="部门名称：" >
            <Input placeholder="请输入部门名称" initialValue={this.props.deptName} {...getFieldProps('departmentName')} />
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
  getDownload: React.PropTypes.func,
  resetPage: React.PropTypes.func,
  deptName: React.PropTypes.string,
  form: React.PropTypes.object,
};
