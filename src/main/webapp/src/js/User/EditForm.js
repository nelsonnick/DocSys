import React from 'react';
import { Form, Input, Select } from 'antd';
import $ from 'jquery';
import * as AjaxFunction from '../Util/AjaxFunction.js';
const FormItem = Form.Item;
const Option = Select.Option;

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
        'url': AjaxFunction.UserLogins,
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
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { userId, userName, userNumber, userPhone, userLogin, userState, userOther, userDept } = this.props;

    const children = [];
    for (let i = 0; i < this.props.deptCount; i++) {
      children.push(<Option value={this.props.deptList[i][0]}>{this.props.deptList[i][1]}</Option>);
    }

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
          {getFieldDecorator('userId', { initialValue: userId })(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem
          label="真实姓名"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || [])}
        >
          {getFieldDecorator('userName', { initialValue: userName,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userDeptCheck },
            ],
          })(
            <Input placeholder="请输入用户真实姓名" />
          )}
        </FormItem>
        <FormItem
          label="证件号码"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userNumber') ? '校验中...' : (getFieldError('userNumber') || [])}
        >
          {getFieldDecorator('userNumber', { initialValue: userNumber,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userNumberCheck },
            ],
          })(
            <Input placeholder="请输入用户证件号码" />
          )}
        </FormItem>
        <FormItem
          label="联系电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userPhone') ? '校验中...' : (getFieldError('userPhone') || [])}
        >
          {getFieldDecorator('userPhone', { initialValue: userPhone,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userPhoneCheck },
            ],
          })(
            <Input placeholder="请输入用户手机号码" />
          )}
        </FormItem>
        <FormItem
          label="登录名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('userLogin') ? '校验中...' : (getFieldError('userLogin') || [])}
        >
          {getFieldDecorator('userLogin', { initialValue: userLogin,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userLoginCheck },
            ],
          })(
            <Input placeholder="请输入用户登录名称" />
          )}
        </FormItem>
        <FormItem
          label="所属部门"
          {...formItemLayout}
          required
        >
          {getFieldDecorator('userDid', { initialValue: userDept,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
            ],
          })(
            <Select
              style={{ width: 150 }}
              placeholder="请选择所属部门"
            >
              {children}
            </Select>
          )}
        </FormItem>
        <FormItem
          label="用户状态"
          {...formItemLayout}
          required
        >
          {getFieldDecorator('userState', { initialValue: userState })(
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
          {getFieldDecorator('userOther', { initialValue: userOther })(
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
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDid: React.PropTypes.string,
  userDept: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  deptList: React.PropTypes.array,
  deptCount: React.PropTypes.string,
};
