import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../Util/AjaxFunction.js';
const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
class Pass extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.userPassOCheck = this.userPassOCheck.bind(this);
    this.userPassNCheck = this.userPassNCheck.bind(this);
  }
  userPassOCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserPassOld,
        'dataType': 'text',
        'data': { 'pass': value },
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
  userPassNCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.UserPassNew,
        'dataType': 'text',
        'data': { 'pass': value },
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
  handleSubmit() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserPass,
      'dataType': 'text',
      'data': {
        'passBefore': this.props.form.getFieldValue('passBefore'),
        'passAfter1': this.props.form.getFieldValue('passAfter1'),
        'passAfter2': this.props.form.getFieldValue('passAfter2'),
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.form.resetFields();
          openNotificationWithIcon('success', '修改成功', '修改成功，请重新登录');
          $('#c').attr('href', '/logout');
          document.getElementById('c').click();
        } else {
          openNotificationWithIcon('error', '修改失败', data.toString());
          this.setState({
            confirmLoading: false,
          });
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
        this.setState({
          confirmLoading: false,
        });
      },
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form horizontal>
        <FormItem
          label="原始密码"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('passBefore', {
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userPassOCheck },
            ],
          })(
            <Input placeholder="请输入您的原始密码" type="password" />
          )}
        </FormItem>
        <FormItem
          label="新密码"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('passAfter1', {
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userPassNCheck },
            ],
          })(
            <Input placeholder="请输入您的新密码" type="password" />
          )}
        </FormItem>
        <FormItem
          label="新密码确认"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('passAfter2', {
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.userPassNCheck },
            ],
          })(
            <Input placeholder="请再次输入您的新密码" type="password" />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button size="large" type="primary" onClick={this.handleSubmit} icon="enter">修改</Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button size="large" type="ghost" onClick={this.handleReset} icon="retweet">重置</Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a id="c"> </a>
        </FormItem>
      </Form>
    );
  }
}
Pass = Form.create({})(Pass);
export default Pass;
Pass.propTypes = {
  form: React.PropTypes.object,
};
