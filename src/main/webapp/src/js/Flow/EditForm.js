import React from 'react';
import { Form, Input, Select } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../Util/AjaxFunction.js';

class EditFrom extends React.Component {
  constructor(props) {
    super(props);

    this.flowDirectCheck = this.flowDirectCheck.bind(this);
    this.flowReasonCheck = this.flowReasonCheck.bind(this);
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

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { userId, flowId, fileNumber, personName, personNumber, departmentName, flowReason, flowDirect, flowType, flowRemark, flowFlow } = this.props;

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
          label=""
          {...formItemLayout}
        >
          {getFieldDecorator('flowId', { initialValue: flowId })(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem
          label="档案编号"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('fileNumber', { initialValue: fileNumber })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          label="人员姓名"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('fileNumber', { initialValue: personName })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          label="证件号码"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('fileNumber', { initialValue: personNumber })(
            <Input disabled />
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
          label="流动类型"
          {...formItemLayout}
          hasFeedback
          required
        >
          {getFieldDecorator('flowFlow', { initialValue: flowFlow })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          label="档案来源"
          {...formItemLayout}
          required
          help={isFieldValidating('flowDirect') ? '校验中...' : (getFieldError('flowDirect') || [])}
        >
          {getFieldDecorator('flowDirect', { initialValue: flowDirect,
            rules: [
              { required: true, whitespace: true, message: '必填项' },
              { validator: this.flowDirectCheck },
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
          {getFieldDecorator('flowReason', { initialValue: flowReason,
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
          {getFieldDecorator('flowType', { initialValue: flowType })(
            <Select size="large" >
              <Option value="个人">个人</Option>
              <Option value="专人">专人</Option>
              <Option value="邮寄">邮寄</Option>
              <Option value="其他">其他</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="转移备注"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('flowRemark', { initialValue: flowRemark })(
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
  flowId: React.PropTypes.string,
  fileNumber: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  departmentName: React.PropTypes.string,
  flowReason: React.PropTypes.string,
  flowDirect: React.PropTypes.string,
  flowType: React.PropTypes.string,
  flowRemark: React.PropTypes.string,
  flowFlow: React.PropTypes.string,
};
