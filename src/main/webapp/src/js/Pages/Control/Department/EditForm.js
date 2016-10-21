import React from 'react';
import { Form, Input, Select, Cascader } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
class EditFrom extends React.Component {
  constructor(props) {
    super(props);
    this.departmentNameCheck = this.departmentNameCheck.bind(this);
    this.departmentPhoneCheck = this.departmentPhoneCheck.bind(this);
    this.departmentAddressCheck = this.departmentAddressCheck.bind(this);
    this.departmentFatherCheck = this.departmentFatherCheck.bind(this);
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
  departmentFatherCheck(rule, value, callback) {
    let a;
    if (typeof (value) !== 'undefined' && value.toString() !== '' && value.length === 1) {
      a = value[0];
    } else if (typeof (value) !== 'undefined' && value.toString() !== '' && value.length === 2) {
      a = value[1];
    } else if (typeof (value) !== 'undefined' && value.toString() !== '' && value.length === 3) {
      a = value[2];
    } else {
      a = '';
    }
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentFather,
        'dataType': 'text',
        'data': { 'father': a },
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
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const { departmentId, departmentName, departmentPhone, departmentAddress, departmentState, departmentOther, departmentFather, departmentLevel, departmentGrand, options } = this.props;
    const arr = [];
    if (departmentLevel.toString() === '2') {
      arr[0] = departmentFather;
    } else if (departmentLevel.toString() === '3') {
      arr[0] = departmentGrand;
      arr[1] = departmentFather;
    } else {
      arr[0] = '1';
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const departmentIdProps = getFieldProps('departmentId', {
      initialValue: departmentId,
    });
    const departmentNameProps = getFieldProps('departmentName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentNameCheck },
      ],
      initialValue: departmentName,
    });
    const departmentPhoneProps = getFieldProps('departmentPhone', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentPhoneCheck },
      ],
      initialValue: departmentPhone,
    });
    const departmentAddressProps = getFieldProps('departmentAddress', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentAddressCheck },
      ],
      initialValue: departmentAddress,
    });
    const departmentFatherProps = getFieldProps('departmentFather', {
      rules: [
        { validator: this.departmentFatherCheck },
      ],
      initialValue: arr,
    });
    const departmentStateProps = getFieldProps('departmentState', {
      initialValue: departmentState,
    });
    const departmentOtherProps = getFieldProps('departmentOther', {
      initialValue: departmentOther,
    });
    return (
      <Form horizontal>
        <FormItem
          label=""
          {...formItemLayout}
        >
          <Input type="hidden" {...departmentIdProps} />
        </FormItem>
        <FormItem
          label="部门名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentName') ? '校验中...' : (getFieldError('departmentName') || [])}
        >
          <Input placeholder="请输入部门的中文全称" {...departmentNameProps} />
        </FormItem>
        <FormItem
          label="部门电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentPhone') ? '校验中...' : (getFieldError('departmentPhone') || [])}
        >
          <Input placeholder="请输入8位固定电话" {...departmentPhoneProps} />
        </FormItem>
        <FormItem
          label="部门地址"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentAddress') ? '校验中...' : (getFieldError('departmentAddress') || [])}
        >
          <Input placeholder="请输入详细地址" {...departmentAddressProps} />
        </FormItem>
        <FormItem
          label="上级部门"
          {...formItemLayout}
          required
        >
          <Cascader allowClear={false} options={options} changeOnSelect placeholder="请选择上级部门" {...departmentFatherProps} />
        </FormItem>
        <FormItem
          label="部门状态"
          {...formItemLayout}
          required
        >
          <Select size="large" {...departmentStateProps} disabled >
            <Option value="激活">激活</Option>
            <Option value="注销">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" {...departmentOtherProps} />
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
  departmentGrand: React.PropTypes.string,
  departmentLevel: React.PropTypes.string,
  options: React.PropTypes.object,
};
