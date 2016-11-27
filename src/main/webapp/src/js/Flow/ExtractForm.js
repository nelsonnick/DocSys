import React from 'react';
import { Form, Input } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../Util/AjaxFunction.js';

class ExtractFrom extends React.Component {
  constructor(props) {
    super(props);
    this.personNameCheck = this.personNameCheck.bind(this);
    this.personNumberCheck = this.personNumberCheck.bind(this);
  }

  personNumberCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.PersonNumberz,
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
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <FormItem
          label="人员姓名"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('pname') ? '校验中...' : (getFieldError('pname') || [])}
        >
          {getFieldDecorator('pname', {
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
          help={isFieldValidating('pnumber') ? '校验中...' : (getFieldError('pnumber') || [])}
        >
          {getFieldDecorator('pnumber', {
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.personNumberCheck },
            ],
          })(
            <Input placeholder="请输入市民证件号码" maxlength="18" />
          )}
        </FormItem>
        <FormItem
          label="存档单位"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('location') ? '校验中...' : (getFieldError('location') || [])}
        >
          {getFieldDecorator('location', {
            rules: [
              { required: true, whitespace: true, message: '必填项' },
            ],
          })(
            <Input placeholder="请输入要提取档案的部门全称" />
          )}
        </FormItem>
        <FormItem
          label="备注信息"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('remark')(
            <Input type="textarea" rows="3" placeholder="其他需要备注的信息" />
          )}
        </FormItem>
      </Form>
    );
  }
}
ExtractFrom = Form.create({})(ExtractFrom);
export default ExtractFrom;
ExtractFrom.propTypes = {
  form: React.PropTypes.object,
};
