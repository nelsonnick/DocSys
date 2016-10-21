import React from 'react';
import { Form, Input, Select, Cascader } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
class EditFrom extends React.Component {
  constructor(props) {
    super(props);
    this.userNameCheck = this.userNameCheck.bind(this);
    this.userNumberCheck = this.userNumberCheck.bind(this);
    this.userPhoneCheck = this.userPhoneCheck.bind(this);
    this.userLoginCheck = this.userLoginCheck.bind(this);
  }

  userNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserName,
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
  userNumberCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserNumber,
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
  userPhoneCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserPhone,
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
  userLoginCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserLogin,
        'dataType': 'text',
        'data': { 'login': value },
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
    const { userId, userName, userNumber, userPhone, userLogin, userState, userOther, userDept, options } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const userIdProps = getFieldProps('userId', {
      initialValue: userId,
    });
    const userNameProps = getFieldProps('userName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.userNameCheck },
      ],
      initialValue: userName,
    });
    const userNumberProps = getFieldProps('userNumber', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.userNumberCheck },
      ],
      initialValue: userNumber,
    });
    const userPhoneProps = getFieldProps('userPhone', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.userPhoneCheck },
      ],
      initialValue: userPhone,
    });
    const userLoginProps = getFieldProps('userLogin', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.userLoginCheck },
      ],
      initialValue: userLogin,
    });
    const userDeptProps = getFieldProps('userDept', {
      initialValue: userDept,
    });
    const userStateProps = getFieldProps('userState', {
      initialValue: userState,
    });
    const userOtherProps = getFieldProps('userOther', {
      initialValue: userOther,
    });
    return (
      <Form horizontal>
        <FormItem
          label=""
          {...formItemLayout}
        >
          <Input type="hidden" {...userIdProps} />
        </FormItem>
        <FormItem
          label="真实姓名"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || [])}
        >
          <Input placeholder="请输入用户真实姓名" {...userNameProps} />
        </FormItem>
        <FormItem
          label="证件号码"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userNumber') ? '校验中...' : (getFieldError('userNumber') || [])}
        >
          <Input placeholder="请输入用户证件号码" {...userNumberProps} />
        </FormItem>
        <FormItem
          label="联系电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userPhone') ? '校验中...' : (getFieldError('userPhone') || [])}
        >
          <Input placeholder="请输入用户手机号码" {...userPhoneProps} />
        </FormItem>
        <FormItem
          label="登录名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userLogin') ? '校验中...' : (getFieldError('userLogin') || [])}
        >
          <Input placeholder="请输入用户登录名称" {...userLoginProps} />
        </FormItem>
        <FormItem
          label="所属部门"
          {...formItemLayout}
          required
        >
          <Cascader allowClear={false} options={options} changeOnSelect placeholder="请选择所属部门" {...userDeptProps} />
        </FormItem>
        <FormItem
          label="用户状态"
          {...formItemLayout}
          required
        >
          <Select size="large" {...userStateProps} disabled >
            <Option value="激活">激活</Option>
            <Option value="注销">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" {...userOtherProps} />
        </FormItem>
      </Form>
    );
  }
}
EditFrom = Form.create({})(EditFrom);
export default EditFrom;
EditFrom.propTypes = {
  form: React.PropTypes.object,
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDept: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  options: React.PropTypes.object,
};
