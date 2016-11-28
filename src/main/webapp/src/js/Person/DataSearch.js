import React from 'react';
import { Row, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personState: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.download = this.download.bind(this);
  }
  onChangeState(personState) {
    this.setState({ personState });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('personName'), this.props.form.getFieldValue('personNumber'), this.state.personState);
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
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
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
          <FormItem label="状态：" >
            {getFieldDecorator('personState')(
              <Select
                onSelect={this.onChangeState}
                showSearch
                allowClear
                style={{ width: 120 }}
                placeholder="请输入人员状态"
                notFoundContent=""
                optionFilterProp="children"
              >
                <Option value="在档">在档</Option>
                <Option value="已提">已提</Option>
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
  personState: React.PropTypes.string,
  form: React.PropTypes.object,
};
