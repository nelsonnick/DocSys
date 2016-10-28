import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../Util/AjaxFunction.js';

class EditFrom extends React.Component {
  constructor(props) {
    super(props);
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
    const { fileId, fileNumber, fileRemark, personId, personName, personNumber, personPhone1, personPhone2, personAddress, fileAge, personRemark, departmentName, personInfo, personRetire } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
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
              {getFieldDecorator('fileId', { initialValue: fileId })(
                <Input type="hidden" />
              )}
            </FormItem>
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
                <Input placeholder="请输入市民真实姓名" />
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
                <Input placeholder="请输入市民证件号码" maxlength="18" onChange={this.getFileAge} />
              )}
            </FormItem>
            <FormItem
              label="档案年龄"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('fileAge') ? '校验中...' : (getFieldError('fileAge') || [])}
            >
              {getFieldDecorator('fileAge', { initialValue: fileAge,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.fileAgeCheck },
                ],
              })(
                <Input placeholder="请输入市民档案年龄" maxlength="8" />
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
                <Input placeholder="请输入市民手机号码" maxlength="11" />
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
                <Input placeholder="请输入市民固定电话" maxlength="11" />
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
                <Input placeholder="请输入市民联系地址" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="信息整理"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('personInfo', { initialValue: personInfo })(
                <Select size="large" >
                  <Option value="已完成">已完成</Option>
                  <Option value="未完成">未完成</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="退休情况"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('personRetire', { initialValue: personRetire })(
                <Select size="large" >
                  <Option value="正常退休">正常退休</Option>
                  <Option value="提前退休">提前退休</Option>
                  <Option value="延后退休">延后退休</Option>
                </Select>
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
            <FormItem
              label="个人备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personRemark', { initialValue: personRemark })(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
              )}
            </FormItem>
            <FormItem
              label="档案备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('fileRemark', { initialValue: fileRemark })(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
EditFrom = Form.create({})(EditFrom);
export default EditFrom;
EditFrom.propTypes = {
  form: React.PropTypes.object,
  fileId: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  fileRemark: React.PropTypes.string,
  personId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personPhone1: React.PropTypes.string,
  personPhone2: React.PropTypes.string,
  personAddress: React.PropTypes.string,
  personInfo: React.PropTypes.string,
  personRetire: React.PropTypes.string,
  fileAge: React.PropTypes.string,
  personRemark: React.PropTypes.string,
  departmentName: React.PropTypes.string,
};
