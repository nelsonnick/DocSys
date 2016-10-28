import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import $ from 'jquery';
import * as AjaxFunction from '../Util/AjaxFunction.js';

const FormItem = Form.Item;
const Option = Select.Option;

class BackFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FileAge: '',
    };
    this.fileAgeCheck = this.fileAgeCheck.bind(this);
    this.fileNumberCheck = this.fileNumberCheck.bind(this);
    this.personNameCheck = this.personNameCheck.bind(this);
    this.personNumberCheck = this.personNumberCheck.bind(this);
    this.personPhone1Check = this.personPhone1Check.bind(this);
    this.personPhone2Check = this.personPhone2Check.bind(this);
    this.personAddressCheck = this.personAddressCheck.bind(this);
    this.flowDirectCheck = this.flowDirectCheck.bind(this);
    this.flowReasonCheck = this.flowReasonCheck.bind(this);
  }
  componentWillMount() {
    const a = this.props.toString();
    this.setState(
      {
        FileAge: a.substring(0, 4) & a.substring(5, 7) & a.substring(8, 10),
      }
    );
  }
  personNumberCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonNumber,
        'dataType': 'text',
        'data': { 'number': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  personPhone1Check(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonPhone1,
        'dataType': 'text',
        'data': { 'phone': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  personPhone2Check(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonPhone2,
        'dataType': 'text',
        'data': { 'phone': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  personAddressCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonAddress,
        'dataType': 'text',
        'data': { 'address': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  flowDirectCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FlowDirect,
        'dataType': 'text',
        'data': { 'direct': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  flowReasonCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FlowReason,
        'dataType': 'text',
        'data': { 'reason': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  personNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonName,
        'dataType': 'text',
        'data': { 'name': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  fileNumberCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FileNumber,
        'dataType': 'text',
        'data': { 'number': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  fileAgeCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonAge,
        'dataType': 'text',
        'data': { 'fileAge': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { fileNumber, personId, personName, personNumber, personPhone1, personPhone2, personAddress, fileAge, personRemark, departmentName } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <Row>
          <Col span={12}>
            <FormItem
              label=""
              {...formItemLayout}
            >
              {getFieldDecorator('personId', { initialValue: personId })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem
              label="档案编号"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('fileNumber') ? '校验中...' : (getFieldError('fileNumber') || [])}
            >
              {getFieldDecorator('fileNumber', { initialValue: fileNumber,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.fileNumberCheck },
                ],
              })(
                <Input placeholder="请输入档案编号" disabled />
              )}
            </FormItem>
            <FormItem
              label="人员姓名"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personName') ? '校验中...' : (getFieldError('personName') || [])}
            >
              {getFieldDecorator('personName', { initialValue: personName,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.personNameCheck },
                ],
              })(
                <Input placeholder="请输入市民真实姓名" disabled />
              )}
            </FormItem>
            <FormItem
              label="证件号码"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personNumber') ? '校验中...' : (getFieldError('personNumber') || [])}
            >
              {getFieldDecorator('personNumber', { initialValue: personNumber,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.personNumberCheck },
                ],
              })(
                <Input placeholder="请输入市民证件号码" maxlength="18" disabled />
              )}
            </FormItem>
            <FormItem
              label="档案年龄"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('fileAge') ? '校验中...' : (getFieldError('fileAge') || [])}
            >
              {getFieldDecorator('fileAge', { initialValue: this.state.FileAge,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.fileAgeCheck },
                ],
              })(
                <Input placeholder="请输入市民档案年龄" maxlength="8" disabled />
              )}
            </FormItem>
            <FormItem
              label="联系电话"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personPhone1') ? '校验中...' : (getFieldError('personPhone1') || [])}
            >
              {getFieldDecorator('personPhone1', { initialValue: personPhone1,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.personPhone1Check },
                ],
              })(
                <Input placeholder="请输入市民手机号码" maxlength="11" disabled />
              )}
            </FormItem>
            <FormItem
              label="联系电话"
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating('personPhone2') ? '校验中...' : (getFieldError('personPhone2') || [])}
            >
              {getFieldDecorator('personPhone2', { initialValue: personPhone2,
                rules: [
                  { validator: this.personPhone2Check },
                ],
              })(
                <Input placeholder="请输入市民固定电话" maxlength="11" disabled />
              )}
            </FormItem>
            <FormItem
              label="联系地址"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personAddress') ? '校验中...' : (getFieldError('personAddress') || [])}
            >
              {getFieldDecorator('personAddress', { initialValue: personAddress,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.personAddressCheck },
                ],
              })(
                <Input placeholder="请输入市民联系地址" disabled />
              )}
            </FormItem>
            <FormItem
              label="存档部门"
              {...formItemLayout}
              hasFeedback
              required
            >
              {getFieldDecorator('departmentName', { initialValue: departmentName })(
                <Input disabled />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="档案来源"
              {...formItemLayout}
              required
              help={isFieldValidating('fileDirect') ? '校验中...' : (getFieldError('fileDirect') || [])}
            >
              {getFieldDecorator('fileDirect', { initialValue: '未知',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.fileDirectCheck },
                ],
              })(
                <Input placeholder="请输入档案的来源" />
              )}
            </FormItem>
            <FormItem
              label="存档原因"
              {...formItemLayout}
              required
              help={isFieldValidating('flowReason') ? '校验中...' : (getFieldError('flowReason') || [])}
            >
              {getFieldDecorator('flowReason', { initialValue: '个人要求',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.flowReasonCheck },
                ],
              })(
                <Input placeholder="请输入存档的原因" />
              )}
            </FormItem>
            <FormItem
              label="传递方式"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('flowType', { initialValue: '个人' })(
                <Select size="large" >
                  <Option value="个人">个人</Option>
                  <Option value="专人">专人</Option>
                  <Option value="邮寄">邮寄</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="人员备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personRemark', { initialValue: personRemark })(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled />
              )}
            </FormItem>
            <FormItem
              label="档案备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('fileRemark')(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
              )}
            </FormItem>
            <FormItem
              label="转入备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('flowRemark')(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
BackFrom = Form.create({})(BackFrom);
export default BackFrom;
BackFrom.propTypes = {
  form: React.PropTypes.object,
  fileNumber: React.PropTypes.string,
  personId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personPhone1: React.PropTypes.string,
  personPhone2: React.PropTypes.string,
  personAddress: React.PropTypes.string,
  fileAge: React.PropTypes.string,
  personRemark: React.PropTypes.string,
  departmentName: React.PropTypes.string,
};
