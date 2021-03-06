import React from 'react';
import { Form, Input, Select } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../Util/AjaxFunction.js';
class EditFrom extends React.Component {
  constructor(props) {
    super(props);
    this.departmentNameCheck = this.departmentNameCheck.bind(this);
    this.departmentPhoneCheck = this.departmentPhoneCheck.bind(this);
    this.departmentAddressCheck = this.departmentAddressCheck.bind(this);
    this.departmentNumberCheck = this.departmentNumberCheck.bind(this);
    this.departmentCodeCheck = this.departmentCodeCheck.bind(this);
  }

  departmentNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentNames,
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
  departmentPhoneCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentPhone,
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
  departmentAddressCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentAddress,
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
  departmentNumberCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentNumbers,
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
  departmentCodeCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentCode,
        'dataType': 'text',
        'data': { 'code': value },
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
    const { departmentId, departmentName, departmentPhone, departmentAddress, departmentState, departmentOther, departmentNumber, departmentCode } = this.props;

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
          {getFieldDecorator('departmentId', { initialValue: departmentId })(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem
          label="部门名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentName') ? '校验中...' : (getFieldError('departmentName') || [])}
        >
          {getFieldDecorator('departmentName', { initialValue: departmentName,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.departmentNameCheck },
            ],
          })(
            <Input placeholder="请输入部门的中文全称" />
          )}
        </FormItem>
        <FormItem
          label="部门编号"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentNumber') ? '校验中...' : (getFieldError('departmentNumber') || [])}
        >
          {getFieldDecorator('departmentNumber', { initialValue: departmentNumber,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.departmentNumberCheck },
            ],
          })(
            <Input placeholder="请输入部门的编号" />
          )}
        </FormItem>
        <FormItem
          label="部门电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentPhone') ? '校验中...' : (getFieldError('departmentPhone') || [])}
        >
          {getFieldDecorator('departmentPhone', { initialValue: departmentPhone,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.departmentPhoneCheck },
            ],
          })(
            <Input placeholder="请输入8位固定电话" />
          )}
        </FormItem>
        <FormItem
          label="部门地址"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentAddress') ? '校验中...' : (getFieldError('departmentAddress') || [])}
        >
          {getFieldDecorator('departmentAddress', { initialValue: departmentAddress,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.departmentAddressCheck },
            ],
          })(
            <Input placeholder="请输入详细地址" />
          )}
        </FormItem>
        <FormItem
          label="邮政编码"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentCode') ? '校验中...' : (getFieldError('departmentCode') || [])}
        >
          {getFieldDecorator('departmentCode', { initialValue: departmentCode,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.departmentCodeCheck },
            ],
          })(
            <Input placeholder="请输入6位邮政编码" />
          )}
        </FormItem>
        <FormItem
          label="部门状态"
          {...formItemLayout}
          required
        >
          {getFieldDecorator('departmentState', { initialValue: departmentState })(
            <Select size="large" disabled >
              <Option value="激活">激活</Option>
              <Option value="注销">注销</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('departmentOther', { initialValue: departmentOther })(
            <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
          )}
        </FormItem>
      </Form>
    );
  }
}
EditFrom = Form.create({})(EditFrom);
export default EditFrom;
EditFrom.propTypes = {
  form: React.PropTypes.object,
  departmentId: React.PropTypes.string,
  departmentName: React.PropTypes.string,
  departmentAddress: React.PropTypes.string,
  departmentPhone: React.PropTypes.string,
  departmentFather: React.PropTypes.string,
  departmentState: React.PropTypes.string,
  departmentOther: React.PropTypes.string,
  departmentNumber: React.PropTypes.string,
  departmentCode: React.PropTypes.string,
};
