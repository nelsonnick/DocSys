import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import $ from 'jquery';
import * as AjaxFunction from '../Util/AjaxFunction.js';
const FormItem = Form.Item;
const Option = Select.Option;

class BorrowFrom extends React.Component {
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
    const { fileId, fileNumber, fileRemark, personId, personName, personNumber, personPhone1, personPhone2, personAddress, personRemark, departmentName } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <Row>
          <Col span={12}>
            <FormItem
              label="档案编号"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('fileNumber') ? '校验中...' : (getFieldError('fileNumber') || [])}
            >
              {getFieldDecorator('fileNumber', { initialValue: fileNumber })(
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
              {getFieldDecorator('personName', { initialValue: personName })(
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
              {getFieldDecorator('personNumber', { initialValue: personNumber })(
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
              {getFieldDecorator('fileAge', { initialValue: this.props.fileAge.toString().trim().substring(0, 4) + this.props.fileAge.toString().trim().substring(5, 7) + this.props.fileAge.toString().trim().substring(8, 10) })(
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
              {getFieldDecorator('personPhone1', { initialValue: personPhone1 })(
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
              {getFieldDecorator('personPhone2', { initialValue: personPhone2 })(
                <Input placeholder="请输入市民手机号码" maxlength="11" disabled />
              )}
            </FormItem>
            <FormItem
              label="联系地址"
              {...formItemLayout}
              hasFeedback
              // required
              // help={isFieldValidating('personAddress') ? '校验中...' : (getFieldError('personAddress') || [])}
            >
              {getFieldDecorator('personAddress', { initialValue: personAddress })(
                <Input type="textarea" rows="2" placeholder="请输入市民联系地址" disabled />
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
              help={isFieldValidating('flowDirect') ? '校验中...' : (getFieldError('flowDirect') || [])}
            >
              {getFieldDecorator('flowDirect', { initialValue: '未知',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                  { validator: this.flowDirectCheck },
                ],
              })(
                <Input placeholder="请输入档案的去向" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="借出原因"
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
                <Input placeholder="请输入借出的原因" />
              )}
            </FormItem>
            <FormItem
              label="传递方式"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('flowType', { initialValue: '个人' })(
                <Select>
                  <Option value="个人">个人</Option>
                  <Option value="专人">专人</Option>
                  <Option value="邮寄">邮寄</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="档案材料"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('fileRemark', { initialValue: fileRemark })(
                <Input type="textarea" rows="6" placeholder="请逐行填写档案中所含材料" disabled />
              )}
            </FormItem>
            <FormItem
              label="人员备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personRemark', { initialValue: personRemark })(
                <Input type="textarea" rows="2" placeholder="其他需要填写的信息" disabled />
              )}
            </FormItem>
            <FormItem
              label="借出备注"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('flowRemark')(
                <Input type="textarea" rows="2" placeholder="其他需要填写的信息" />
              )}
            </FormItem>
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
          </Col>
        </Row>
      </Form>
    );
  }
}
BorrowFrom = Form.create({})(BorrowFrom);
export default BorrowFrom;
BorrowFrom.propTypes = {
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
