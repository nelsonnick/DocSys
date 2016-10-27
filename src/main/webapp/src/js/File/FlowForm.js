import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../Util/AjaxFunction.js';
import moment from 'moment';

// 推荐在入口文件全局设置 locale 与时区
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');

class FlowFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FileAge: '',
    };
    this.fileNumberCheck = this.fileNumberCheck.bind(this);
    this.personNameCheck = this.personNameCheck.bind(this);
    this.personNumberCheck = this.personNumberCheck.bind(this);
    this.personPhone1Check = this.personPhone1Check.bind(this);
    this.personPhone2Check = this.personPhone2Check.bind(this);
    this.personAddressCheck = this.personAddressCheck.bind(this);
    this.fileAgeCheck = this.fileAgeCheck.bind(this);
    this.fileDirectCheck = this.fileDirectCheck.bind(this);
    this.getFileAge = this.getFileAge.bind(this);
  }
  getFileAge() {
    const number = this.refs.personNumber;
    const parse = '/d{17}[0-9,X]';
    if (parse.exec(number)) {
      this.setState(
        {
          FileAge: moment(number.substring(6, 10) & '-' & number.substring(10, 12) & '-' & number.substring(12, 14), 'YYYY-MM-DD'),
        }
      );
    }
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
  fileAgeCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonAge,
        'dataType': 'text',
        'data': { 'age': value },
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
  fileDirectCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.FileDirect,
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
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { fileId, fileNumber, fileRemark, personId, personName, personNumber, personPhone1, personPhone2, personAddress, fileAge, personRemark, departmentName } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
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
            <Input placeholder="请输入市民证件号码" maxlength="18" onChange={this.getFileAge} ref="personNumber" disabled />
          )}
        </FormItem>
        <FormItem
          label="档案年龄"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('fileAge') ? '校验中...' : (getFieldError('fileAge') || [])}
        >
          {getFieldDecorator('fileAge', { initialValue: moment(fileAge, 'YYYY-MM-DD'),
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.fileAgeCheck },
            ],
          })(
            <DatePicker size="large" Value={this.state.FileAge} disabled />
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
            <Input placeholder="请输入用户手机号码" maxlength="11" disabled />
          )}
        </FormItem>
        <FormItem
          label="联系电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('personPhone2') ? '校验中...' : (getFieldError('personPhone2') || [])}
        >
          {getFieldDecorator('personPhone2', { initialValue: personPhone2,
            rules: [
              { validator: this.personPhone2Check },
            ],
          })(
            <Input placeholder="请输入市民手机号码" maxlength="11" disabled />
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
        <FormItem
          label="档案去向"
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
            <Input placeholder="请输入档案的去向" />
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
          {getFieldDecorator('fileRemark', { initialValue: fileRemark })(
            <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled />
          )}
        </FormItem>
        <FormItem
          label="转出备注"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('flowRemark')(
            <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
          )}
        </FormItem>
      </Form>
    );
  }
}
FlowFrom = Form.create({})(FlowFrom);
export default FlowFrom;
FlowFrom.propTypes = {
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
  fileAge: React.PropTypes.string,
  personRemark: React.PropTypes.string,
  departmentName: React.PropTypes.string,
};